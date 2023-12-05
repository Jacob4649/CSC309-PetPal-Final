import { PriorityHighOutlined } from "@mui/icons-material";
import { Alert, Box, AlertTitle, Typography } from "@mui/material";


const GenericErrorPage = ({ header, content }) => {
    return (<Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: 10
    }}>

        <Typography variant="h1" sx={{ p: 5 }}>{header}</Typography>
        <Typography variant="h2">{content}</Typography>

    </Box>)
}
export default GenericErrorPage;