import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";
import { addMenuItem, changeMenuItemDetails, deleteMenuItem, listCategoryMenuItems, listMenuItems, type MenuItemListType } from "../../api/menu-items-api";
import { useState } from "react";
import { useToast } from "../toast";

export const useMenuItemsSectionController = () => {
    const { accessToken } = useAuth();
    const { venueId, categoryId } = useManage();

    const { showToast } = useToast();

    const [selectedItem, setSelectedItem] = useState<string>("");

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isAddChangeOpen, setIsAddChangeOpen] = useState<boolean>(false);
    const [changeDetailsBody, setChangeDetailsBody] = useState<MenuItemListType | undefined>();

    const { data: menuItems, refetch: refetchMenuItems } = useQuery({
        queryKey: ["itemsList", venueId],
        queryFn: () => listMenuItems(venueId, accessToken),
        enabled: !!venueId && !categoryId,
    });

    const { data: categoryMenuItems, refetch: refetchCategoryMenuItems } = useQuery({
        queryKey: ["itemsList", categoryId],
        queryFn: () => listCategoryMenuItems(categoryId, accessToken),
        enabled: !!categoryId,
    });

    const { mutate: addMenuItemAction } = useMutation({
        mutationFn: (body: Omit<MenuItemListType, "id">) =>
            addMenuItem({ ...body, categoryId, venueId }, accessToken),
        onSuccess: () => {
            refetchCategoryMenuItems();
            showToast("Menu Item Added Successfully", "success");
            setIsAddChangeOpen(false);
        },
        onError: (error) => {
            showToast(error.message, "error");
            setIsAddChangeOpen(false);
        }
    });

    const { mutate: changeMenuItemAction } = useMutation({
        mutationFn: (body: MenuItemListType) =>
            changeMenuItemDetails(body, accessToken),
        onSuccess: () => {
            categoryId ?
                refetchCategoryMenuItems() :
                refetchMenuItems();

            showToast("Menu Item Changed Successfully", "success");
            setIsAddChangeOpen(false);
        },
        onError: (error) => {
            showToast(error.message, "error");
            setIsAddChangeOpen(false);
        }
    });

    const { mutate: deleteMenuItemAction } = useMutation({
        mutationFn: (id: string) =>
            deleteMenuItem(id, accessToken),
        onSuccess: () => {
            categoryId ?
                refetchCategoryMenuItems() :
                refetchMenuItems();

            showToast("Menu Item Deleted Successfully", "success");
            setIsDeleteDialogOpen(false);
        },
        onError: (error) => {
            showToast(error.message, "error");
            setIsDeleteDialogOpen(false);
        }
    });

    return {
        venueId,
        categoryId,
        showToast,
        selectedItem,
        setSelectedItem,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isAddChangeOpen,
        setIsAddChangeOpen,
        changeDetailsBody,
        setChangeDetailsBody,
        menuItems,
        refetchMenuItems,
        categoryMenuItems,
        refetchCategoryMenuItems,
        addMenuItemAction,
        changeMenuItemAction,
        deleteMenuItemAction
    };
};