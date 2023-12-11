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
            <img src="/assets/logo-light.svg"></img>
            <span>PetPal</span>
        </Link>
    </header>;
};