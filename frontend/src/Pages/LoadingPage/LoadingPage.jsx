import { Box, CircularProgress } from "@mui/material"


const LoadingPage = () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress
                size={80} />
        </Box>
    )
}

export default LoadingPage