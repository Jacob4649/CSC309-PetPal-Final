import { Send } from "@mui/icons-material"
import { Container, IconButton, TextField, Box } from "@mui/material"

const Chatbox = ({ onClick, value, onChange, replying_to, rows }) => {

    return (
        <TextField
            value={value}
            sx={{ width: "100%" }}
            variant="outlined"
            rows={rows ? rows : 1}
            onChange={(e) => onChange(e)}
            InputProps={{
                startAdornment: replying_to ? <Box sx={{
                    width: "fit-content",
                    whiteSpace: "nowrap",
                    color: "blue",
                    paddingRight: 2
                }} >@{replying_to}</Box> : <></>,
                endAdornment: <IconButton onClick={(e) => onClick()} disabled={value === ""}><Send /></IconButton>
            }} />
    )
}

export default Chatbox;