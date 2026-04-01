import { http } from "../utilities/http-client"

export type LoginBody = {
    username: string;
    password: string;
};

export type RegistrationBody = {
    username: string | null;
    password: string | null;
    email: string | null;
    phone: string | null;
    role: string | null;
    fullName: string | null;
}

export const login = async (loginBody: LoginBody) => {
    return await http.post("/login", loginBody);
};

export const logout = async () => {
    return await http.post("/logout", {});
};

export const register = async (registrationBody: RegistrationBody) => {
    return await http.post("/register", registrationBody)
};