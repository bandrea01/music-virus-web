import axios, {AxiosError} from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

const TOKEN_KEY = 'jwt';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export function getAxiosErrorMessage(e: unknown, fallback = 'Errore'): string {
    const err = e as AxiosError<any>;
    if (err?.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') return data;
        if (typeof data?.message === 'string') return data.message;
        if (typeof data?.detail === 'string') return data.detail; // per ProblemDetail
    }
    return err?.message || fallback;
}

export default api;
