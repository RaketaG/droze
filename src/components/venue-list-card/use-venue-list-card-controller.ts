import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteVenue, venueList } from "../../api/venues-api";
import useAuth from "../../hooks/use-auth"
import { useNavigate } from "react-router";

export const useVenueListCardController = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const { isPending, data } = useQuery({
        queryKey: ["venueList"],
        queryFn: () => venueList(accessToken)
    });

    const mutant = useMutation({
        mutationFn: (venueId: string) => deleteVenue(venueId, accessToken),
        onSuccess: () => navigate(0)
    });

    return {
        isPending,
        data,
        mutant,
    };
};