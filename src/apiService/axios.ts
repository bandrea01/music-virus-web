import axios, {AxiosError, type AxiosInstance} from 'axios';

const TOKEN_KEY = 'jwt';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ??
    '/api';

const USER_IDENTITY_BASE_URL = `${API_BASE_URL}/user`;
const EVENT_FUNDRAISING_BASE_URL = `${API_BASE_URL}/event-fundraising`;

export function createApi(baseURL: string): AxiosInstance {
    const api = axios.create({
        baseURL,
        timeout: 10000,
    });

    api.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
}

export function getAxiosErrorMessage(e: unknown, fallback = 'Errore'): string {
    const err = e as AxiosError<any>;
    if (err?.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') return data;
        if (data?.details) return data.details.join('\n');
        if (typeof data?.message === 'string') return data.message;
    }
    return err?.message || fallback;
}

export const userIdentityApi = createApi(USER_IDENTITY_BASE_URL);
export const eventFundraisingApi = createApi(EVENT_FUNDRAISING_BASE_URL);

export default axios;
