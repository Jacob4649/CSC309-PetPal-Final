import { Link, Box, Button, Container } from "@mui/material"
import Comment from "./Comment"


const ShelterCommentContainer = ({
    comment,
    add_new_shelter_comment_reply_page,
    replyHandler,
    replyCommentId }) => {
    return (
        <Box>
            <Comment
                key={comment.id}
                is_current_shelter={comment.is_shelter}
                commenter_name={comment.username}
                commenter_pfp={comment.profile_pic_link}
                content={comment.message}
                replyHandler={() => replyHandler(comment.id)}
                selected_comment={replyCommentId === comment.id}
                is_reply={comment.replying_to_id} />
            {comment.replies ? comment.replies.map((commentReply) => {
                return <Comment
                    key={commentReply.id}
                    is_current_shelter={commentReply.is_shelter}
                    commenter_name={commentReply.username}
                    commenter_pfp={commentReply.profile_pic_link}
                    content={commentReply.message}
                    replyHandler={() => { }}
                    is_reply={true} />
            }) : <></>}
            {comment.reply_link ? <Link component={"button"} onClick={() => add_new_shelter_comment_reply_page(comment.id)} sx={{ ml: 5 }}>More Replies</Link> : <></>}
        </Box>
    )
}
export default ShelterCommentContainer