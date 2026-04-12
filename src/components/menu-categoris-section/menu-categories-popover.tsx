import { Button, Popover, Stack, TextField } from "@mui/material";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";

type MenuCategoriesPopoverType = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (param: any) => void;
    setCategory: (param: any) => void;
    addMenuCategoryMutation: () => void;
    changeMenuCategoryMutation: UseMutateFunction<{}, {}, { id: string; category: string; }>;
    categoryId?: string;
    category?: string;
};

export const MenuCategoriesPopover = (
    { anchorEl, setAnchorEl, setCategory,
        addMenuCategoryMutation, changeMenuCategoryMutation,
        categoryId, category }: MenuCategoriesPopoverType
) => {

    const [isAcceptable, setIsAcceptable] = useState<boolean>(true);

    return (
        <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => {
                setAnchorEl(null);
                setIsAcceptable(true);
            }}
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
                component="form"
                direction="column"
                padding={3}
                gap={2}
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!category) {
                        setIsAcceptable(false);
                        return;
                    }
                    setIsAcceptable(true);
                    categoryId
                        ? changeMenuCategoryMutation({ id: categoryId, category: category! })
                        : addMenuCategoryMutation();
                }}
            >
                <TextField
                    size="small"
                    label="Menu Category"
                    placeholder="Menu Category"
                    value={categoryId ? category : undefined}
                    onChange={(event) => {
                        setCategory(event.target.value);
                        if (!isAcceptable) setIsAcceptable(true);
                    }}
                    error={!isAcceptable}
                    helperText={
                        !isAcceptable && "Must not be empty"
                    }
                />
                <Button variant="outlined" type="submit">
                    {categoryId ? "Rename Category" : "Add Category"}
                </Button>
            </Stack>
        </Popover >
    );
};