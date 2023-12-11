import React, { useState } from "react";
import { useEffect } from "react";
import { getAllListings } from "../../gateway/listings";
import './shelter-management.css';
import { Link } from "react-router-dom";

const Pet = ({id, name, species, description}) => {
    return <div className="pet">
        <div className="pet-image-container">
            <div className="pet-image">
                <img src="./assets/logo-dark.svg" />
            </div>
        </div>
        <div className="pet-name">
            {name}
        </div>
        <div className="pet-species">
            {species}
        </div>
        <div className="pet-description">
            {description}
            <div className="pet-controls">
                <Link className="material-symbols-outlined" title="Edit" to={`/update-listing/${id}/`}>
                    edit
                </Link>
                <a className="material-symbols-outlined" title="Delete">
                    delete
                </a>
            </div>
        </div>
    </div>;
}

export const ShelterManagement = ({userInfo}) => {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        getAllListings().then(x => {
            setListings(x);
        });
    }, []);

    return <div id="page-container" className="shelter-management">
        <h2>Shelter Pets</h2>
        <div id="pet-table">
            <div id="header">
                <h5>
                    Profile
                </h5>
                <h5 className="sortable sorted">
                    Name
                    <span className="material-symbols-outlined">arrow_drop_down</span>
                </h5>
                <h5 className="sortable">
                    Species
                    <span className="material-symbols-outlined">arrow_drop_up</span>
                </h5>
                <h5>
                    Description
                </h5>
            </div>
            {
                listings.map(({id, name, species, description}, i) => <Pet key={i} id={id} name={name} species={species} description={description}></Pet>)
            }
        </div>
        <div id="page-controls">
            <Link className="material-symbols-outlined" title="New Pet" to="/create-listing/">
                add
            </Link>
            <Link className="material-symbols-outlined" title="Done" to={`/shelter/${userInfo.id}`}>
                check
            </Link>
        </div>
    </div>;
}