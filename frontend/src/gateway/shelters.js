import { SHELTERS_URL, BACKEND_ENDPOINT } from "./static";
import generateHeaders from "../utils/fetchTokenSet";

/**
 * Gets the shelter with the specified ID
 * @param id id of the shelter to get
 */
export const getShelter = async (id) => {
    const fullEndpoint = `${BACKEND_ENDPOINT}/${SHELTERS_URL}${id}`;
    const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: generateHeaders()
    });
    return await response.json();
}