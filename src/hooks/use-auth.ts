import { create } from 'zustand';
import { persist } from "zustand/middleware";

type UseAuthType = {
    accessToken: string;
    userId: string;
    role: string;
    setAccessToken: (newAccessToken: string) => void;
    setUserId: (newUserId: string) => void;
    setRole: (newRole: string) => void;
};

const useAuth = create<UseAuthType>()(
    persist(
        (set) => ({
            accessToken: "",
            userId: "",
            role: "",
            setAccessToken: (accessToken) => set({ accessToken }),
            setUserId: (userId) => set({ userId }),
            setRole: (role) => set({ role })
        }),
        { name: "auth-storage" }
    )
);

export default useAuth;