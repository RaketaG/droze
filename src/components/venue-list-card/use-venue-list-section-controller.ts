import { useMutation, useQuery } from "@tanstack/react-query";
import { addVenue, changeVenueDetails, deleteVenue, venueList, type VenueBodyType, type VenueListType } from "../../api/venues-api";
import useAuth from "../../hooks/use-auth"
import { useState } from "react";
import { useToast } from "../toast";
import useManage from "../../hooks/use-manage";

export const useVenueListCardController = () => {
    const { accessToken, userId } = useAuth();
    const { showToast } = useToast();

    const { venueId: selectedRowId, setVenueId: setSelectedRowId, setCategoryId } = useManage();

    const [isAddChangeOpen, setIsAddChangeOpen] = useState<boolean>(false);
    const [changeDetailsBody, setChangeDetailsBody] = useState<VenueListType | undefined>();

    const [
        deleteDialogSettings,
        setDeleteDialogSettings
    ] = useState<{ isOpen: boolean, venueId: string }>({
        isOpen: false,
        venueId: ""
    });

    const [page, setPage] = useState<number>(0);

    const { isPending, data: rows, refetch: refetchRows } = useQuery({
        queryKey: ["venueList"],
        queryFn: () => venueList(accessToken)
    });

    const { mutate: addVenueMutation } = useMutation({
        mutationFn: (body: Omit<VenueBodyType, "userId">) => addVenue({
            ...body,
            userId
        }, accessToken),
        onSuccess: () => {
            refetchRows();
            showToast("Venue Added Successfully", "success");
            setIsAddChangeOpen(false);
        },
        onError: (error) => {
            showToast(error.message, "error");
            setIsAddChangeOpen(false);
        }
    });

    const { mutate: changeVenueDetailsMutation } = useMutation({
        mutationFn: (body: Omit<VenueListType, "userId">) => changeVenueDetails({
            ...body,
            userId
        }, accessToken),
        onSuccess: () => {
            refetchRows();
            showToast("Details Changed Successfully", "success");
            setIsAddChangeOpen(false);
        },
        onError: (error) => {
            showToast(error.message, "error");
            setIsAddChangeOpen(false);
        }
    });


    const { mutate: deleteVenueMutate } = useMutation({
        mutationFn: (venueId: string) => deleteVenue(venueId, accessToken),
        onSuccess: () => {
            refetchRows();
            showToast("Details Changed Successfully", "success");
            setDeleteDialogSettings({
                isOpen: false,
                venueId: ""
            });
        },
        onError: (error) => {
            showToast(error.message, "error");
        }
    });

    const rowsPerPage = 5;
    const visibleRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) ?? [];

    return {
        isAddChangeOpen,
        setIsAddChangeOpen,
        changeDetailsBody,
        setChangeDetailsBody,
        deleteDialogSettings,
        setDeleteDialogSettings,
        selectedRowId,
        setSelectedRowId,
        setCategoryId,
        page,
        setPage,
        isPending,
        rows,
        addVenueMutation,
        changeVenueDetailsMutation,
        deleteVenueMutate,
        rowsPerPage,
        visibleRows
    };
};