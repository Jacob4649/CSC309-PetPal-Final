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

/**
 * 
 * @param status status of listings to get 
 * @param species species of listings to get 
 * @param age age of listings to get 
 * @param order order of listings to get 
 * @param desc whether to order descending 
 */
export const getListings = async (status, species, age, order, desc, query, page) => {
    let fullEndpoint = `${BACKEND_ENDPOINT}/${LISTINGS_URL}?sort_order=${order}&sort_reversed=${desc}&status=${status}&page=${page}`;
    if (species !== undefined) {
        fullEndpoint += `&species=${species}`
    }
    if (age !== undefined) {
        fullEndpoint += `&age_months=${age}`
    }
    if (query !== undefined) {
        fullEndpoint += `&q=${encodeURIComponent(query)}`;
    }
    const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: generateHeaders()
    });
    return await response.json();
}
