import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    type ReactNode,
} from 'react';
import api, { getToken, setToken as persistToken } from '../apiService/axios';

export const AuthRole = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_FAN: 'ROLE_FAN',
    ROLE_ARTIST: 'ROLE_ARTIST',
    ROLE_VENUE: 'ROLE_VENUE',
} as const;
export type AuthRole = typeof AuthRole[keyof typeof AuthRole];

export interface IAuthUser {
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
    venueAddress?: { latitude: number; longitude: number };
}

const LS_KEYS = {
    AUTH_USER: 'authUser',
    PROFILE_USER: 'profileUser',
} as const;

function safeParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
}

function loadAuthUser(): IAuthUser | null {
    return safeParse<IAuthUser>(localStorage.getItem(LS_KEYS.AUTH_USER));
}
function loadProfileUser(): IUserProfile | null {
    return safeParse<IUserProfile>(localStorage.getItem(LS_KEYS.PROFILE_USER));
}
function saveAuthUser(user: IAuthUser | null) {
    if (user) localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_KEYS.AUTH_USER);
}
function saveProfileUser(profile: IUserProfile | null) {
    console.log('Salvo profilo utente:', profile)
    if (profile) localStorage.setItem(LS_KEYS.PROFILE_USER, JSON.stringify(profile));
    else localStorage.removeItem(LS_KEYS.PROFILE_USER);
}

/** ─────────── Stato & Reducer ─────────── */
type State = {
    authUser: IAuthUser | null;
    profileUser: IUserProfile | null;
    loading: boolean; // bootstrap in corso
};

type Action =
    | { type: 'HYDRATE'; authUser: IAuthUser | null; profileUser: IUserProfile | null }
    | { type: 'SET_AUTH'; authUser: IAuthUser | null }
    | { type: 'SET_PROFILE'; profileUser: IUserProfile | null }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; loading: boolean };

const initialState: State = { authUser: null, profileUser: null, loading: true };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'HYDRATE':
            return { ...state, authUser: action.authUser, profileUser: action.profileUser, loading: false };
        case 'SET_AUTH':
            return { ...state, authUser: action.authUser };
        case 'SET_PROFILE':
            return { ...state, profileUser: action.profileUser };
        case 'SET_LOADING':
            return { ...state, loading: action.loading };
        case 'LOGOUT':
            return { authUser: null, profileUser: null, loading: false };
        default:
            return state;
    }
}

/** ─────────── Context API ─────────── */
interface AuthContextType {
    authUser: IAuthUser | null;
    profileUser: IUserProfile | null;
    loading: boolean;
    isAuthenticated: boolean;
    /** Imposta auth + token + persist */
    setAuthUser: (user: IAuthUser | null) => void;
    /** Imposta profilo + persist */
    setProfileUser: (profile: IUserProfile | null) => void;
    /** Imposta entrambi (utile dopo login) */
    login: (user: IAuthUser, profile?: IUserProfile | null) => void;
    /** Logout completo */
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const storedAuth = loadAuthUser();
        const storedProfile = loadProfileUser();

        const token = storedAuth?.jwt || getToken();
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            persistToken(token);
        } else {
            delete api.defaults.headers.common['Authorization'];
        }

        dispatch({ type: 'HYDRATE', authUser: storedAuth ?? null, profileUser: storedProfile ?? null });

        (async () => {
            if (token && !storedProfile) {
                try {
                    const { data } = await api.get<IUserProfile>('/api/users/profile');
                    saveProfileUser(data);
                    dispatch({ type: 'SET_PROFILE', profileUser: data });
                } catch {}
            }
        })();

        const onStorage = (e: StorageEvent) => {
            if (e.key === LS_KEYS.AUTH_USER || e.key === LS_KEYS.PROFILE_USER) {
                const nextAuth = loadAuthUser();
                const nextProfile = loadProfileUser();

                const nextToken = nextAuth?.jwt;
                if (nextToken) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${nextToken}`;
                    persistToken(nextToken);
                } else {
                    delete api.defaults.headers.common['Authorization'];
                    persistToken(''); // o rimuovi nel tuo servizio
                }

                dispatch({ type: 'HYDRATE', authUser: nextAuth, profileUser: nextProfile });
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const setAuthUser = (user: IAuthUser | null) => {
        if (user) {
            saveAuthUser(user);
            persistToken(user.jwt);
            api.defaults.headers.common['Authorization'] = `Bearer ${user.jwt}`;
        } else {
            saveAuthUser(null);
            persistToken('');
            delete api.defaults.headers.common['Authorization'];
        }
        dispatch({ type: 'SET_AUTH', authUser: user });
    };

    const setProfileUser = (profile: IUserProfile | null) => {
        saveProfileUser(profile);
        dispatch({ type: 'SET_PROFILE', profileUser: profile });
    };

    const login = (user: IAuthUser, profile?: IUserProfile | null) => {
        setAuthUser(user);
        if (profile) setProfileUser(profile);
    };

    const logout = () => {
        saveAuthUser(null);
        saveProfileUser(null);
        persistToken('');
        delete api.defaults.headers.common['Authorization'];
        dispatch({ type: 'LOGOUT' });
    };

    const value = useMemo<AuthContextType>(() => ({
        authUser: state.authUser,
        profileUser: state.profileUser,
        loading: state.loading,
        isAuthenticated: !!state.authUser?.jwt,
        setAuthUser,
        setProfileUser,
        login,
        logout,
    }), [state.authUser, state.profileUser, state.loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Hook */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
