import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik"

export const DrozeTextField = (
    { ...props }: TextFieldProps
) => {
    const [field, meta] = useField(props.name as string);

    return (
        <>
            <TextField
                {...props}
                {...field}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};