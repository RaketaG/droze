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
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								register({
									...values,
									username: values.username!.toLowerCase(),
								});
							}}
						>
							<Form>
								<Box
									maxWidth={320}
									display="flex"
									flexDirection="column"
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
										size="small"
										type="password"
									/>
									<DrozeTextField
										name="email"
										label="Email"
										placeholder="Email"
										size="small"
									/>
									<DrozeTextField
										name="phone"
										label="Phone"
										placeholder="Phone"
										size="small"
									/>
									<DrozeTextField
										name="role"
										label="Role"
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
										label="Full Name"
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
				</Box>
			</Box>
		</>
	);
};