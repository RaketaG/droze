import { useQuery } from "@tanstack/react-query";
import { venueList } from "../../api/venues-api";
import useAuth from "../../hooks/use-auth"

export const useVenueListCardController = () => {
    const { accessToken } = useAuth();

    const { isPending, data } = useQuery({
        queryKey: ["venueList"],
        queryFn: () => venueList(accessToken)
    });

    return {
        isPending,
        data,
    };
};