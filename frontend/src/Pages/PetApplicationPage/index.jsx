import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-application.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams, Link } from "react-router-dom";

const PetApplicationPage = ({userInfo}) => {
    const [pet_info, setPetInfo] = useState({});
    const [application_info, setApplicationInfo] = useState({});
    const [seeker_info, setSeekerInfo] = useState({});
    const application_status_string = {
        1: 'Approved',
        2: 'Pending',
        3: 'Declined',
        4 :'Withdrawn'
    };
    let { petId } = useParams();

    const get_pet_info = () => {
        fetch(`http://127.0.0.1:8000/listings/${petId}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setPetInfo(data)

            get_application_info(petId)
        })
    }

    const get_application_info = (application_id) => {
        fetch(`http://127.0.0.1:8000/applications/${application_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setApplicationInfo(data)

            get_seeker_info(data.seeker_id)
        })
    }

    const get_seeker_info = (seeker_id) => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${seeker_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setSeekerInfo(data)
        })
    }

    useEffect(() => {
        get_pet_info()
    }, [])
    return (
        <div className="pet-application">
        <div id="page-container">
            <form>
                <h1>Your Application - {pet_info.name} <span className="badge bg-secondary">{application_status_string[application_info.application_status]}</span></h1>

                {/* Needs Fixing */}
                {/* <div id="profile-pic">
                    <img src="./img/Mr%20Biscuit.jpg" />
                </div> */}

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">badge</span>
                    <input type="text" 
                    placeholder="Name" 
                    value={seeker_info.name} 
                    className="form-control" 
                    readonly />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">email</span>
                    <input type="email" 
                    placeholder="Email" 
                    value={seeker_info.email}
                    className="form-control" 
                    readonly />
                </div>

                {/* <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">phone</span>
                    <input type="tel" 
                    placeholder="Phone Number" 
                    // value={userInfo?.} 
                    className="form-control" 
                    readonly />
                </div> */}

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">reorder</span>
                    <textarea placeholder="Message" 
                        readonly className="form-control"
                        rows="4"
                        value={application_info.content}
                    /> 
                </div>
                
                {userInfo.is_shelter ? (
                    <div className="submit-button">
                    <Link to={`/pet-application/${petId}`}>
                        <button type="submit" className="btn btn-green btn-primary d-flex">
                            Approve
                        </button>
                    </Link>

                    <span className="button-space"></span> 
                    
                    <Link to={`/pet-application/${petId}`}>
                        <button type="submit" className="btn btn-red btn-primary d-flex">
                            Deny
                        </button>
                    </Link>
                    </div>
                ) : (
                    <div className="submit-button">
                    <Link to={`/pet-adoption/${petId}`}>
                        <button type="submit" className="btn btn-primary d-flex">
                            Withdraw Application
                        </button>
                    </Link>
                    </div>
                )}

                <hr />

                <h1>Chat With Shelter</h1>

                <div className="chat-box">
                    <div className="messages">
                        <div className="msg-box other-msg">
                            <div className="msg-author">
                                Homes for Pets
                            </div>
                            <div className="msg-contents">
                                When would you be free to come and pick Mr Biscuit up?
                            </div>
                        </div>

                        <div className="msg-box your-msg">
                            <div className="msg-author">
                                You
                            </div>
                            <div className="msg-contents">
                                Immediately.
                            </div>
                        </div>

                        <div className="msg-box other-msg">
                            <div className="msg-author">
                                Homes for Pets
                            </div>
                            <div className="msg-contents">
                                We're closed today, but would you like to come in tomorrow?
                            </div>
                        </div>

                        <div className="msg-box your-msg">
                            <div className="msg-author">
                                You
                            </div>
                            <div className="msg-contents">
                                Affirmative.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat-input">
                    <form>
                        <label for="send-message" className="form-label">Send a message...</label>
                        <div className="input-box">
                            <div className="form-group mb-3">
                                <input name="email" type="text" id="send-message" required="required" className="form-control"
                                    value="" autocomplete="off" />
                            </div>
                        </div>
                        <a type="submit" className="btn btn-primary">Send message</a>
                    </form>
                </div>
            </form>
        </div>
        </div>
    )
}
export default PetApplicationPage;