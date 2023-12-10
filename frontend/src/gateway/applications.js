import { APPLICATIONS_URL, BACKEND_ENDPOINT } from "./static";
import generateHeaders from "../utils/fetchTokenSet";
import { getListing } from "./listings";

/**
 * Gets notification data
 * @param page the page to fetch
 * @param read whether to fetch read notifications 
 * @returns 
 */
export const getApplications = async (page) => {
    const fullEndpoint = `${BACKEND_ENDPOINT}/${APPLICATIONS_URL}?page=${page}`;
    const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: generateHeaders()
    });
    const json = await response.json();
    if (!!json && !!json.results) {
        json.results = json.results.map(async x => await expand(x.id));
        json.results = await Promise.all(json.results);
        json.results.forEach(x => x.created_time = new Date(x.created_time));
    }
    return json;
}

/**
 * 
 * @param applicationId ID of the application to get 
 * @returns the expanded application
 */
const expand = async (applicationId) => {
    const fullEndpoint = `${BACKEND_ENDPOINT}/${APPLICATIONS_URL}${applicationId}`;
    const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: generateHeaders()
    });
    const json = await response.json();

    if (!!json && !!json.listing) json.listing = await getListing(json.listing);
    return json;
}