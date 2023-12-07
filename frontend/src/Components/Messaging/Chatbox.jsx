import { Close, Send } from "@mui/icons-material"
import { Container, IconButton, TextField, Box } from "@mui/material"

const Chatbox = ({ onClick, value, onChange, replyingClear = false, rows, variant = "outlined", replying = false }) => {

    return (
        <TextField
            value={value}
            sx={{ width: "100%" }}
            variant={variant}
            rows={rows ? rows : 1}
            onChange={(e) => onChange(e)}
            InputProps={{
                startAdornment: replying ? <IconButton onClick={(e) => replyingClear()}><Close /></IconButton> : <></>,
                endAdornment: <IconButton onClick={(e) => onClick()} disabled={value === ""}><Send /></IconButton>
            }} />
    )
}

export default Chatbox;