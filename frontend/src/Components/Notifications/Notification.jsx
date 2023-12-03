import { Close, North, NorthEast } from "@mui/icons-material"
import { IconButton, Button } from "@mui/material";

const Notification = ({ type, is_seeker, title, content, url, delete_notification }) => {
    const type_mapping_seeker = {
        1: "chat_bubble",
        2: "update",
        3: "pet_supplies"
    }
    const type_mapping_shelter = {
        1: "chat_bubble",
        2: "assignment",
        3: "reviews",
        4: "rating"
    }

    const type_to_icon = (type, is_seeker) => {
        return is_seeker ? type_mapping_seeker[type] : type_mapping_shelter[type]
    }

    return (
        <div className="notification secondary">
            <div className="notification-header d-flex justify-content-between p-2">
                <div className="notification-header-text text-center d-flex align-items-center">
                    <span className="material-symbols-outlined d-block pe-3">{type_to_icon(type, is_seeker)}</span> {title}
                </div>
                <div>
                    <IconButton href={url}>
                        <NorthEast />
                    </IconButton>
                    <IconButton onClick={() => delete_notification()}>
                        <Close />
                    </IconButton>
                </div>
            </div>
            <div className="d-flex p-3 ">
                {content}
            </div>
        </div>
    );
}

export default Notification;