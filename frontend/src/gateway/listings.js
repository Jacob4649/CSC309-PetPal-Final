import { LISTINGS_URL, BACKEND_ENDPOINT } from "./static";
import generateHeaders from "../utils/fetchTokenSet";
import { getShelter } from "./shelters";

/**
 * Gets the listing with the specified ID
 * @param id id of the listing to get
 */
export const getListing = async (id) => {
    const fullEndpoint = `${BACKEND_ENDPOINT}/${LISTINGS_URL}${id}`;
    const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: generateHeaders()
    });
    const json = await response.json();
    
    if (!!json && !!json.shelter) json.shelter = await getShelter(json.shelter);

    return json;
}