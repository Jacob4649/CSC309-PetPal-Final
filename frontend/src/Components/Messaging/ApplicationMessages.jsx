import { Paper, Container, Button, Box, Typography, Link, IconButton } from "@mui/material"
import Chatbox from "./Chatbox"
import { useState } from "react"
import Message from "./Message"
import { ArrowDownwardRounded } from "@mui/icons-material"

const ApplicationMessages = ({ messageData, is_seeker }) => {
    const [chatValue, setChatValue] = useState("afdsafdsa")

    return (
        <Paper
            elevation={10}
            sx={{
                width: {
                    xs: 300,
                    md: 500,
                    lg: 1000
                }
            }}
        >
            <Box
                sx={{
                    overflowY: "auto",
                    height: 500,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                {/* {messageData.map((message) => <Message is_current_user={is_seeker === message.is_user} content={message.content} time={message.time_sent} />)} */}
                <Box>
                    fdafdsa
                </Box>
                <Box
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton><ArrowDownwardRounded /></IconButton>
                </Box>
            </Box>
            <Box>
                <Chatbox
                    onClick={(e) => setChatValue("")}
                    value={chatValue}
                    onChange={(e) => setChatValue(e.target.value)}
                />
            </Box>
        </Paper>
    )
}
export default ApplicationMessages