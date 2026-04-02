import * as Yup from "yup";

export const addVenueInitialValues = {
    address: "",
    email: "",
    name: "",
    phone: "",
};

export const addVenueValueValidator = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    address: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
});