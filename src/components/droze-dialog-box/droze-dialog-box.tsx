import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const DrozeDialogBox = (
    {
        isOpen,
        handleClose,
        handleAction,
        titleText,
        contentText,
        positiveBtnText,
        negativeBtnText,

    }: {
        isOpen: boolean,
        handleClose: () => void,
        handleAction: () => void,
        titleText: string,
        contentText: string,
        positiveBtnText?: string,
        negativeBtnText?: string,
    }
) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>
                    {negativeBtnText || "Cancel"}
                </Button>
                <Button variant="contained" onClick={handleAction}>
                    {positiveBtnText || "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    )
};