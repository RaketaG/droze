import {
    Box,
    Button,
    Paper,
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
import { useVenueListCardController } from "./use-venue-list-card-controller";
import { AddVenueModal } from "./add-venue-modal";
import { useState } from "react";


export const VenueListCard = () => {
    const { data: rows } = useVenueListCardController();

    const [isOpen, setIsOpen] = useState<boolean>(false);
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
            minHeight={"30vh"}
        >
            <AddVenueModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
                <Button sx={{ padding: 0 }} onClick={() => setIsOpen(true)}>
                    <AddIcon />
                </Button>
            </Box>
            <TableContainer
                component={Paper}
                sx={{

                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ flex: 1, overflow: "auto" }}>
                    <Table stickyHeader aria-label="venues">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows?.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>

                <TablePagination
                    rowsPerPageOptions={[10, 50]}
                    component="div"
                    count={1}
                    rowsPerPage={10}
                    page={1}
                    onPageChange={() => { }}
                    onRowsPerPageChange={() => { }}
                />
            </TableContainer>
        </Box>
    );
};