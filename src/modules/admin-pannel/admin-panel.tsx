import { Navigate } from "react-router";
import useAuth from "../../hooks/use-auth";
import { Box, Button, Grid, Menu, MenuItem } from "@mui/material";
import { VenueListCard } from "../../components/venue-list-card/venue-list-card";
import { useLogoutCardController } from "../auth/login-page/use-logout-controller";
import { useState } from "react";

export const AdminPanel = () => {
    const { accessToken } = useAuth();
    const { mutate: logout } = useLogoutCardController();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!accessToken) return <Navigate to="/login" replace />

    return (
        <>
            <Box
                component="nav"
                display="flex"
                justifyContent="flex-end"
                padding={4}
            >
                <Box
                    border={1}
                    borderRadius={10}
                    width={60}
                    height={60}
                    display="flex"
                >
                    <Button onClick={handleClick}>User</Button>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                    }}
                >
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Menu>
            </Box>
            <Grid container spacing={2} padding={2}>
                <Grid size={6}>
                    <VenueListCard />
                </Grid>
                <Grid size={6}>
                </Grid>
                <Grid size={12}>
                </Grid>
            </Grid>
        </>
    )
};
