import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";
import { addMenuCategory, changeMenuCategoryDetails, deleteMenuCategory, listMenuCategories } from "../../api/menu-categories-api";
import { useState } from "react";
import { useToast } from "../toast";

export const useMenuCategoriesSectionController = () => {
    const { accessToken } = useAuth();
    const { venueId, categoryId: selectedRowId, setCategoryId: setSelectedRowId } = useManage();

    const { showToast } = useToast();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    const [category, setCategory] = useState<string>("");
    const [rowToEditDelete, setRowToEditDelete] = useState<string>("");

    const { isPending, data: categories, refetch: refetchCategories } = useQuery({
        queryKey: ["categoriesList", venueId],
        queryFn: () => listMenuCategories(venueId, accessToken),
        enabled: !!venueId,
    });

    const { mutate: addMenuCategoryMutation } = useMutation({
        mutationFn: () =>
            addMenuCategory({ venueId, category }, accessToken),
        onSuccess: () => {
            refetchCategories();
            setRowToEditDelete("");
            setCategory("");
            setAnchorEl(null);
            showToast("Menu Category Added Successfully", "success");
        },
        onError: (error) => {
            setAnchorEl(null);
            showToast(error.message, "error");
        }
    });

    const { mutate: changeMenuCategoryMutation } = useMutation({
        mutationFn: (body: { id: string, category: string }) =>
            changeMenuCategoryDetails(body, accessToken),
        onSuccess: () => {
            refetchCategories();
            setRowToEditDelete("");
            setCategory("");
            setAnchorEl(null);
            showToast("Menu Category Renamed Successfully", "success");
        },
        onError: (error) => {
            setAnchorEl(null);
            showToast(error.message, "error");
        }
    });

    const { mutate: deleteMenuCategoryMutation } = useMutation({
        mutationFn: (categoryId: string) =>
            deleteMenuCategory(categoryId, accessToken),
        onSuccess: () => {
            refetchCategories();
            setRowToEditDelete("");
            showToast("Menu Category Deleted Successfully", "success");
            setIsDeleteDialogOpen(false);
        },
        onError: (error) => {
            setAnchorEl(null);
            showToast(error.message, "error");
        }
    });

    return {
        venueId,
        selectedRowId,
        setSelectedRowId,
        rowToEditDelete,
        setRowToEditDelete,
        category,
        setCategory,
        showToast,
        anchorEl,
        setAnchorEl,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isPending,
        categories,
        refetchCategories,
        addMenuCategoryMutation,
        changeMenuCategoryMutation,
        deleteMenuCategoryMutation
    };
};