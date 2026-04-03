import { useMutation } from "@tanstack/react-query"
import { addVenue, changeVenueDetails, type VenueBodyType, type VenueListType } from "../../api/venues-api"
import useAuth from "../../hooks/use-auth"
import { useNavigate } from "react-router";

export const useAddVenueModal = () => {
    const { accessToken, userId } = useAuth();
    const navigate = useNavigate();

    const addVenueMutation = useMutation({
        mutationFn: (body: Omit<VenueBodyType, "userId">) => addVenue({
            ...body,
            userId
        }, accessToken),
        onSuccess: () => navigate(0)
    });

    const changeVenueDetailsMutation = useMutation({
        mutationFn: (body: Omit<VenueListType, "userId">) => changeVenueDetails({
            ...body,
            userId
        }, accessToken),
        onSuccess: () => navigate(0)
    });

    return {
        changeVenueDetailsMutation,
        addVenueMutation
    };
}