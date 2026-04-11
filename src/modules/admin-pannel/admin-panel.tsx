import { Navigate } from "react-router";
import useAuth from "../../hooks/use-auth";
import { Box, Typography } from "@mui/material";
import { VenueListCard } from "../../components/venue-list-card/venue-list-section";
import { useLogoutCardController } from "../auth/login-page/use-logout-controller";
import { DrozeAdminCard } from "../../components/droze-admin-card/droze-admin-card";
import { MenuCategoriesListSection } from "../../components/menu-categoris-section/menu-categories-section";
import { MenuItemsSection } from "../../components/menu-items-section/menu-items-section";

export const AdminPanel = () => {
    const {
        accessToken, username, userEmail, userPhone, userRole
    } = useAuth();
    const { logoutMutation } = useLogoutCardController();

    if (!accessToken) return <Navigate to="/login" replace />

    return (
        <Box
            component="article"
            padding={4}
            gap={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minWidth="fit-content"
            minHeight="fit-content"
        >

            <Typography variant="h3" color="primary">droze. Restorator Pannel</Typography>

            <Box
                display="flex"
                justifyContent="center"
                gap={3}
            >
                <VenueListCard />
                <DrozeAdminCard
                    username={username}
                    email={userEmail}
                    phone={userPhone}
                    role={userRole}
                    logout={logoutMutation}
                />
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                gap={3}
            >

                <MenuCategoriesListSection />
                <MenuItemsSection />
            </Box>

        </Box>
    )
};
