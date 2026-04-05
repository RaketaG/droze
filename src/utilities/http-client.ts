import useAuth from "../hooks/use-auth";
import router from "../routs/router";

const request = async (
    path: string, accessToken?: string, options?: RequestInit
) => {
    const authState = useAuth.getState();
    const requestSkeleton = async (token?: string) => {
        return await fetch(`/api${path}`, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options?.headers,
            },
            ...options,
        });
    };

    const response = await requestSkeleton(accessToken);

    if (response.status === 401) {
        const refresh = await fetch("/api/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (!refresh.ok) {
            router.navigate("/login");
            throw new Error(`Request failed: ${response.statusText}`);
        }

        const { accessToken: newAccessToken } = await refresh.json();
        authState.setAccessToken(newAccessToken);

        const newResponse = await requestSkeleton(newAccessToken);

        if (!newResponse.ok) {
            router.navigate("/login");
            throw new Error(`Request failed: ${newResponse.statusText}`);
        }
        return newResponse.json();
    }

    if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
    return response.json();
};

export const http = {
    get: (path: string, accessToken?: string, options?: RequestInit) =>
        request(path, accessToken, { ...options, method: "GET" }),
    post: (path: string, body: unknown, accessToken?: string, options?: RequestInit) =>
        request(path, accessToken, { ...options, method: "POST", body: JSON.stringify(body) }),
    put: (path: string, body: unknown, accessToken?: string, options?: RequestInit) =>
        request(path, accessToken, { ...options, method: "PUT", body: JSON.stringify(body) }),
    delete: (path: string, accessToken?: string, options?: RequestInit) =>
        request(path, accessToken, { ...options, method: "DELETE" }),
};