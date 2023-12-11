import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { getProfilePicURL } from "../../gateway/profilePic";

export const NavBar = ({userInfo, setUserInfo}) => {
    const location = useLocation();
    const split = location.pathname
        .split('/')
        .filter(x => x.length > 0)
        .map(x => 
            [x, x.split('-')
            .map(y => 
                y.charAt(0)
                .toUpperCase() + 
                y.substring(1)
                .toLowerCase())
            .join(' ')]);
    let total = '';
    for (let i = 0; i < split.length; i++) {
        total += `${split[i][0]}/`
        split[i][0] = total;
    }

    return <header className="nav-bar-div">
        <Link className="logo" to="/">
            <img src="assets/logo-light.svg"></img>
            <span>PetPal</span>
        </Link>
        <div className="pages">
            <Link className="material-symbols-outlined" to="/home" title="Home">home</Link>
            <Link className="material-symbols-outlined" to="/search" title="Search">search</Link>
            <Link className="material-symbols-outlined" to="/shelter-blogs" title="Shelter Blogs">description</Link>
            {
                userInfo?.is_shelter &&
                <Link className="material-symbols-outlined" to="/manage-shelter" title="Shelter Management">list</Link>
            }
            {
                userInfo && (
                    userInfo.is_shelter ? 
                    <Link className="material-symbols-outlined" to="/seeker-detail" title="Profile">person</Link> :
                    <Link className="material-symbols-outlined" to={`/shelter/${userInfo.id}`} title="Profile">person</Link>
                )
            }
        </div>
        <div className="navigation">
            {
                split.map((x, i) => <Link key={i} to={x[0]}>{x[1]}</Link>)
            }
        </div>
        <div className="account">
            <Link className="material-symbols-outlined" to="/notifications">
                notifications_active
            </Link>
            <details>
                <summary className="user-icon material-symbols-outlined"></summary>
                <div className="account-menu">
                    <div>
                        {userInfo?.name ?? ''}
                    </div>
                    <a href="./my-applications" className="d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                        My Applications
                    </a>
                    {userInfo?.is_shelter ? (
                            <Link to={`/shelter/${userInfo.id}`} className="d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                                View Profile
                            </Link>
                        ) : (
                        <Link to={"/seeker-detail"} className="d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                            View Profile
                        </Link>
                    )}
                    {userInfo?.is_shelter ? (
                        <a href="./update-shelter" className="text-decoration-none d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            face
                        </span>
                            Update Profile
                        </a>
                    ) : (
                        <a href="./update-seeker" className="text-decoration-none d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            face
                        </span>
                            Update Profile
                        </a>
                    )}
                    <a href="./landing-page" className="remove-a-styling d-block" onClick={() => {
                        setUserInfo(null);
                    }}>
                        <span className="material-symbols-outlined">
                            lock_open
                        </span>
                        Log Out
                    </a>
                </div>
            </details>
        </div>
    </header>;
};