import { Button, Popover, Stack, TextField, Typography } from "@mui/material";
import type { UseMutateFunction } from "@tanstack/react-query";

type MenuCategoriesPopoverType = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (param: any) => void;
    venueId: string;
    setCategory: (param: any) => void;
    addMenuCategoryMutation: () => void;
    changeMenuCategoryMutation: UseMutateFunction<{}, {}, { id: string; category: string; }>;
    categoryId?: string;
    category?: string;
};

export const MenuCategoriesPopover = (
    { anchorEl, setAnchorEl, venueId,
        setCategory, addMenuCategoryMutation, changeMenuCategoryMutation,
        categoryId, category }: MenuCategoriesPopoverType
) => {
    return (
        <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3
                    }
                }
            }}
        >
            <Stack
                direction="column"
                padding={3}
                gap={2}
            >
                {venueId ?
                    <>
                        <TextField
                            value={categoryId ? category : undefined}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => categoryId ?
                                changeMenuCategoryMutation({ id: categoryId, category: category! }) :
                                addMenuCategoryMutation()}
                        >
                            {categoryId ? "Rename Category" : "Add Category"}
                        </Button>
                    </> :
                    <Typography>Please select a venue to add a menu category</Typography>
                }
            </Stack>
        </Popover >
    );
};