/**
 * Endpoint for the backend
 */
export const BACKEND_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://csc309-petpal-final-z6sgv3ckqa-pd.a.run.app';

// -------------- ROUTES --------------

/**
 * Route for getting notifications
 */
export const NOTIFICATION_URL = 'notifications/';

/**
 * Route for getting applications
 */
export const APPLICATIONS_URL = 'applications/';

/**
 * Route for getting listings
 */
export const LISTINGS_URL = 'listings/';

/**
 * Route for getting shelters
 */
export const SHELTERS_URL = 'accounts/shelters/';
