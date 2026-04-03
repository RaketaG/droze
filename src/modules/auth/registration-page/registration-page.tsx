import { Box, Button, LinearProgress, Typography } from "@mui/material"
import { useRegistrationCardController } from "./use-registration-card-controller";
import { useNavigate } from "react-router";
import { Form, Formik } from "formik";
import { DrozeTextField } from "../../../components/droze-text-field/droze-text-field";
import { initialValues, validationSchema } from "./registration-page-formik-config";

export const RegistrationCard = () => {
	const navigate = useNavigate();

	const { mutate: register, isPending } = useRegistrationCardController();

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
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						register(values);
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
								name="username"
								placeholder="Username"
								size="small"
							/>
							<DrozeTextField
								name="password"
								placeholder="Password"
								size="small"
								type="password"
							/>
							<DrozeTextField
								name="email"
								placeholder="Email"
								size="small"
							/>
							<DrozeTextField
								name="phone"
								placeholder="Phone"
								size="small"
							/>
							<DrozeTextField
								name="role"
								placeholder="Role"
								size="small"
								slotProps={{
									input: {
										readOnly: true,
									}
								}}
							/>
							<DrozeTextField
								name="fullName"
								placeholder="Full Name"
								size="small"
							/>
							<Button
								size="small"
								color="primary"
								variant="contained"
								type="submit"
								sx={{ minHeight: "32px" }}
							> {isPending ?
								<LinearProgress sx={{ width: '100%' }} /> :
								"Create account"}
							</Button>
						</Box >
					</Form>
				</Formik>
			</Box>
		</>
	);
};