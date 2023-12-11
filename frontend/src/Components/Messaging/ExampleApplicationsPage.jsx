import { useEffect, useState } from "react"
import ApplicationMessages from "./ApplicationMessages"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import generateHeaders from "../../utils/fetchTokenSet"
import LoadingPage from "../../Pages/LoadingPage/LoadingPage"
import { BACKEND_ENDPOINT } from "../../gateway/static"


const ExampleApplicationsPage = ({ userInfo }) => {
    const [loading, setLoading] = useState(true)
    const [messageData, setMessageData] = useState(null)
    const { applicationId } = useParams()
    const [nextPage, setNextPage] = useState(`${BACKEND_ENDPOINT}/applications/${applicationId}/application_messages/`)

    useEffect(() => {
        get_application_message_data()
    }, [])

    // gets application data on next page and updates messageData, nextPage accordingly
    const get_application_message_data = () => {
        fetch(nextPage, {
            method: "GET",
            headers: generateHeaders()
        }).then((res) => res.json()).then(
            (data) => {
                setNextPage(data.next)
                console.log(data)
                setMessageData([...messageData, ...data.results])
                setLoading(false)
            }
        )
    }

    const reset_application_message_data = () => {
        fetch(`${BACKEND_ENDPOINT}/applications/${applicationId}/application_messages/`, {
            method: "GET",
            headers: generateHeaders()
        }).then((res) => res.json()).then(
            (data) => {
                setNextPage(data.next)
                setMessageData([...data.results])
            }
        )
    }

    const add_application_message = (message) => {
        fetch(`${BACKEND_ENDPOINT}/applications/${applicationId}/application_messages/`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify({
                content: message
            })
        }).then(
            () => {
                setMessageData([])
                setNextPage(`${BACKEND_ENDPOINT}/applications/${applicationId}/application_messages/`)
            }
        ).then(() => { reset_application_message_data() })

    }
    if (loading) return <LoadingPage />
    return (
        <Box>
            <ApplicationMessages messageData={messageData} is_seeker={!userInfo.is_shelter} load_more={() => get_application_message_data()} can_load_more={nextPage} send_message={(message) => add_application_message(message)} />
        </Box>
    )
}

export default ExampleApplicationsPage