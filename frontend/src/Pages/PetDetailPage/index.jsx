import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-detail.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';


const PetDetailPage = ({ userInfo }) => {
    const [pet_info, setPetInfo] = useState({});
    const [shelter_info, setShelterInfo] = useState({});
    const [application_info, setApplicationInfo] = useState({});
    const application_status_string = {
        1: 'Adopted',
        2: 'Canceled',
        3: 'Open',
    };
    let { petId } = useParams();
    let months = null
    let years = null

    const get_pet_info = () => {
        fetch(`http://127.0.0.1:8000/listings/${petId}`, {
            method: "get",
            headers: generateHeaders()
        }).then(async (res) => {
            const data = await res.json()
            if (!(res.status >= 200 && res.status < 300)) {
                navigate("/404")
            }
            else {
                years = Math.floor(data.age_months / 12)
                months = data.age_months % 12
                console.log(data)
                setPetInfo(data)

                get_shelter_info(data.shelter)
                get_application_info(petId)
            }
        })
    };

    // Disappears for some reason maybe fixed now
    const get_shelter_info = (shelter_id) => {
        fetch(`http://127.0.0.1:8000/accounts/shelters/${shelter_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then(async (res) => {
            const data = await res.json()
            if (!(res.status >= 200 && res.status < 300)) {
                navigate("/404")
            }
            else {
                console.log(data)
                setShelterInfo(data)
            }
        })
    };

    // const get_application_info = async (application_id) => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/applications/${application_id}`, {
    //             method: "get",
    //             headers: generateHeaders()
    //         });

    //         if (response.status === 404) {
    //             console.log("help");
    //             setApplicationInfo(null);
    //         } else {
    //             const data = await response.json();
    //             console.log(data);
    //             setApplicationInfo(data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching application info:", error);
    //     }
    // };
    const get_application_info = async (petId) => {
        try {
            // Get the list of all applications
            const all_applications = await fetch(`http://127.0.0.1:8000/applications`, {
                method: "get",
                headers: generateHeaders()
            });
            if (all_applications.status !== 200) {
                console.error("Error fetching applications:", all_applications.status);
                return;
            }
            // make json
            const applications_data = await all_applications.json();
            // console.log('applications_data:', applications_data);

            // correct format
            if (applications_data && Array.isArray(applications_data.results)) {
                let i = 0;
                let needed_application = null;

                // go through all apps to find needed one
                while (i < applications_data.results.length && !needed_application) {
                    const application = applications_data.results[i];
                    if (application.listing === Number(petId)) {
                        needed_application = application;
                        console.log("Application found :", application.listing);
                    }
                    i++;
                }
                if (needed_application) {
                    setApplicationInfo(needed_application);
                }
                else {
                    // setApplicationInfo(null);
                    console.log("Application not found for listing ID:", petId);
                }
            }
            else {
                console.error("Invalid data structure. Expected an object with 'results' array.");
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const navigate = useNavigate()
    const handle_go_back = () => {
        navigate('/my-applications');
    }

    // Status mapping
    const status = application_status_string[pet_info.listing_status] || 'Unknown';

    // Date formatting
    const created_time = new Date(pet_info.creation_time);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatted_time = created_time.toLocaleString('en-US', options);

    // Shelter name
    // const shelter_name = pet_info.shelter.name;

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

                            {/* if no pet pfp */}
                            {/* <div className="pet-intro">
                            <div id="profile-pic">
                                <img src="./img/Mr%20Biscuit.jpg" />
                            </div>
                        </div> */}

                            <div className="card-body">
                                <h2>{pet_info.name}</h2>
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
                                        Height: {pet_info.height_feet} in, Weight {pet_info.weight_lbs} lbs
                                    </div>
                                </div>

                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <span className="material-symbols-outlined">cake</span>
                                        <p className="mb-0">Age</p>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {Math.floor(pet_info.age_months / 12)} years, {pet_info.age_months % 12} months
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
                                {userInfo.is_shelter ? (
                                    <div className="submit-button">
                                        <button type="submit" className="btn btn-primary d-flex" onClick={() => handle_go_back()}>
                                            Go to Applications
                                        </button>
                                    </div>
                                ) : (
                                    <div className="submit-button">
                                        {application_info.id ? (
                                            <Link to={`/pet-application/${application_info.id}`}>
                                                <button type="submit" className="btn btn-primary d-flex">
                                                    Go to Application
                                                </button>
                                            </Link>
                                        ) : (
                                            <Link to={`/pet-adoption/${petId}`}>
                                                <button type="submit" className="btn btn-primary d-flex">
                                                    Adopt Me
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PetDetailPage;
