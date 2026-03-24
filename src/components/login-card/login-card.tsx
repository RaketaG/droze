import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useLoginCardController } from "./use-login-card-controller";
import { useNavigate } from "react-router";

export const LoginCard = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { login, loading, data } = useLoginCardController(username, password);

	return (
		<Box
			height="100vh"
			component="article"
			display="flex"
			alignItems="center"

		>
			<Box
				flex="7 1 0"
				component="section"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Typography fontSize={68}>droze.</Typography>
			</Box>

			<Box
				maxWidth={350}
				flex="3 1 0"
				component="form"
				display="flex"
				flexDirection={"column"}
				gap={1}
				px={4}
				onSubmit={(e) => {
					e.preventDefault();
					login();
				}}
			>
				<TextField
					placeholder="username"
					size="small"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					placeholder="Password"
					size="small"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && login()}
				/>
				<Button
					size="small"
					color="primary"
					variant="contained"
					type="submit"
					sx={{ minHeight: "32px" }}
				> {loading ?
					<LinearProgress sx={{ width: '100%' }} /> :
					"Login"}
				</Button>
				<Button
					size="small"
					color="primary"
					variant="text"
					onClick={() => navigate("/registration")}
				> Create an account </Button>
			</Box >
		</Box>
	);
};