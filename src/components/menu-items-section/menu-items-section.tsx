import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CellWithTooltip, TableHeadCellText } from "../droze-table-helpers/droze-table-helpers";
import { useMenuItemsSectionController } from "./use-menu-items-section-controller";
import { AddMenuItemModal } from "./add-menu-item-modal";
import { DrozeDialogBox } from "../droze-dialog-box/droze-dialog-box";

export const MenuItemsSection = () => {
    const {
        venueId,
        categoryId,
        showToast,
        selectedItem,
        setSelectedItem,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isAddChangeOpen,
        setIsAddChangeOpen,
        changeDetailsBody,
        setChangeDetailsBody,
        menuItems,
        categoryMenuItems,
        addMenuItemAction,
        changeMenuItemAction,
        deleteMenuItemAction,
    } = useMenuItemsSectionController();

    return (
        <>
            <AddMenuItemModal
                isOpen={isAddChangeOpen}
                onClose={() => setIsAddChangeOpen(false)}
                AddMenuItemAction={addMenuItemAction}
                changeDetailsAction={changeMenuItemAction}
                changeDetails={changeDetailsBody}
            />
            <DrozeDialogBox
                isOpen={isDeleteDialogOpen}
                handleClose={() => setIsDeleteDialogOpen(false)}
                handleAction={() => deleteMenuItemAction(selectedItem)} //
                titleText="You are deleting the menu item."
                contentText="This action is ireversible,
                                after you delete the menu item the only way 
                                to get all the information back is to set up it from scratch."
                positiveBtnText="Confirm Delete"
                negativeBtnText="Cancel"
            />
            <Box
                component="section"
                display="flex"
                flexDirection="column"
                gap={2}
                borderRadius={3}
                padding={3}
                boxShadow={4}
                width={730}
                height={393}
            >
                <Box
                    boxShadow={2}
                    px={2} py={1}
                    borderRadius={3}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography color="primary" fontWeight="bold">
                        Menu Items
                    </Typography>
                    {venueId ?
                        <Typography color="primary" fontWeight="bold">
                            {categoryId ? "Category Specific Items" : "Full List of Items"}
                        </Typography> :
                        null
                    }
                    <Button sx={{ padding: 0 }} onClick={() => {
                        setChangeDetailsBody(undefined);
                        {
                            venueId && categoryId ?
                                setIsAddChangeOpen(true) :
                                showToast("Plese select both venue and category first", "error");
                        }
                    }}>
                        <AddIcon />
                    </Button>
                </Box>
                <Box
                    component="section"
                    boxShadow={2}
                    borderRadius={3}
                    flex={1}
                    justifyContent="center"
                    alignItems="center" overflow="auto"
                    display="flex"
                    flexDirection="column"
                >
                    {venueId ?
                        <TableContainer sx={{ flex: 1 }}>
                            <Table stickyHeader size="small" sx={{ tableLayout: "fixed" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="20%">
                                            <TableHeadCellText populateText="Menu Item" />
                                        </TableCell>
                                        <TableCell width="40%">
                                            <TableHeadCellText populateText="Description" />
                                        </TableCell>
                                        <TableCell width="10%">
                                            <TableHeadCellText populateText="Price" />
                                        </TableCell>
                                        <TableCell width="10%" align="center">
                                            <TableHeadCellText populateText="Available" />
                                        </TableCell>
                                        <TableCell width="20%" align="center">
                                            <TableHeadCellText populateText="Edit / Delete" />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(categoryId ?
                                        categoryMenuItems : menuItems)?.map((item) => (
                                            <TableRow hover key={item.id}>
                                                <CellWithTooltip populateText={item.itemName} />
                                                <CellWithTooltip populateText={item.description || ""} />
                                                <CellWithTooltip populateText={`$ ${item.itemPrice}`} />
                                                <TableCell align="center" sx={{ px: 0 }}>
                                                    {item.isAvailable ?
                                                        <CheckCircleIcon color="success" /> :
                                                        <RemoveCircleIcon color="error" />}
                                                </TableCell>
                                                <TableCell align="center" sx={{ px: 0 }}>
                                                    <Button onClick={() => {
                                                        setChangeDetailsBody(item);
                                                        setIsAddChangeOpen(true);
                                                    }}>
                                                        <EditIcon />
                                                    </Button>
                                                    <Button color="error" onClick={() => {
                                                        setSelectedItem(item.id);
                                                        setIsDeleteDialogOpen(true);
                                                    }}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        <Typography>Venue is not yet selected</Typography>
                    }
                </Box>
            </Box >
        </>
    );
};