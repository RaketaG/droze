import * as Yup from "yup";

export const addVenueInitialValues = {
    address: "",
    email: "",
    name: "",
    phone: "",
};

export const addVenueValueValidator = Yup.object({
    name: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(55, "Must be at most 55 characters")
        .required("Required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),

    address: Yup.string()
        .required("Required"),

    phone: Yup.string()
        .matches(
            /^\+[0-9]+$/,
            "Phone must start with + and contain only numbers")
        .required("Required"),
});