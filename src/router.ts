import { createBrowserRouter } from "react-router";
import { LoginCard } from "./components/login-card/login-card"
import { LandingPage } from "./landing-page";
import { RegistrationCard } from "./components/registration-card/registration-card";

const router = createBrowserRouter([
    {
        path: "/",
        Component: LandingPage,
    },
    {
        path: "/login",
        Component: LoginCard,
    },
    {
        path: "/registration",
        Component: RegistrationCard,
    },
]);

export default router;