import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useVenueListCardController } from "./use-venue-list-section-controller";
import { AddVenueModal } from "./add-venue-modal";
import { DrozeDialogBox } from "../droze-dialog-box/droze-dialog-box";
import { CellWithTooltip, TableHeadCellText } from "../droze-table-helpers/droze-table-helpers";

export const VenueListCard = () => {
    const {
        isAddChangeOpen,
        setIsAddChangeOpen,
        changeDetailsBody,
        setChangeDetailsBody,
        deleteDialogSettings,
        setDeleteDialogSettings,
        selectedRowId,
        setSelectedRowId,
        page,
        setPage,
        rows,
        addVenueMutation,
        changeVenueDetailsMutation,
        deleteVenueMutate,
        rowsPerPage,
        visibleRows
    } = useVenueListCardController();

    return (
        <Box
            component="section"
            display="flex"
            flexDirection="column"
            gap={2}
            borderRadius={3}
            padding={3}
            boxShadow={4}
            width={800}
            height={393}
        >
            <DrozeDialogBox
                isOpen={deleteDialogSettings.isOpen}
                handleClose={() => setDeleteDialogSettings({
                    isOpen: false,
                    venueId: ""
                })}
                handleAction={() => {
                    deleteVenueMutate(deleteDialogSettings.venueId);
                }}
                titleText="You are deleting the venue."
                contentText="This action is ireversible,
                    after you delete the venue the only way 
                    to get all the information back is to set up it from scratch."
                positiveBtnText="Confirm Delete"
                negativeBtnText="Cancel"
            />
            <AddVenueModal
                isOpen={isAddChangeOpen}
                onClose={() => setIsAddChangeOpen(false)}
                changeDetailsAction={changeVenueDetailsMutation}
                AddVenueAction={addVenueMutation}
                changeDetails={changeDetailsBody}
            />
            <Box
                boxShadow={2}
                px={2} py={1}
                borderRadius={3}
                display="flex"
                justifyContent="space-between"
            >
                <Typography color="primary" fontWeight="bold">
                    Your Venues
                </Typography>
                <Button sx={{ padding: 0 }} onClick={() => {
                    setChangeDetailsBody(undefined);
                    setIsAddChangeOpen(true);
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
                flexDirection="column"
            >
                <TableContainer sx={{ flex: 1 }}>
                    <Table size="small" sx={{ tableLayout: "fixed" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableHeadCellText populateText="Venue Name" />
                                </TableCell>
                                <TableCell>
                                    <TableHeadCellText populateText="Address" />
                                </TableCell>
                                <TableCell>
                                    <TableHeadCellText populateText="Email" />
                                </TableCell>
                                <TableCell>
                                    <TableHeadCellText populateText="Phone" />
                                </TableCell>
                                <TableCell align="center">
                                    <TableHeadCellText populateText="Edit / Delete" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row) => (
                                <TableRow
                                    key={row.id} hover selected={selectedRowId === row.id}
                                    onClick={() => {
                                        selectedRowId === row.id ? setSelectedRowId("") : setSelectedRowId(row.id);
                                    }}
                                >
                                    <CellWithTooltip populateText={row.name} />
                                    <CellWithTooltip populateText={row.address} />
                                    <CellWithTooltip populateText={row.email} />
                                    <CellWithTooltip populateText={row.phone} />
                                    <TableCell>
                                        <Button onClick={() => {
                                            setChangeDetailsBody(row);
                                            setIsAddChangeOpen(true);
                                        }}>
                                            <EditIcon />
                                        </Button>
                                        <Button color="error" onClick={() =>
                                            setDeleteDialogSettings({
                                                isOpen: true,
                                                venueId: row.id
                                            })
                                        }>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    count={rows?.length ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                />
            </Box>
        </Box >
    );
};