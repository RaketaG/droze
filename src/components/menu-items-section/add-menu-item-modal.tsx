import { Box, Button, FormControlLabel, Grid, Modal, Switch, Typography } from "@mui/material";
import { Field, Form, Formik, type FieldProps } from 'formik';
import { DrozeTextField } from "../droze-text-field/droze-text-field";
import CloseIcon from '@mui/icons-material/Close';
import type { MenuItemListType } from "../../api/menu-items-api";
import { addMenuItemInitialValues, addMenuItemValueValidator } from "./add-menu-item-formik-config";

export const AddMenuItemModal = (
	{
		isOpen,
		onClose,
		AddMenuItemAction,
		changeDetailsAction,
		changeDetails
	}: {
		isOpen: boolean,
		onClose: () => void,
		AddMenuItemAction: (body: Omit<MenuItemListType, "id">) => void,
		changeDetailsAction: (body: MenuItemListType) => void,
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
							"Change a Menu Item Details" :
							"Create a New Menu Item"
						}
					</Typography>
					<Button
						onClick={onClose}
					>
						<CloseIcon />
					</Button>
				</Box>
				<Formik
					initialValues={changeDetails ? changeDetails : addMenuItemInitialValues}
					enableReinitialize
					validationSchema={addMenuItemValueValidator}
					onSubmit={(values) => {
						changeDetails ?
							changeDetailsAction(values) :
							AddMenuItemAction(values);
					}}
				>
					<Form>
						<Grid container spacing={1} columnSpacing={3}>
							<Grid size={6}>
								<DrozeTextField
									fullWidth
									name="itemName"
									label="Menu Item"
									placeholder="Menu Item"
									size="small"
								/>
							</Grid>
							<Grid size={3}>
								<DrozeTextField
									fullWidth
									name="itemPrice"
									label="Price"
									placeholder="Price"
									size="small"
								/>
							</Grid>
							<Grid size={3}>
								<Field name="isAvailable">
									{({ field, form }: FieldProps) => (
										<FormControlLabel
											control={
												<Switch
													checked={field.value}
													onChange={() => form.setFieldValue("isAvailable", !field.value)}
												/>
											}
											label="Available"
											labelPlacement="start"
										/>
									)}
								</Field>
							</Grid>
							<Grid size={12}>
								<DrozeTextField
									fullWidth
									multiline
									name="description"
									label="Description"
									placeholder="Description"
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
											"Change Menu Item Details" :
											"Add a Menu Item"}
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