import { useParams } from "react-router-dom"
import "comments.css"
import Comment from "./Comment";
import Chatbox from "../Messaging/Chatbox";

const ShelterComments = ({ comment_data }) => {
    const { shelter_id } = useParams();


    return (
        <div className="comments-page">
            <h2 class="text-center mb-4">Comments</h2>
            <div class="comment-container p-3">
                {comment_data.map((comment) => { <Comment /> })}
                <Chatbox />
            </div>

        </div>
    )

}