import { create } from 'zustand';
import { persist } from "zustand/middleware";

type UseAuthType = {
    accessToken: string;
    userId: string;
    userRole: string;
    username: string;
    userEmail: string;
    userPhone: string;
    userFullName: string;
    setAccessToken: (newAccessToken: string) => void;
    setUserId: (newUserId: string) => void;
    setUserRole: (newRole: string) => void;
    setUsername: (newRole: string) => void;
    setUserEmail: (newRole: string) => void;
    setUserPhone: (newRole: string) => void;
    setUserFullName: (newRole: string) => void;
};

const useAuth = create<UseAuthType>()(
    persist(
        (set) => ({
            accessToken: "",
            userId: "",
            userRole: "",
            username: "",
            userEmail: "",
            userPhone: "",
            userFullName: "",
            setAccessToken: (accessToken) => set({ accessToken }),
            setUserId: (userId) => set({ userId }),
            setUserRole: (userRole) => set({ userRole }),
            setUsername: (username) => set({ username }),
            setUserEmail: (userEmail) => set({ userEmail }),
            setUserPhone: (userPhone) => set({ userPhone }),
            setUserFullName: (userFullName) => set({ userFullName })
        }),
        { name: "auth-storage" }
    )
);

export default useAuth;