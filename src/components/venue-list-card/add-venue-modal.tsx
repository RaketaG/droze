import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Form, Formik } from 'formik';
import { DrozeTextField } from "../droze-text-field/droze-text-field";
import { useAddVenueModal } from "./use-add-venue-modal";
import { addVenueInitialValues, addVenueValueValidator } from "./add-venue-formik-config";
import CloseIcon from '@mui/icons-material/Close';

export const AddVenueModal = (
	{ isOpen, onClose, changeDetails }:
		{ isOpen: boolean, onClose: () => void, changeDetails?: any | undefined }
) => {
	const {
		changeVenueDetailsMutation,
		addVenueMutation
	} = useAddVenueModal();

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Box
				display="flex"
				flexDirection="column"
				gap={3}
				justifyContent="center"
				padding={3}
				border={1}
				borderRadius={3}
				width="50vw"
				maxWidth={720}
				minWidth={570}
				sx={{
					backgroundColor: "white"
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
				>
					<Typography variant="h5" color="primary">
						{changeDetails ?
							"Change Venue Details" :
							"Create a New Venue"
						}
					</Typography>
					<Button
						onClick={onClose}
					>
						<CloseIcon />
					</Button>
				</Box>
				<Formik
					initialValues={changeDetails ? changeDetails : addVenueInitialValues}
					enableReinitialize
					validationSchema={addVenueValueValidator}
					onSubmit={(values, { setSubmitting }) => {
						changeDetails ?
							changeVenueDetailsMutation.mutate(values) :
							addVenueMutation.mutate(values);
						setSubmitting(false);
					}}
				>
					<Form>
						<Grid
							container spacing={1} columnSpacing={3}>
							<Grid size={6}>
								<DrozeTextField
									fullWidth
									name="name"
									placeholder="Venue name"
									size="small"
								/>
							</Grid>
							<Grid size={6}>
								<DrozeTextField
									fullWidth
									name="address"
									placeholder="Address"
									size="small"
								/>
							</Grid>
							<Grid size={6}>
								<DrozeTextField
									fullWidth
									name="email"
									placeholder="Email"
									size="small"
								/>
							</Grid>
							<Grid size={6}>
								<DrozeTextField
									fullWidth
									name="phone"
									placeholder="Phone"
									size="small"
								/>
							</Grid>
							<Grid size={12}>
								<Box
									display="flex"
									justifyContent="flex-end"
								>
									<Button variant="outlined" type="submit">
										{changeDetails ?
											"Change Venue Details" :
											"Add a Venue"}
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</Box>
		</Modal>
	)
};