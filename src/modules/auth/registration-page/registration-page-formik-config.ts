import * as Yup from "yup";
import type { RegistrationBody } from "../../../api/auth-api";

export const initialValues: RegistrationBody = {
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "restorator",
    fullName: ""
};

export const validationSchema = Yup.object({
    username: Yup.string()
        .transform((value) => value?.toLowerCase())
        .matches(
            /^[a-z0-9._-]+$/,
            "Only allowed letters, numbers, and special character: . _ -"
        )
        .matches(
            /^(?!.*[._-]{2}).*$/,
            "No consecutive special characters (.. -- __)"
        )
        .matches(
            /^[a-z0-9].*[a-z0-9]$/,
            "Cannot start or end with a special character"
        )
        .min(2, "Must be at least 2 characters")
        .max(55, "Must be at most 55 characters")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/,
            "Must contain at least 1 uppercase letter,\n 1 number, and 1 special character"
        )
        .required("Required"),
    email: Yup.string()
        .transform((value) => value?.toLowerCase())
        .email("Invalid email address")
        .required("Required"),
    phone: Yup.string()
        .matches(
            /^\+[0-9]+$/,
            "Phone must start with + and contain only numbers"
        )
        .required("Required"),
    role: Yup.string()
        .oneOf(["restorator", "user", "admin"], "Invalid role")
        .required("Required"),
    fullName: Yup.string(),
});