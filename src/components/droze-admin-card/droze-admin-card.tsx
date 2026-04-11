import { Avatar, Box, Button, Stack, Tooltip, Typography } from "@mui/material"

const PersonalDetailsListItem = (
    { fieldName, fieldValue }: { fieldName: string, fieldValue: string }
) => {
    return (
        <Stack direction="row" gap={2}>
            <Typography color="primary" fontWeight="bold" minWidth={85}>
                {fieldName}:
            </Typography>
            <Tooltip title={fieldValue} arrow placement="bottom-start">
                <Typography noWrap flex={1}>
                    {fieldValue}
                </Typography>
            </Tooltip>
        </Stack>
    );
};

export const DrozeAdminCard = (
    {
        username,
        email,
        phone,
        role,
        logout,
    }: {
        username: string,
        email: string,
        phone: string,
        role: string,
        logout: () => void,
    }
) => {
    return (
        <Box
            borderRadius={3}
            padding={3}
            boxShadow={4}
            boxSizing="border-box"
            component="aside"
            width={300}
            flex={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
        >
            <Avatar
                sx={{
                    boxShadow: 2,
                    width: 72,
                    height: 72,
                    bgcolor: "#1976d2"
                }}
            />
            <Stack
                boxShadow={2}
                p={2}
                boxSizing="border-box"
                borderRadius={3}
                direction="column"
                width={"100%"}
                gap={2}

            >
                <PersonalDetailsListItem fieldName="Username" fieldValue={username} />
                <PersonalDetailsListItem fieldName="Email" fieldValue={email} />
                <PersonalDetailsListItem fieldName="Phone" fieldValue={phone} />
                <PersonalDetailsListItem fieldName="Role" fieldValue={role} />
            </Stack>
            <Button onClick={logout}>
                <Typography color="error">Logout</Typography>
            </Button>
        </Box>
    )
};