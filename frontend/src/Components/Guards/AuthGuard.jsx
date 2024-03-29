import { Navigate } from "react-router-dom"
import { useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet"
import LoadingPage from "../../Pages/LoadingPage/LoadingPage"
import { BACKEND_ENDPOINT } from "../../gateway/static"

const AuthGuard = ({ children, is_logged_in, setUserInfo, navigate = true }) => {
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    if (loading) return <LoadingPage />
    if (is_logged_in) {
        return children
    }
    if (token) {
        setLoading(true)
        fetch(`${BACKEND_ENDPOINT}/accounts/shelters/info/`, { headers: generateHeaders() }).then((res) => res.json()).then((userInfo) => {
            setLoading(false)
            setUserInfo(userInfo)
        }).catch((e) => { setError(true) })
    }
    if (navigate || error) {
        return <Navigate to={"/"} />
    } else {
        return children
    }


}

export default AuthGuard