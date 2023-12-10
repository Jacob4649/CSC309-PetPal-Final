import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { ArrowBack, Home } from "@mui/icons-material"

const HomeButton = () => {
    const navigate = useNavigate()

    return (
        <Button variant='outlined' onClick={() => navigate("/")}><ArrowBack /><Home sx={{ mr: 1 }} /> Take Me Home</Button>
    )
}

export default HomeButton