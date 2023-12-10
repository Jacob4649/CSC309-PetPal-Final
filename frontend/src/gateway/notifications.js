import { BACKEND_ENDPOINT, NOTIFICATION_URL } from "./static";
import generateHeaders from "../utils/fetchTokenSet";

/**
 * Gets notification data
 * @param page the page to fetch
 * @param read whether to fetch read notifications 
 * @returns 
 */
export const getNotifications = async (page, read = false) => {
    read = read ? "True" : "False"
    const fullEndpoint = `${BACKEND_ENDPOINT}/${NOTIFICATION_URL}?page=${page}&read=${read}`;
    const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: generateHeaders()
    });
    return await response.json();
}