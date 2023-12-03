import { Navigate } from "react-router-dom"

const RouteGuard = ({ children, is_permitted, redirect }) => {
    if (!is_permitted) {
        console.log("redirected")
        return <Navigate to={redirect} />
    }
    console.log("rendering children")
    return children
}

export default RouteGuard