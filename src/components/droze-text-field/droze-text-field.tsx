import { Box, TextField, Typography, type TextFieldProps } from "@mui/material";
import { useField } from "formik"

export const DrozeTextField = (
    { ...props }: TextFieldProps
) => {
    const [field, meta] = useField(props.name as string);

    return (
        <Box>
            <TextField
                {...props}
                {...field}
                error={(meta.touched && meta.error) as boolean}
            />
            <Typography
                color="error"
                fontSize={12}
                minHeight={18}
            >
                {meta.touched && meta.error ? meta.error : ""}
            </Typography>
        </Box>
    );
};