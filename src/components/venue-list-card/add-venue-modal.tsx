import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Form, Formik } from 'formik';
import { DrozeTextField } from "../droze-text-field/droze-text-field";
import { addVenueInitialValues, addVenueValueValidator } from "./add-venue-formik-config";
import CloseIcon from '@mui/icons-material/Close';
import type { VenueBodyType, VenueListType } from "../../api/venues-api";

export const AddVenueModal = (
	{
		isOpen,
		onClose,
		AddVenueAction,
		changeDetailsAction,
		changeDetails
	}: {
		isOpen: boolean,
		onClose: () => void,
		AddVenueAction: (body: Omit<VenueBodyType, "userId">) => void,
		changeDetailsAction: (body: Omit<VenueListType, "userId">) => void,
		changeDetails?: any | undefined
	}
) => {
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
				borderRadius={3}
				boxShadow={4}
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
					onSubmit={(values) => {
						changeDetails ?
							changeDetailsAction(values) :
							AddVenueAction(values);
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