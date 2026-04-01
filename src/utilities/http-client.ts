const request = async (
    path: string, accessToken?: string, options?: RequestInit
) => {

    const response = await fetch(`/api${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
    return response.json();
}

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