import { Link, Box, Button } from "@mui/material"
import "./comments.css"

const Comment = ({ is_current_shelter, commenter_name, commenter_pfp, content, replyHandler, is_reply }) => {

    return (
        <div className="comments-page">
            <Box className="comment d-flex"
                sx={{ pl: is_reply ? 0 : 2 }}>
                <div>
                    <div className="commenter-img-container">
                        <img className="commenter-img" src={commenter_pfp ? commenter_pfp : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} alt="" />
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="comment-username">{commenter_name}
                        {is_current_shelter ? <span className="purple">Shelter</span> : <></>}
                    </div>
                    <div className="comment-body">
                        {content}
                    </div>
                    <div>
                        <Button onClick={replyHandler} ><Link underline="none">abc</Link></Button>
                    </div>
                </div>
            </Box>
        </div>
    )

}
export default Comment;