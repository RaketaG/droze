import { http } from "../utilities/http-client";

export interface VenueBodyType {
    address: string;
    email: string;
    name: string;
    phone: string;
    userId: string;
};

interface VenueListType extends VenueBodyType {
    id: string;
};

export const venueList = async (accessToken: string): Promise<VenueListType[]> => {
    return await http.get("/listVenues", accessToken);
};

export const addVenue = async (body: VenueBodyType, accessToken: string) => {
    return await http.post("/addVenue", body, accessToken);
} 