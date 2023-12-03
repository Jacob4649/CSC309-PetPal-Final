import { useState, useEffect } from "react"
import Notification from "./Notification"
import "./notifications.css"
import { CircularProgress, Pagination } from "@mui/material"
import generateHeaders from "../../utils/fetchTokenSet"
const NotificationPage = () => {
    const [notificationData, setNotificationData] = useState();
    const [loading, setLoading] = useState(true);
    const [totalNotifs, setTotalNotifs] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const getNotificationData = (page) => {

        fetch(`http://127.0.0.1:8000/notifications/?page=${page}&read=False`, {
            method: "GET",
            headers: generateHeaders()
        }).then(res => res.json()).then((data) => {
            console.log(data)
            setNotificationData(data.results)
            setTotalNotifs(data.count)
            setLoading(false)
        })
    }
    useEffect(() => {
        getNotificationData(currPage)
    }, [])
    const delete_notification = (id, setNotificationData) => {
        // setNotificationData((prevNotificationData) => prevNotificationData.filter((notification) => notification.id !== id))
        fetch(`http://127.0.0.1:8000/notifications/${id}/`, {
            method: "PATCH",
            headers: generateHeaders()
        }).then(() => {
            let new_curr_page = currPage
            if (notificationData.length == 1 && currPage != 0) {
                setCurrPage(currPage - 1)
                new_curr_page -= 1
            }
            getNotificationData(new_curr_page)
        })
    }

    if (loading) { return <CircularProgress /> }
    return (
        <div className="container-fluid d-flex flex-column align-items-center content-wrap">
            <h1 id="notifications-heading" className="text-center">
                Notifications
            </h1>
            {totalNotifs === 0 && <div>No more notifications</div>}
            {totalNotifs !== 0 && <>
                <div className="notifications d-flex flex-column align-items-center gap-3">
                    {notificationData.map((notification) =>
                        <Notification
                            type={notification.type}
                            is_seeker={notification["pet_seeker"] !== null}
                            title={notification.title}
                            content={notification.content}
                            url={notification.url}
                            delete_notification={() => delete_notification(notification.id, setNotificationData)}
                            key={notification.id}
                        />
                    )}
                </div>
                <Pagination
                    count={Math.ceil(totalNotifs / 3)}
                    page={currPage}
                    onChange={(e, page) => {
                        setCurrPage(page)
                        getNotificationData(page)
                    }} />
            </>}
        </div>

    )
}

export default NotificationPage;