import { useState, useEffect } from "react"
import Notification from "../../Components/Notifications/Notification"
import "./notifications.css"
import { BottomNavigation, BottomNavigationAction, Box, Pagination } from "@mui/material"
import generateHeaders from "../../utils/fetchTokenSet"
import LoadingPage from "../LoadingPage/LoadingPage"
import { Beenhere, Delete, NewReleases } from "@mui/icons-material"
const NotificationPage = () => {
    const [notificationData, setNotificationData] = useState();
    const [loading, setLoading] = useState(true);
    const [totalNotifs, setTotalNotifs] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [readNotis, setReadNotis] = useState(false)
    const getNotificationData = (page, read = false) => {
        console.log("page")
        console.log(page)
        read = read ? "True" : "False"
        fetch(`http://127.0.0.1:8000/notifications/?page=${page}&read=${read}`, {
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
        setCurrPage(1)
        getNotificationData(1, readNotis)
    }, [readNotis])
    const read_notification = (id, setNotificationData) => {
        // setNotificationData((prevNotificationData) => prevNotificationData.filter((notification) => notification.id !== id))
        fetch(`http://127.0.0.1:8000/notifications/${id}/`, {
            method: "PATCH",
            headers: generateHeaders()
        }).then(() => {
            let new_curr_page = currPage
            if (notificationData.length == 1 && totalNotifs !== 1) {
                setCurrPage(currPage - 1)
                new_curr_page -= 1
            }
            getNotificationData(new_curr_page, readNotis)
        })
    }
    const delete_notification = (id) => {
        fetch(`http://127.0.0.1:8000/notifications/${id}/`, {
            method: "DELETE",
            headers: generateHeaders()
        }).then(() => {
            let new_curr_page = currPage
            if (notificationData.length == 1 && totalNotifs !== 1) {
                setCurrPage(currPage - 1)
                new_curr_page -= 1
            }
            getNotificationData(new_curr_page, readNotis)
        })
    }

    if (loading) { return <LoadingPage /> }
    return (
        <Box className="container-fluid d-flex flex-column align-items-center content-wrap notifications-page"
        >
            <h1 id="notifications-heading" className="text-center">
                Notifications
            </h1>
            <Box sx={{ height: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                                delete_notification={!readNotis ? () => read_notification(notification.id, setNotificationData) : () => delete_notification(notification.id)}
                                delete_noti={readNotis}
                                key={notification.id}
                            />
                        )}
                    </div>
                </>}
            </Box>
            <Pagination
                count={Math.ceil(totalNotifs / 3)}
                page={currPage}
                onChange={(e, page) => {
                    setCurrPage(page)
                    getNotificationData(page, readNotis)
                }} />
            <BottomNavigation
                showLabels
                value={readNotis === false ? 0 : 1}
                onChange={(event, newValue) => {
                    if (newValue === 0) {
                        setReadNotis(false)
                    } else {
                        setReadNotis(true)
                    }
                }}
                sx={{ backgroundColor: "#eeeeee" }}
            >
                <BottomNavigationAction label="Unread" icon={<NewReleases />} />
                <BottomNavigationAction label="Read" icon={<Beenhere />} />
            </BottomNavigation>
        </Box>

    )
}

export default NotificationPage;