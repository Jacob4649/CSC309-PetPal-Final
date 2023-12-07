/**
 * Component props that contain methods for setting and retrieving user info
 */
export type UserInfoProps = {

    /**
     * Sets the user info
     */
    setUserInfo: (userInfo: any) => void;

    /**
     * Gets the user info
     */
    userInfo: any;
};