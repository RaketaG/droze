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
    Tooltip,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useVenueListCardController } from "./use-venue-list-card-controller";
import { AddVenueModal } from "./add-venue-modal";
import { useState } from "react";
import type { VenueListType } from "../../api/venues-api";

const tableCellSx = {
    overflow: "hidden",
    textOverflow: "ellipsis", whiteSpace: "nowrap",
};

const CellWithTooltip = ({ populateText }: { populateText: string }) => {
    return (
        <TableCell sx={tableCellSx}>
            <Tooltip title={populateText} arrow placement="bottom-start">
                <Typography variant="subtitle2">{populateText}</Typography>
            </Tooltip>
        </TableCell>
    );
};

export const VenueListCard = () => {
    const { data: rows, mutant } = useVenueListCardController();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [changeDetailsBody, setChangeDetailsBody] = useState<VenueListType | undefined>();

    const [selectedRowId, setSelectedRowId] = useState<string>("");

    const [page, setPage] = useState<number>(0);

    const rowsPerPage = 5;
    const visibleRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) ?? [];

    return (
        <Box
            component="section"
            display="flex"
            flexDirection="column"
            gap={2}
            border={1}
            borderRadius={3}
            padding={3}
            boxShadow={1}
            width={800}
            height={393}
        >
            <AddVenueModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                changeDetails={changeDetailsBody}
            />
            <Box
                border={1}
                padding={1}
                borderRadius={3}
                display="flex"
                justifyContent="space-between"
            >
                <Typography>
                    Your Venues
                </Typography>
                <Button sx={{ padding: 0 }} onClick={() => {
                    setChangeDetailsBody(undefined);
                    setIsOpen(true);
                }}>
                    <AddIcon />
                </Button>
            </Box>
            <Box
                component="section"
                boxShadow={1}
                borderRadius={3}
                flex={1}
                display="flex"
                flexDirection="column"
            >
                <TableContainer sx={{ flex: 1 }}>
                    <Table size="small" sx={{ tableLayout: "fixed" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableCellSx}>Name</TableCell>
                                <TableCell sx={tableCellSx}>Address</TableCell>
                                <TableCell sx={tableCellSx}>Email</TableCell>
                                <TableCell sx={tableCellSx}>Phone</TableCell>
                                <TableCell sx={tableCellSx} align="center">Edit / Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row) => (
                                <TableRow
                                    key={row.id} hover selected={selectedRowId === row.id}
                                    onClick={() => {
                                        setSelectedRowId(prev => prev === row.id ? "" : row.id);
                                    }}
                                >
                                    <CellWithTooltip populateText={row.name} />
                                    <CellWithTooltip populateText={row.address} />
                                    <CellWithTooltip populateText={row.email} />
                                    <CellWithTooltip populateText={row.phone} />
                                    <TableCell sx={tableCellSx}>
                                        <Button onClick={() => {
                                            setChangeDetailsBody(row);
                                            setIsOpen(true);
                                        }}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => mutant.mutate(row.id)}>
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