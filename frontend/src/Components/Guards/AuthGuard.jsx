import { CircularProgress } from "@mui/material"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet"

const AuthGuard = ({ children, is_logged_in, setUserInfo, navigate = true }) => {
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    if (loading) return <CircularProgress />
    if (is_logged_in) {
        return children
    }
    if (token) {
        setLoading(true)
        fetch("http://127.0.0.1:8000/accounts/shelters/info/", { headers: generateHeaders() }).then((res) => res.json()).then((userInfo) => {
            setLoading(false)
            setUserInfo(userInfo)
        }).catch((e) => { setError(true) })
    }
    if (navigate || error) {
        return <Navigate to={"/login"} />
    } else {
        return children
    }


}

export default AuthGuard