import { Box, TextField, Typography, type TextFieldProps } from "@mui/material";
import { useField } from "formik"

export const DrozeTextField = (
    { ...props }: TextFieldProps
) => {
    const [field, meta] = useField(props.name as string);

    return (
        <Box width="100%">
            <TextField
                fullWidth
                {...props}
                {...field}
                error={Boolean(meta.touched && meta.error)}
            />
            <Typography
                color="error"
                fontSize={12}
                minHeight={18}
                sx={{ width: "100%" }}
            >
                {meta.touched && meta.error ? meta.error : " "}
            </Typography>
        </Box>
    );
};