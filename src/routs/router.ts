import { createBrowserRouter } from "react-router";
import { LoginCard } from "../modules/auth/login-page/login-page"
import { RegistrationCard } from "../modules/auth/registration-page/registration-page";
import { AdminPanel } from "../modules/admin-pannel/admin-panel";

const router = createBrowserRouter([
    {
        path: "/",
        Component: LoginCard,
    },
    {
        path: "/login",
        Component: LoginCard,
    },
    {
        path: "/registration",
        Component: RegistrationCard,
    },
    {
        path: "/admin-panel",
        Component: AdminPanel,
        children: [
            {}
        ]

    },
]);

export default router;