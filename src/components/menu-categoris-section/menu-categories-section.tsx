import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CellWithTooltip, TableHeadCellText } from "../droze-table-helpers/droze-table-helpers";
import { useMenuCategoriesSectionController } from "./use-menu-categories-section-controller";
import { MenuCategoriesPopover } from "./menu-categories-popover";
import { DrozeDialogBox } from "../droze-dialog-box/droze-dialog-box";

export const MenuCategoriesListSection = () => {

    const {
        venueId,
        selectedRowId,
        setSelectedRowId,
        anchorEl,
        setAnchorEl,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        category,
        setCategory,
        categories,
        addMenuCategoryMutation,
        changeMenuCategoryMutation,
        deleteMenuCategoryMutation
    } = useMenuCategoriesSectionController();

    return (
        <Box
            component="section"
            display="flex"
            flexDirection="column"
            gap={2}
            borderRadius={3}
            padding={3}
            boxShadow={4}
            width={322}
            height={393}
            flex={1}
        >
            <MenuCategoriesPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                venueId={venueId}
                setCategory={setCategory}
                addMenuCategoryMutation={addMenuCategoryMutation}
                changeMenuCategoryMutation={changeMenuCategoryMutation}
                categoryId={selectedRowId}
                category={category}
            />
            <DrozeDialogBox
                isOpen={isDeleteDialogOpen}
                handleClose={() => setIsDeleteDialogOpen(false)}
                handleAction={() => deleteMenuCategoryMutation(selectedRowId)}
                titleText="You are deleting the venue."
                contentText="This action is ireversible,
                    after you delete the venue the only way 
                    to get all the information back is to set up it from scratch."
                positiveBtnText="Confirm Delete"
                negativeBtnText="Cancel"
            />
            <Box
                boxShadow={2}
                px={2} py={1}
                borderRadius={3}
                display="flex"
                justifyContent="space-between"
            >
                <Typography color="primary" fontWeight="bold">
                    Menu Categories
                </Typography>
                <Button
                    sx={{ padding: 0 }}
                    onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                    }}>
                    <AddIcon />
                </Button>
            </Box>
            <Box
                component="section"
                boxShadow={2}
                borderRadius={3}
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height={300}
            >
                {categories ?
                    <TableContainer sx={{ flex: 1 }}>
                        <Table stickyHeader size="small" sx={{ tableLayout: "fixed" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <TableHeadCellText populateText="Categories" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TableHeadCellText populateText="Edit / Delete" />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    categories.map((item) => (
                                        <TableRow key={item.id} hover selected={selectedRowId === item.id}
                                            onClick={() => {
                                                selectedRowId === item.id ? setSelectedRowId("") : setSelectedRowId(item.id);
                                            }}>
                                            <CellWithTooltip populateText={item.category} />
                                            <TableCell align="center" sx={{ px: 0 }}>
                                                <Button
                                                    onClick={(event) => {
                                                        setCategory(item.category);
                                                        setAnchorEl(event.currentTarget);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    color="error"
                                                    onClick={() => setIsDeleteDialogOpen(true)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <Typography>Venue not yet selected</Typography>
                }
            </Box>
        </Box>
    )
}