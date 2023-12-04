import { Typography, Box } from "@mui/material"

const Message = ({ is_current_user, content, time }) => {
    const text_align = is_current_user ? "left" : "right"
    return (
        <Box>
            <Box
                sx={{ px: 5 }}>
                <Typography fontSize={14} align={text_align}>{time}</Typography>
            </Box>
            <Box
                sx={{ px: 5, pb: 1 }}
            >
                <Typography align={text_align}>{content}</Typography>
            </Box>

        </Box>
    )
}

export default Message