import { http } from "../utilities/http-client";

export const listVenues = async (accessToken: string) => {
    return http.get("/listVenues", accessToken);
};