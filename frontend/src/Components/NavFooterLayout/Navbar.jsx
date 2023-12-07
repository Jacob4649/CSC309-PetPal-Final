import React from "react";
import { Link } from "react-router-dom";
import '../../assets/logo-light.svg';

export const NavBar = (props) => {
    return <header className="nav-bar-div">
        <Link className="logo" to="/">
            <img src="../../assets/logo-light.svg"></img>
            <span>PetPal</span>
        </Link>
        <div className="pages">
            <a className="material-symbols-outlined" href="./home-user.html" title="Home">home</a>
            <a className="material-symbols-outlined" href="./search-client.html" title="Search">search</a>
        </div>
        <div className="navigation">
            <a>
                Home
            </a>
        </div>
        <div className="account">
            <a className="material-symbols-outlined" href="./notifications-client.html">
                notifications_active
            </a>
            <details>
                <summary className="user-icon material-symbols-outlined"></summary>
                <div className="account-menu">
                    <div>
                        <div className="profile-pic">
                            <img src="./img/pet_denier_pfp.png"></img>
                        </div>
                        Pet-Denier-123
                    </div>
                    <a href="./my-applications-client.html" className="d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                        My Applications
                    </a>
                    <a href="./account-update-page-client.html" className="text-decoration-none d-block remove-a-styling">
                        <span className="material-symbols-outlined">
                            face
                        </span>
                        Update Profile
                    </a>
                    <a href="./landing-page.html" className="remove-a-styling d-block">
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