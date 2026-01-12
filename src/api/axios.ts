import axios, {type AxiosInstance} from 'axios';
import {TOKEN_KEY} from "@utils";

/**
 * Get, set and clear auth token item in local storage
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Axios instances and helpers
 * Base URLs are configured via environment variables
 * VITE_API_BASE_URL is the base URL for all APIs
 * Each microservice has its own base URL appended to the API_BASE_URL
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const USER_IDENTITY_BASE_URL = `${API_BASE_URL}/user`;
const EVENT_FUNDRAISING_BASE_URL = `${API_BASE_URL}/event-fundraising`;
const BILLING_BASE_URL = `${API_BASE_URL}/billing`;

/**
 * Create an Axios instance with base URL and auth token interceptor
 * @param baseURL - The base URL for the Axios instance
 * @returns AxiosInstance
 */
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

/** Extract a user-friendly error message from an Axios error
 * @param e - The error object
 * @param fallback - Fallback message if no specific message is found
 * @returns string - The extracted error message
 */
export function getAxiosErrorMessage(e: unknown, fallback = 'Errore'): string {
    if (typeof e === 'string') return e;
    if (axios.isAxiosError(e)) {
        const data = e.response?.data;

        if (typeof data === 'string' && data !== "") return data;
        if (Array.isArray(data)) return data.map(String).join('\n');

        if (data && typeof data === 'object') {
            const details = (data as any).details;
            if (Array.isArray(details)) {
                return details
                    .map(d => (typeof d === 'string' ? d : d?.message ?? JSON.stringify(d)))
                    .join('\n');
            }

            const errors = (data as any).errors;
            if (Array.isArray(errors)) {
                return errors
                    .map(errItem => (typeof errItem === 'string' ? errItem : errItem?.message ?? JSON.stringify(errItem)))
                    .join('\n');
            }

            const message = (data as any).message ?? (data as any).error;
            if (typeof message === 'string') return message;
        }

        return fallback;
    }


    if (e instanceof Error) return e.message;
    return fallback;
}

/**
 * Axios instances for different microservices
 */
export const userIdentityApi = createApi(USER_IDENTITY_BASE_URL);
export const eventFundraisingApi = createApi(EVENT_FUNDRAISING_BASE_URL);
export const billingApi = createApi(BILLING_BASE_URL);

export default axios;
