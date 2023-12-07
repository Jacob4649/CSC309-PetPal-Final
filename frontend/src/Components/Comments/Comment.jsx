import { Link, Box, Button, Container } from "@mui/material"

const Comment = ({ is_current_shelter, commenter_name, commenter_pfp, content, replyHandler, is_reply, selected_comment = false, id }) => {

    return (
        <Box className="comment d-flex"
            sx={{
                ml: !is_reply ? 0 : 5,
                // backgroundColor: selected_comment ? "black" : "blue"
                border: selected_comment ? "solid" : null,
                borderWidth: selected_comment ? 0.5 : null
            }}>
            <div>
                <div className="commenter-img-container">
                    <img className="commenter-img" src={commenter_pfp ? commenter_pfp : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} alt="" />
                </div>
            </div>
            <div className="d-flex flex-column">
                <div className="comment-username">{commenter_name}
                    {is_current_shelter ? <span className="purple ms-2">(Shelter)</span> : <></>}
                </div>
                <div className="comment-body">
                    {content}
                </div>
                <Box sx={{ mb: 2, p: 0 }}>
                    {!is_reply ? <Link component={"button"} onClick={() => replyHandler()} underline="none">reply</Link> : <></>}
                </Box>
            </div>
        </Box>
    )

}
export default Comment;