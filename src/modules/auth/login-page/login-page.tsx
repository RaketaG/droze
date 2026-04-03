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

			<Formik
				initialValues={{
					username: "",
					password: "",
				}}
				validationSchema={Yup.object({
					username: Yup.string().required("Required"),
					password: Yup.string().required("Required")
				})}
				onSubmit={(values, { setSubmitting }) => {
					!isPending && login(values);
					setSubmitting(false);
				}}
			>
				<Form>
					<Box
						maxWidth={350}
						flex="3 1 0"
						display="flex"
						flexDirection={"column"}
						px={4}
					>
						<DrozeTextField
							fullWidth
							name="username"
							placeholder="Username"
							size="small"
						/>
						<DrozeTextField
							fullWidth
							name="password"
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
						> Create an account </Button>
					</Box >
				</Form>
			</Formik>
		</Box >
	);
};