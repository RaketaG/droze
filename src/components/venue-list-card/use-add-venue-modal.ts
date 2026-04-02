import { useMutation } from "@tanstack/react-query"
import { addVenue, type VenueBodyType } from "../../api/venues-api"
import useAuth from "../../hooks/use-auth"
import { useNavigate } from "react-router";

export const useAddVenueModal = () => {
    const { accessToken, userId } = useAuth();
    const navigate = useNavigate();

    const mutant = useMutation({
        mutationFn: (body: Omit<VenueBodyType, "userId">) => addVenue({
            ...body,
            userId
        }, accessToken),
        onSuccess: () => navigate(0)
    });

    return mutant;
}