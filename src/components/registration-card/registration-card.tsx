import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useRegistrationCardController } from "./use-registration-card-controller";
import { useNavigate } from "react-router";

export const RegistrationCard = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [fullName, setFullName] = useState<string>("");


	const { register, loading, error, data } = useRegistrationCardController(
		username, password, email, phone, fullName);

	console.log(data);

	return (
		<>
			<Button
				sx={{
					position: "absolute",
					left: "8px",
					top: "8px"
				}}
				onClick={() => navigate(-1)}
			>
				back
			</Button>

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
						register();
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
					/>
					<TextField
						placeholder="Email"
						size="small"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						placeholder="Phone"
						size="small"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<TextField
						disabled
						value={"Restorator"}
						placeholder="Role"
						size="small"
					/>
					<TextField
						placeholder="Full Name"
						size="small"
						onChange={(e) => setFullName(e.target.value)}
					/>
					<Button
						size="small"
						color="primary"
						variant="contained"
						type="submit"
						sx={{ minHeight: "32px" }}
					> {loading ?
						<LinearProgress sx={{ width: '100%' }} /> :
						"Create account"}
					</Button>

					{data && <Typography>{`username: ${data.username} \n id: ${data.id}`}</Typography>}
				</Box >
			</Box>
		</>
	);
};