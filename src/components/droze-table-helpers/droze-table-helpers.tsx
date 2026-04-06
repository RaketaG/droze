import { TableCell, Tooltip, Typography } from "@mui/material";

export const CellWithTooltip = ({ populateText }: { populateText: string }) => {
    return (
        <TableCell>
            <Tooltip title={populateText} arrow placement="bottom-start">
                <Typography variant="subtitle2" noWrap>{populateText}</Typography>
            </Tooltip>
        </TableCell>
    );
};

export const TableHeadCellText = ({ populateText }: { populateText: string }) => {
    return (
        <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary"
        >
            {populateText}
        </Typography>
    );
};