import { CircularProgress } from "@mui/material"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet"

const AuthGuard = ({ children, is_logged_in, setUserInfo, navigate = true }) => {
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    if (loading) return <CircularProgress />
    if (is_logged_in) {
        return children
    }
    console.log("here1")
    if (token) {
        setLoading(true)
        fetch("http://127.0.0.1:8000/accounts/shelters/info/", { headers: generateHeaders() }).then((res) => res.json()).then((userInfo) => {
            console.log("here")
            setLoading(false)
            setUserInfo(userInfo)
        })
    }
    if (navigate) {
        return <Navigate to={"/login"} />
    } else {
        return children
    }


}

export default AuthGuard