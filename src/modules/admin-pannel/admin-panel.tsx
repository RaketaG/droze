import { Navigate } from "react-router";
import useAuth from "../../hooks/use-auth";
import { Box, Typography } from "@mui/material";
import { VenueListCard } from "../../components/venue-list-card/venue-list-section";
import { useLogoutCardController } from "../auth/login-page/use-logout-controller";
import { DrozeAdminCard } from "../../components/droze-admin-card/droze-admin-card";

export const AdminPanel = () => {
    const { accessToken, role } = useAuth();
    const { logoutMutation } = useLogoutCardController();

    if (!accessToken) return <Navigate to="/login" replace />

    return (
        <Box
            component="article"
            p={8}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography variant="h3" color="primary" mb={8}>droze. Restorator Pannel</Typography>
            <Box
                display="flex"
                justifyContent="center"
                gap={3}
            >
                <VenueListCard />
                <DrozeAdminCard
                    username={"gocxha"}
                    email={"mandarin@email.com"}
                    phone={"+123412341234"}
                    role={role}
                    logout={logoutMutation}
                />
            </Box>
        </Box>
    )
};
