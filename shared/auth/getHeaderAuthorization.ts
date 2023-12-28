import { type AxiosRequestHeaders, type InternalAxiosRequestConfig } from "axios";

export function getAuthHeaders(accessToken: string | null): InternalAxiosRequestConfig {
    return {
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : null,
        } as AxiosRequestHeaders,
    };
}