
const generateHeaders = (content_type = "application/json") => {
    let token = null
    try {
        token = localStorage.getItem("token")
    } catch (e) { }


    let headers = {
        "Content-Type": content_type
    }

    if (token) {
        headers = {
            ...headers,
            "Authorization": `Bearer ${token}`
        }
    }
    return headers
}


export default generateHeaders;