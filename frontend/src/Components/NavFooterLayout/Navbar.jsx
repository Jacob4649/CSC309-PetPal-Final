import React from "react";
import { Link, useLocation } from "react-router-dom";

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
            <img src="../../img/logo-light.svg"></img>
            <span>PetPal</span>
        </Link>
        <div className="pages">
            <Link className="material-symbols-outlined" to="/home" title="Home">home</Link>
            <Link className="material-symbols-outlined" to="/search" title="Search">search</Link>
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