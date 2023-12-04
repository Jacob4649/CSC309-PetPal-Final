
// creates a new object without null fields
const clean_request_data = (object) => {
    return Object.fromEntries(Object.entries(object).filter(([_, v]) => v != null));
}

export default clean_request_data