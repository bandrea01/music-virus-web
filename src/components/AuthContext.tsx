import React, {createContext, type ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import api, {clearToken, getToken, setToken as persistToken} from '../axios/axios';

export const AuthRole = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_FAN: 'ROLE_FAN',
    ROLE_ARTIST: 'ROLE_ARTIST',
    ROLE_VENUE: 'ROLE_VENUE',
} as const;
export type AuthRole = typeof AuthRole[keyof typeof AuthRole];

interface IAuthUser {
    userId: string;
    jwt: string;
    role: AuthRole;
}

export interface IUserProfile {
    userId: string;
    name: string;
    surname: string;
    email: string;
    role: AuthRole;
    artistGenres?: string[];
    artistSocial?: string;
    venueName?: string;
    venueAddress?: { lat: number; lng: number };
}

interface AuthContextType {
    authUser: IAuthUser | null;
    profileUser: IUserProfile | null;
    setProfileUser: (profile: IUserProfile | null) => void;
    setAuthUser: (user: IAuthUser | null) => void;
    logout: () => void;
}

// —————————————————————————————————————————
const LS_AUTH_USER = 'authUser';
const LS_PROFILE_USER = 'profileUser';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authUser, _setAuthUser] = useState<IAuthUser | null>(() => {
        const raw = localStorage.getItem(LS_AUTH_USER);
        try {
            return raw ? (JSON.parse(raw) as IAuthUser) : null;
        } catch {
            return null;
        }
    });

    const [profileUser, _setProfileUser] = useState<IUserProfile | null>(() => {
        const raw = localStorage.getItem(LS_PROFILE_USER);
        try {
            return raw ? (JSON.parse(raw) as IUserProfile) : null;
        } catch {
            return null;
        }
    });

    const setAuthUser = (user: IAuthUser | null) => {
        _setAuthUser(user);
        if (user) {
            localStorage.setItem(LS_AUTH_USER, JSON.stringify(user));
            // opzionale, ma utile se altrove non lo fai:
            persistToken(user.jwt);
        } else {
            localStorage.removeItem(LS_AUTH_USER);
            clearToken();
        }
    };

    const setProfileUser = (profile: IUserProfile | null) => {
        _setProfileUser(profile);
        if (profile) {
            localStorage.setItem(LS_PROFILE_USER, JSON.stringify(profile));
        } else {
            localStorage.removeItem(LS_PROFILE_USER);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        if (!profileUser) {
            (async () => {
                try {
                    const { data } = await api.get<IUserProfile>('/api/users/profile');
                    setProfileUser(data);
                } catch (e) {
                    setProfileUser(null);
                }
            })();
        }
    }, []); // una volta al mount

    useEffect(() => {
        const token = getToken();
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const logout = () => {
        setProfileUser(null);
        setAuthUser(null);
    };

    const value = useMemo<AuthContextType>(
        () => ({ authUser, profileUser, setAuthUser, setProfileUser, logout }),
        [authUser, profileUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
