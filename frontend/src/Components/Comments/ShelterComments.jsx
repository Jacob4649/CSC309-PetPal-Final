import { useParams } from "react-router-dom"
import "./comments.css"
import Comment from "./Comment";
import Chatbox from "../Messaging/Chatbox";
import generateHeaders from "../../utils/fetchTokenSet";
import { useEffect, useState } from "react";
import { Link, Box } from "@mui/material";
import ShelterCommentContainer from "./CommentContainer";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";

const ShelterComments = ({ shelter_id }) => {
    const [shelterComments, setShelterComments] = useState(null);
    const [message, setMessage] = useState(null)
    const [replyId, setReplyId] = useState(null)
    const [loading, setLoading] = useState(true)


    const get_shelter_comments = () => {
        fetch(`http://127.0.0.1:8000/shelter/${shelter_id}/shelter_comments/`, {
            method: "GET",
            headers: generateHeaders()
        }).then(res => res.json()).then((data) => {
            // console.log(data)
            setShelterComments(data)
            setLoading(false)
        })
    }

    const add_new_shelter_comments_page = () => {
        fetch(shelterComments.next, {
            method: "GET",
            headers: generateHeaders()
        }).then(res => res.json()).then((data) => {
            // console.log(shelterComments.results)
            // console.log(data.results)
            setShelterComments({
                results: [...shelterComments.results, ...data.results],
                next: data.next,
            })
        }
        )
    }

    const add_new_shelter_comment_reply_page = (id) => {
        const rootCommentIndex = shelterComments.results.findIndex((el) => el.id === id)
        let rootComment = shelterComments.results[rootCommentIndex]
        // console.log(rootComment)

        fetch(rootComment.reply_link, {
            method: "GET",
            headers: generateHeaders()
        }).then(res => res.json()).then((data) => {
            let newRootComment = {
                ...rootComment,
                reply_link: data.next,
                replies: rootComment.replies ? [...rootComment.replies, ...data.results] : [...data.results]
            }
            // console.log(newRootComment)
            setShelterComments({
                ...shelterComments,
                results: [...shelterComments.results.slice(0, rootCommentIndex), newRootComment, ...shelterComments.results.slice(rootCommentIndex + 1)]
            })
        })
    }

    const add_new_shelter_comment = () => {
        setMessage("")
        if (replyId !== null) {
            const rootCommentIndex = shelterComments.results.findIndex((el) => el.id === replyId)
            let rootComment = shelterComments.results[rootCommentIndex]

            fetch(`http://127.0.0.1:8000/shelter/${shelter_id}/shelter_comments/`, {
                method: "POST",
                headers: generateHeaders(),
                body: JSON.stringify({ message, replying_to_id: replyId })
            }).then(res => res.json()).then((data) => {
                let newRootComment = {
                    ...rootComment,
                    replies: rootComment.replies ? [data, ...rootComment.replies] : [data]
                }
                const newShelterComments = {
                    ...shelterComments,
                    results: [...shelterComments.results.slice(0, rootCommentIndex), newRootComment, ...shelterComments.results.slice(rootCommentIndex + 1)]
                }
                console.log(newShelterComments)
                setShelterComments(newShelterComments)
            })
        } else {
            fetch(`http://127.0.0.1:8000/shelter/${shelter_id}/shelter_comments/`, {
                method: "POST",
                headers: generateHeaders(),
                body: JSON.stringify({ message })
            }).then(res => res.json()).then((data) => {
                setShelterComments({
                    ...shelterComments,
                    results: [data, ...shelterComments.results]
                })
            })
        }
    }
    const select_reply_handler = (id) => {
        setReplyId(id)
    }

    useEffect(() => {
        get_shelter_comments()
    }, [])
    useEffect(() => {
        console.log(shelterComments)
    }, [shelterComments])


    if (loading) return <LoadingPage />
    return (
        <Box className="comments-page" >
            <h2 className="text-center mb-4">Comments</h2>
            <div className="comment-container p-3">
                <Chatbox onClick={add_new_shelter_comment}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="standard"
                    replyingClear={() => setReplyId(null)}
                    replying={replyId !== null}
                />
                <Box mt={3}>
                    {shelterComments.results.map((rootComment) => {
                        return <ShelterCommentContainer
                            key={rootComment.id}
                            comment={rootComment}
                            add_new_shelter_comment_reply_page={add_new_shelter_comment_reply_page}
                            replyHandler={select_reply_handler}
                            replyCommentId={replyId}
                        />
                    })}
                </Box>
                {shelterComments.next ? <Link component={"button"} onClick={() => add_new_shelter_comments_page()}>More Results</Link> : <></>}
            </div>

        </Box>
    )

}

export default ShelterComments