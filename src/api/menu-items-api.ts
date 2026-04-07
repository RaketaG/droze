import { http } from "../utilities/http-client";

export type MenuItemListType = {
    "id": string;
    "categoryId": string;
    "venueId": string;
    "itemName": string;
    "description"?: string;
    "itemPrice": number;
    "isAvailable": boolean;
};

export const listMenuItems = async (venueId: string, accessToken: string): Promise<MenuItemListType[]> => {
    return await http.get(`/listMenuItems?venueId=${venueId}`, accessToken);
};

export const listCategoryMenuItems = async (categoryId: string, accessToken: string): Promise<MenuItemListType[]> => {
    return await http.get(`/listCategoryMenuItems?categoryId=${categoryId}`, accessToken);
};

export const addMenuItem = async (body: Omit<MenuItemListType, "id">, accessToken: string) => {
    return await http.post("/addMenuItem", body, accessToken);
};

export const changeMenuItemDetails = async (body: MenuItemListType, accessToken: string) => {
    return await http.put(`/changeMenuItemDetails`, body, accessToken);
};

export const deleteMenuItem = async (id: string, accessToken: string) => {
    return await http.delete(`/deleteMenuItem/${id}`, accessToken);
};