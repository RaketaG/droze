import { Box, Button, LinearProgress, Typography } from "@mui/material";
import * as Yup from "yup";
import { useLoginCardController } from "./use-login-controller";
import { useNavigate } from "react-router";
import { Form, Formik } from "formik";
import { DrozeTextField } from "../../../components/droze-text-field/droze-text-field";

export const LoginCard = () => {
	const navigate = useNavigate();

	const { mutate: login, isPending } = useLoginCardController();

	return (
		<Box
			minHeight="100vh"
			minWidth="fit-content"
			component="article"
			padding={4}
			display="flex"
			justifyContent="center"
			alignItems="center"
			boxSizing="border-box"
		>
			<Box
				display="flex"
				flexDirection="row"
				justifyContent="space-around"
				alignItems="center"
				width={650}
				boxShadow={4}
				padding={8}
				borderRadius={3}
			>
				<Typography fontSize={68}>droze.</Typography>

				<Box
					width={0.6}
					padding={4}
					boxSizing="border-box"
				>
					<Formik
						initialValues={{
							username: "",
							password: "",
						}}
						validationSchema={Yup.object({
							username: Yup.string().required("Required"),
							password: Yup.string().required("Required")
						})}
						onSubmit={(values) => {
							!isPending && login({
								...values,
								username: values.username.toLowerCase(),
							});
						}}
					>
						<Form>
							<Box
								display="flex"
								flexDirection={"column"}
								boxSizing="border-box"
							>
								<DrozeTextField
									name="username"
									label="Username"
									placeholder="Username"
									size="small"
								/>
								<DrozeTextField
									name="password"
									label="Password"
									placeholder="Password"
									type="password"
									size="small"
								/>
								<Button
									disabled={isPending}
									size="small"
									color="primary"
									variant="contained"
									type="submit"
									sx={{ minHeight: "32px" }}
								> {isPending ?
									<LinearProgress sx={{ width: '100%' }} /> :
									"Login"}
								</Button>
								<Button
									size="small"
									color="primary"
									variant="text"
									onClick={() => navigate("/registration")}
									sx={{ mt: 1 }}
								> Create an account </Button>
							</Box >
						</Form>
					</Formik>
				</Box>
			</Box >
		</Box >
	);
};