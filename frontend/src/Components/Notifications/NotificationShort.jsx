import { Link } from "react-router-dom";
import { type_mapping_seeker, type_mapping_shelter } from "./static";

/**
 * Simplified notification component
 * @param props props to use 
 */
export const NotificationShort = ({ notification, userInfo }) => {
    console.log(notification)
    console.log(userInfo)
    return <div className="notification secondary">
    <div className="notification-header d-flex justify-content-between p-2">
        <Link className="notification-header-text text-center d-flex align-items-center"
            to="/notifications">
            <span className="material-symbols-outlined d-block pe-3">{getSymbol(notification, userInfo)}</span> {notification.title}
        </Link>
    </div>
    <Link className="notification-body p-3" to="/notifications">
        {notification.content}
    </Link>
</div>
};

/**
 * Gets the symbol to display
 */
const getSymbol = (notification, userInfo) => {
    return userInfo.is_shelter ? type_mapping_shelter[notification.type] : type_mapping_seeker[notification.type];
}