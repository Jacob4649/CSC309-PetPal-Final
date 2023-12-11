/**
 * Cat constant
 */
export const CATS = 'Cat';

/**
 * Dog constant
 */
export const DOGS = 'Dog';

/**
 * All constant
 */
export const ALL = undefined; 

/**
 * Order by name constant
 */
export const NAME = 'name' 

/**
 * Order by age constant
 */
export const AGE = 'age_months'

/**
 * Order by height constant
 */
export const HEIGHT = 'height_feet'

/**
 * Order by weight constant
 */
export const WEIGHT = 'weight_lbs'

/**
 * Adopted listing constant
 */
export const ADOPTED = 1

/**
 * Open listing constant
 */
export const OPEN = 3

/**
 * Default search params
 */
export const DEFAULT_PARAMS = {
    shelters: true,
    species: ALL,
    order: NAME,
    status: OPEN,
    text: '',
};