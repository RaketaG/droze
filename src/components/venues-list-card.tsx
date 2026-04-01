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
import { useQuery } from "@tanstack/react-query";
import { listVenues } from "../api/venues-api";
import useAuth from "../hooks/use-auth";

export const VenuesListCard = () => {
    const { accessToken } = useAuth();

    const result = useQuery({ queryKey: ['venues'], queryFn: () => listVenues(accessToken) })
    console.log("gocha", result.data)

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
            height={"30vh"}
        >
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
                <Button sx={{ padding: 0 }} onClick={() => result.refetch()}>
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
                            <TableRow>
                                <TableCell>Gocha</TableCell>
                                <TableCell>Gocha</TableCell>
                                <TableCell>Gocha</TableCell>
                                <TableCell>Gocha</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>

                <TablePagination
                    rowsPerPageOptions={[10, 50]}
                    component="div"
                    count={3}
                    rowsPerPage={3}
                    page={1}
                    onPageChange={() => { }}
                    onRowsPerPageChange={() => { }}
                />
            </TableContainer>
        </Box>
    );
};