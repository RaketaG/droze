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
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    fullName: Yup.string(),
});