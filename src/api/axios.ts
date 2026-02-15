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
 * @param error
 * @param fallback - Fallback message if no specific message is found
 * @returns string - The extracted error message
 */
export function getAxiosErrorMessage(error: unknown, fallback = "Errore imprevisto") {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as any;

        const detail = data?.detail;
        if (typeof detail === "string" && detail.trim().length > 0) {
            return detail;
        }
        const details = data?.details;
        if (Array.isArray(details) && details.length > 0 && typeof details[0] === "string" && details[0].trim().length > 0) {
            return details[0];
        }

        const message = data?.message;
        if (typeof message === "string" && message.trim().length > 0) {
            return message;
        }

        if (typeof data === "string" && data.trim().length > 0) {
            return data;
        }

        return fallback;
    }

    if (error instanceof Error && error.message) return error.message;
    if (typeof error === "string" && error.trim()) return error;

    return fallback;
}


/**
 * Axios instances for different microservices
 */
export const userIdentityApi = createApi(USER_IDENTITY_BASE_URL);
export const eventFundraisingApi = createApi(EVENT_FUNDRAISING_BASE_URL);
export const billingApi = createApi(BILLING_BASE_URL);

export default axios;
