import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-detail.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams, Link } from "react-router-dom";

const PetDetailPage = () => {
    const [pet_info, setPetInfo] = useState({});
    const [shelter_info, setShelterInfo] = useState({});
    const application_status_string = {
        1: 'Adopted',
        2: 'Canceled',
        3: 'Open',
    };
    let { petId } = useParams();

    const get_pet_info = () => {
        fetch(`http://127.0.0.1:8000/listings/${petId}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setPetInfo(data)

            get_shelter_info(data.shelter)
        })
    }

    // ** Disappears for some reason maybe fixed now
    const get_shelter_info = (shelter_id) => {
        fetch(`http://127.0.0.1:8000/accounts/shelters/${shelter_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setShelterInfo(data)
        })
    }

    // const navigate = useNavigate()

    // Status mapping
    const status = application_status_string[pet_info.listing_status] || 'Unknown';

    // Date formatting
    const created_time = new Date(pet_info.creation_time);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatted_time = created_time.toLocaleString('en-US', options);

    // Shelter name
    const shelter_name = 

    useEffect(() => {
        get_pet_info()
    }, [])
    return (
        <div className="pet-detail">
        <div id="page-container">
            <div className="info-container">

                {/* <!-- used https://www.bootdey.com/snippets/view/profile-with-data-and-skills as a reference --> */}
                <div className="col-md-8">
                    <div className="card mb-3">
                        <h2>{pet_info.name}</h2>

                        <div className="pet-intro">
                            <div id="profile-pic">
                                <img src="./img/Mr%20Biscuit.jpg" />
                            </div>
                        </div>

                        <div className="card-body">
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">pets</span>
                                    <p className="mb-0">Pet Name</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {pet_info.name}
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">sound_detection_dog_barking</span>
                                    <p className="mb-0">Species</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {pet_info.species}
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">pet_supplies</span>
                                    <p className="mb-0">Breed</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                {pet_info.breed}
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">house</span>
                                    <p className="mb-0">Shelter</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <Link to={`/shelter/${pet_info?.shelter}`}>{shelter_info.name}</Link>
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">straighten</span>
                                    <p className="mb-0">Measurements</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Height: {pet_info.height_feet} feet, Weight {pet_info.weight_lbs} lbs
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">cake</span>
                                    <p className="mb-0">Age</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {pet_info.age_months} months
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">check</span>
                                    <p className="mb-0">Status</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {status}
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">calendar_month</span>
                                    <p className="mb-0">Listing Date</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {formatted_time}
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <span className="material-symbols-outlined">view_headline</span>
                                    <p className="mb-0">Description (Medical History, Behavior, Special Needs, etc.)</p>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {pet_info.description}
                                </div>
                            </div>

                            <hr />
                            <div className="submit-button">
                                <Link to={`/pet-adoption/${petId}`}>
                                    <button type="submit" className="btn btn-primary d-flex">
                                    Adopt Me
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    Copyright PetPal, 2023
                </footer>
            </div>
        </div>
        </div>
    ) 
}
export default PetDetailPage;