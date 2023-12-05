import { Typography, Box } from "@mui/material"

const Message = ({ is_current_user, content, time }) => {
    return (
        <Box
            sx={{ py: 3 }}>
            <Box
                sx={{ px: 1 }}>
                {
                    is_current_user ? <Typography fontSize={14} align={"left"}>{time}</Typography> :
                        <Typography fontSize={14} align={"right"}>{time}</Typography>
                }

            </Box>
            <Box
                sx={{ px: 1, pb: 1, display: "flex", justifyContent: is_current_user ? "flex-start" : "flex-end" }}
            >
                {is_current_user ?
                    <Typography sx={{ backgroundColor: "#218aff", color: "#fdfdfd", width: "fit-content", borderRadius: 3, px: 2 }} align="left">{content}</Typography>
                    :
                    <Typography sx={{ backgroundColor: "#aeb9cc", color: "#fdfdfd", width: "fit-content", borderRadius: 3, px: 2 }} align="right">{content}</Typography>
                }


            </Box>

        </Box>
    )
}

export default Message