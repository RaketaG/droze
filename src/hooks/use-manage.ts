import { create } from 'zustand';

type UseManageType = {
    venueId: string;
    categoryId: string;
    setVenueId: (newVenueId: string) => void;
    setCategoryId: (newCategoryId: string) => void;
};

const useManage = create<UseManageType>((set) => ({
    venueId: "",
    categoryId: "",
    setVenueId: (venueId) => set({ venueId }),
    setCategoryId: (categoryId) => set({ categoryId }),
}));

export default useManage;