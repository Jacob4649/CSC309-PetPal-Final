import { useNavigate, useParams } from "react-router-dom"
import generateHeaders from "../../utils/fetchTokenSet"
import { useEffect, useState } from "react"
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material"
import { ThumbUp, ThumbUpAlt } from "@mui/icons-material"
import LoadingPage from "../LoadingPage/LoadingPage"

const ShelterBlogPage = ({ userInfo }) => {
    const { shelter_blog_id } = useParams()
    const [likeCount, setLikeCount] = useState()
    const [liked, setLiked] = useState()
    const [loading, setLoading] = useState(true)
    const [blogInfo, setBlogInfo] = useState(true)
    const navigate = useNavigate()

    const like_blog = () => {
        fetch(`http://127.0.0.1:8000/shelter-blogs/${shelter_blog_id}/like/`,
            {
                method: "POST",
                headers: generateHeaders()
            })
        setLikeCount(liked === false ? likeCount + 1 : likeCount - 1)
        setLiked(!liked)
    }
    const get_shelter_blog_data = () => {
        fetch(`http://127.0.0.1:8000/shelter-blogs/${shelter_blog_id}/`,
            {
                method: "GET",
                headers: generateHeaders()
            }).then((res) => res.json()).then((data) => {
                setBlogInfo(data)
                setLikeCount(data.total_like_count)
                setLiked(data.current_user_liked)
                setLoading(false)
            })
    }
    useEffect(() => {
        get_shelter_blog_data()
    }, [])

    if (loading) return <LoadingPage />
    return (
        <Box sx={{ m: { xs: 5, lg: 20 } }}>
            <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <IconButton onClick={() => like_blog()}>
                        {
                            liked ?
                                <ThumbUp color="primary" /> :
                                <ThumbUpAlt />
                        }
                    </IconButton>
                    <Typography> {likeCount}</Typography>
                </Box>
                <Box sx={{ mx: 3, display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => navigate(`/shelter/${blogInfo.shelter}`)} >
                        <Avatar src={blogInfo.shelter_profile_pic_link ? blogInfo.shelter_profile_pic_link : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} />
                    </IconButton>
                    <Typography>{blogInfo.shelter_name}</Typography>
                </Box>
                <Typography variant="h3" sx={{ ml: 1 }}>{blogInfo.title}</Typography>
            </Box>
            <Paper sx={{ backgroundColor: "#f6f3f3", padding: 3 }}>
                <Box><Typography variant="body1">{blogInfo.content}</Typography></Box>
            </Paper>
        </Box>
    )
}
export default ShelterBlogPage