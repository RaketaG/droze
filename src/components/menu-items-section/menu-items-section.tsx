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
import { CellWithTooltip, TableHeadCellText } from "../droze-table-helpers/droze-table-helpers";

export const MenuItemsList = () => {

    return (
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
                    Your Venues
                </Typography>
                <Button sx={{ padding: 0 }} onClick={() => { }}>
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
                            <TableRow>
                                <CellWithTooltip populateText="Khachapuri" />
                                <CellWithTooltip populateText="Bread with  cheese inside sensation like no other more" />
                                <CellWithTooltip populateText="23.44$" />
                                <TableCell align="center" sx={{ px: 0 }}>
                                    <CheckCircleIcon color="success" />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0 }}>
                                    <Button onClick={() => { }}>
                                        <EditIcon />
                                    </Button>
                                    <Button color="error" onClick={() => { }}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    );
};