import { Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <ButtonGroup>
                <Button >Guest</Button>
                <Button
                    onClick={() => navigate("/login")}>Restorator</Button>
            </ButtonGroup>
            <Typography>droze.</Typography>
        </>
    );
}