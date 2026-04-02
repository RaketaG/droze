import { Box, Button, Modal } from "@mui/material";
import { Form, Formik } from 'formik';
import { DrozeTextField } from "../droze-text-field/droze-text-field";
import { useAddVenueModal } from "./use-add-venue-modal";
import { addVenueInitialValues, addVenueValueValidator } from "./add-venue-formik-config";

export const AddVenueModal = (
	{ isOpen, onClose }:
		{ isOpen: boolean, onClose: () => void }
) => {
	const { mutate: addVenue } = useAddVenueModal()

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
			<Formik
				initialValues={addVenueInitialValues}
				validationSchema={addVenueValueValidator}
				onSubmit={(values, { setSubmitting }) => {
					addVenue(values)
					setSubmitting(false);
				}}
			>
				<Form>
					<Box
						display="flex"
						gap={2}
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						padding={3}
						borderRadius={3}
						border={1}
						boxShadow={1}
						sx={{
							backgroundColor: "white"
						}}
					>
						<DrozeTextField
							name="name"
							placeholder="Venue name"
							size="small"
						/>
						<DrozeTextField
							name="address"
							placeholder="Address"
							size="small"
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
						<Button type="submit">Add a venue</Button>
					</Box>
				</Form>
			</Formik>
		</Modal>
	)
};