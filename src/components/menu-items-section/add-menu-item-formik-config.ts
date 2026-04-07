import * as Yup from "yup";

export type AddMenuItemInitialValuesType = {
    itemName: string;
    description?: string;
    itemPrice: number | string;
    isAvailable: boolean;
};

export const addMenuItemInitialValues = {
    itemName: "",
    description: "",
    itemPrice: "",
    isAvailable: true,
};

export const addMenuItemValueValidator = Yup.object({
    itemName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(55, "Must be at most 55 characters")
        .required("Required"),
    description: Yup.string(),
    itemPrice: Yup.number()
        .required("Required"),
    isAvailable: Yup.boolean()
        .required("Required"),
});