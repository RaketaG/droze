import { http } from "../utilities/http-client";

type MenuCategoriesListType = {
    id: string;
    venueId: string;
    category: string;
};

export const listMenuCategories = async (venueId: string, accessToken: string): Promise<MenuCategoriesListType[]> => {
    return await http.get(`/listMenuCategories?venueId=${venueId}`, accessToken)
};

export const addMenuCategory = async (body: { venueId: string, category: string }, accessToken: string) => {
    return await http.post("/addMenuCategory", body, accessToken);
};

export const changeMenuCategoryDetails = async (body: { id: string, category: string }, accessToken: string) => {
    return await http.put(`/changeMenuCategoryDetails`, body, accessToken);
};

export const deleteMenuCategory = async (categoryId: string, accessToken: string) => {
    return await http.delete(`/deleteMenuCategory/${categoryId}`, accessToken);
};