import { ArrowOutward, ArrowUpward, ThumbUp, ThumbUpAlt, TroubleshootTwoTone } from "@mui/icons-material"
import {
    TableRow,
    TableCell,
    Icon,
    IconButton,
    Avatar,
    Container,
    Typography,
    Box
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import generateHeaders from "../../utils/fetchTokenSet"
import { useState } from "react"
import { BACKEND_ENDPOINT } from "../../gateway/static"

const ShelterBlogSummary = ({ title, shelter_name, blog_id, curr_user_liked, avatar, like_count, set_shelter_blog_info }) => {
    const navigate = useNavigate()
    const like_blog = () => {
        console.log(curr_user_liked === false ? like_count + 1 : like_count - 1)
        console.log(!curr_user_liked)
        set_shelter_blog_info(curr_user_liked === false ? like_count + 1 : like_count - 1, !curr_user_liked)
        fetch(`${BACKEND_ENDPOINT}/shelter-blogs/${blog_id}/like/`, {
            method: "POST",
            headers: generateHeaders()
        })
    }
    return (
        <TableRow>
            <TableCell width={2}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <IconButton onClick={() => like_blog()}>
                        {
                            curr_user_liked ?
                                <ThumbUp color="primary" /> :
                                <ThumbUpAlt />
                        }
                    </IconButton>
                    <Typography>
                        {like_count}
                    </Typography>
                </Box>

            </TableCell>
            <TableCell>
                <Container disableGutters sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={avatar ? avatar : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} sx={{ marginRight: 3 }} />
                    {shelter_name}
                </Container>
            </TableCell>
            <TableCell>
                {title}
            </TableCell>
            <TableCell>
                <IconButton onClick={() => { navigate(`/shelter-blogs/${blog_id}`) }}>
                    <ArrowOutward />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ShelterBlogSummary