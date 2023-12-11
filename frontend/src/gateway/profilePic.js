import { BACKEND_ENDPOINT } from "./static";

/**
 * Gets the url for the profile pic of a user
 * @param id user id 
 */
export const getProfilePicURL = (id) => BACKEND_ENDPOINT + `accounts/${id}/profile_image/`;