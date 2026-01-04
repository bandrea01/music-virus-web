import {createContext, type ReactNode, useContext, useEffect, useMemo, useReducer,} from "react";
import {ApiRoutes, clearToken, getToken, setToken, userIdentityApi} from "@api";
import type {UserAuthRoleKey} from "@utils";

export const LocalStorageItemsEnum = {
    AUTH_USER: "auth-user-informations",
    PROFILE_USER: "profile-user-informations",
} as const;
export const LocalStorageActionEnum = {
    HYDRATE: "HYDRATE",
    SET_AUTH: "SET_AUTH",
    SET_PROFILE: "SET_PROFILE",
    SET_LOADING: "SET_LOADING",
    LOGOUT: "LOGOUT",
} as const;

export type LocalStorageItemsKey = keyof typeof LocalStorageItemsEnum;
export type LocalStorageActionKey = keyof typeof LocalStorageActionEnum;
export type LocalStorageActionValue = (typeof LocalStorageActionEnum)[LocalStorageActionKey];
export type TLocalStorageState = {
    authUserLocalStorageItem: IAuthUserLocalStorage | null;
    profileUserLocalStorageItem: IProfileUserLocalStorage | null;
    loading: boolean;
};
export type TLocalStorageAction =
    | {
    type: typeof LocalStorageActionEnum.HYDRATE;
    authUser: IAuthUserLocalStorage | null;
    profileUser: IProfileUserLocalStorage | null;
}
    | {
    type: typeof LocalStorageActionEnum.SET_AUTH;
    authUser: IAuthUserLocalStorage | null;
}
    | {
    type: typeof LocalStorageActionEnum.SET_PROFILE;
    profileUser: IProfileUserLocalStorage | null;
}
    | {
    type: typeof LocalStorageActionEnum.SET_LOADING;
    loading: boolean;
}
    | {
    type: typeof LocalStorageActionEnum.LOGOUT;
};

export interface IAuthUserLocalStorage {
    userId: string;
    jwt: string;
    role: UserAuthRoleKey;
}
export interface IProfileUserLocalStorage {
    name: string;
    surname: string;
    email: string;
    artistGenres?: string[];
    artistSocial?: string;
    venueName?: string;
    venueAddress?: { latitude: number; longitude: number };
}

function safeParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}
function loadAuthUser(): IAuthUserLocalStorage | null {
    return safeParse<IAuthUserLocalStorage>(
        localStorage.getItem(LocalStorageItemsEnum.AUTH_USER)
    );
}
function loadProfileUser(): IProfileUserLocalStorage | null {
    return safeParse<IProfileUserLocalStorage>(
        localStorage.getItem(LocalStorageItemsEnum.PROFILE_USER)
    );
}
function saveAuthUser(user: IAuthUserLocalStorage | null) {
    if (user)
        localStorage.setItem(LocalStorageItemsEnum.AUTH_USER, JSON.stringify(user));
    else localStorage.removeItem(LocalStorageItemsEnum.AUTH_USER);
}
function saveProfileUser(profile: IProfileUserLocalStorage | null) {
    if (profile)
        localStorage.setItem(
            LocalStorageItemsEnum.PROFILE_USER,
            JSON.stringify(profile)
        );
    else localStorage.removeItem(LocalStorageItemsEnum.PROFILE_USER);
}

const initialState: TLocalStorageState = {
    authUserLocalStorageItem: null,
    profileUserLocalStorageItem: null,
    loading: true,
};
function reducer(
    state: TLocalStorageState,
    action: TLocalStorageAction
): TLocalStorageState {
    switch (action.type) {
        case LocalStorageActionEnum.HYDRATE:
            return {
                authUserLocalStorageItem: action.authUser,
                profileUserLocalStorageItem: action.profileUser,
                loading: false,
            };

        case LocalStorageActionEnum.SET_AUTH:
            return { ...state, authUserLocalStorageItem: action.authUser };

        case LocalStorageActionEnum.SET_PROFILE:
            return { ...state, profileUserLocalStorageItem: action.profileUser };

        case LocalStorageActionEnum.SET_LOADING:
            return { ...state, loading: action.loading };

        case LocalStorageActionEnum.LOGOUT:
            return {
                authUserLocalStorageItem: null,
                profileUserLocalStorageItem: null,
                loading: false,
            };

        default:
            return state;
    }
}

type AuthContextType = {
    authUser: IAuthUserLocalStorage | null;
    profileUser: IProfileUserLocalStorage | null;
    loading: boolean;
    isAuthenticated: boolean;
    setAuthUser: (user: IAuthUserLocalStorage | null) => void;
    setProfileUser: (profile: IProfileUserLocalStorage | null) => void;
    login: (user: IAuthUserLocalStorage, profile?: IProfileUserLocalStorage | null) => void;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

async function fetchProfile(): Promise<IProfileUserLocalStorage> {
    const { data } = await userIdentityApi.get<IProfileUserLocalStorage>(
        ApiRoutes.PROFILE.ROOT
    );
    return data;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setAuthUser = (user: IAuthUserLocalStorage | null) => {
        saveAuthUser(user);

        if (user?.jwt) setToken(user.jwt);
        else clearToken();

        dispatch({ type: LocalStorageActionEnum.SET_AUTH, authUser: user });
    };
    const setProfileUser = (profile: IProfileUserLocalStorage | null) => {
        saveProfileUser(profile);
        dispatch({ type: LocalStorageActionEnum.SET_PROFILE, profileUser: profile });
    };

    const refreshProfile = async () => {
        if (!getToken()) return;

        dispatch({ type: LocalStorageActionEnum.SET_LOADING, loading: true });
        try {
            const profile = await fetchProfile();
            setProfileUser(profile);
        } finally {
            dispatch({ type: LocalStorageActionEnum.SET_LOADING, loading: false });
        }
    };

    const login = (user: IAuthUserLocalStorage, profile?: IProfileUserLocalStorage | null) => {
        setAuthUser(user);
        if (profile) setProfileUser(profile);
    };

    const logout = () => {
        saveAuthUser(null);
        saveProfileUser(null);
        clearToken();
        dispatch({ type: LocalStorageActionEnum.LOGOUT });
    };

    useEffect(() => {
        const storedAuth = loadAuthUser();
        const storedProfile = loadProfileUser();

        const token = storedAuth?.jwt ?? getToken();
        if (token) setToken(token);
        else clearToken();

        dispatch({
            type: LocalStorageActionEnum.HYDRATE,
            authUser: storedAuth,
            profileUser: storedProfile,
        });

        if (token && !storedProfile) {
            void refreshProfile();
        }

        const onStorage = (e: StorageEvent) => {
            if (
                e.key === LocalStorageItemsEnum.AUTH_USER ||
                e.key === LocalStorageItemsEnum.PROFILE_USER
            ) {
                dispatch({
                    type: LocalStorageActionEnum.HYDRATE,
                    authUser: loadAuthUser(),
                    profileUser: loadProfileUser(),
                });
            }
        };

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo<AuthContextType>(
        () => ({
            authUser: state.authUserLocalStorageItem,
            profileUser: state.profileUserLocalStorageItem,
            loading: state.loading,
            isAuthenticated: !!getToken(),
            setAuthUser,
            setProfileUser,
            login,
            logout,
            refreshProfile,
        }),
        [
            state.authUserLocalStorageItem,
            state.profileUserLocalStorageItem,
            state.loading,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
