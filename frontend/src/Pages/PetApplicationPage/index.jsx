import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-application.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage"
import ApplicationMessages from "../../Components/Messaging/ApplicationMessages";
import { Box } from "@mui/material";

const PetApplicationPage = ({ userInfo }) => {
    let { applicationId } = useParams();
    const [pet_info, setPetInfo] = useState({});
    const [application_info, setApplicationInfo] = useState({});
    const [seeker_info, setSeekerInfo] = useState({});
    const [status_info, setStatusInfo] = useState({});
    const [messageData, setMessageData] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`)

    // gets application data on next page and updates messageData, nextPage accordingly
    const get_application_message_data = () => {
        fetch(nextPage, {
            method: "GET",
            headers: generateHeaders()
        }).then((res) => res.json()).then(
            (data) => {
                setNextPage(data.next)
                console.log(data)
                setMessageData([...messageData, ...data.results])
                setLoading(false)
            }
        )
    }

    const reset_application_message_data = () => {
        fetch(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`, {
            method: "GET",
            headers: generateHeaders()
        }).then((res) => res.json()).then(
            (data) => {
                setNextPage(data.next)
                setMessageData([...data.results])
            }
        )
    }

    const add_application_message = (message) => {
        fetch(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify({
                content: message
            })
        }).then(
            () => {
                setMessageData([])
                setNextPage(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`)
            }
        ).then(() => { reset_application_message_data() })

    }
    // const [loading, setLoading] = useState(true);
    // const [messageData, setMessageData] = useState([]);
    const application_status_string = {
        1: 'Approved',
        2: 'Pending',
        3: 'Declined',
        4: 'Withdrawn'
    };
    let navigate = useNavigate();
    // const [nextPage, setNextPage] = useState(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`)

    const get_application_info = () => {
        // try {
        //     const response = fetch(`http://127.0.0.1:8000/applications/${applicationId}`, {
        //         method: "get",
        //         headers: generateHeaders()
        //     });

        //     if (response.status === 404) {
        //         setApplicationInfo(null);
        //     } else {
        //         const data = response.json();
        //         console.log(data);
        //         setApplicationInfo(data);

        //         get_pet_info(data.listing)
        //         get_seeker_info(data.seeker_id)
        //     }
        // } catch (error) {
        //     console.error("Error fetching application info:", error);
        // }
        //   -----
        fetch(`http://127.0.0.1:8000/applications/${applicationId}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setApplicationInfo(data)

            get_pet_info(data.listing)
            get_seeker_info(data.seeker_id)
        })
        // -----  
    }

    const get_pet_info = async (pet_id) => {
        fetch(`http://127.0.0.1:8000/listings/${pet_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setPetInfo(data)
        })
    }

    const pet_name = pet_info.name;

    const get_seeker_info = async (seeker_id) => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${seeker_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setSeekerInfo(data)
        })
    }

    // const reset_application_message_data = () => {
    //     fetch(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`, {
    //         method: "GET",
    //         headers: generateHeaders()
    //     }).then((res) => res.json()).then(
    //         (data) => {
    //             setNextPage(data.next)
    //             setMessageData([...data.results])
    //         }
    //     )
    // }

    // const add_application_message = (message) => {
    //     fetch(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`, {
    //         method: "POST",
    //         headers: generateHeaders(),
    //         body: JSON.stringify({
    //             content: message
    //         })
    //     }).then(
    //         () => {
    //             setMessageData([])
    //             setNextPage(`http://127.0.0.1:8000/applications/${applicationId}/application_messages/`)
    //         }
    //     ).then(() => { reset_application_message_data() })
    // }

    const handle_status_change_withdraw = async (application_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/${application_id}/`, {
                method: 'PUT',
                headers: generateHeaders(),
                body: JSON.stringify({
                    application_status: 4
                }),
            });
            if (!response.ok) {
                throw new Error('NOT OK');
            }
            const data = response.json();
            setStatusInfo(data);

        }
        catch (error) {
            console.error('Error making PUT request:', error);
        }
    };

    const handle_status_change_accept = async (application_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/${application_id}/`, {
                method: 'PUT',
                headers: generateHeaders(),
                body: JSON.stringify({
                    application_status: 1
                }),
            });
            if (!response.ok) {
                throw new Error('NOT OK');
            }
            const data = response.json();
            setStatusInfo(data);

        }
        catch (error) {
            console.error('Error making PUT request:', error);
        }
    };

    const handle_status_change_deny = async (application_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/${application_id}/`, {
                method: 'PUT',
                headers: generateHeaders(),
                body: JSON.stringify({
                    application_status: 3
                }),
            });
            if (!response.ok) {
                throw new Error('NOT OK');
            }
            const data = response.json();
            setStatusInfo(data);

        }
        catch (error) {
            console.error('Error making PUT request:', error);
        }
    };

    const handle_go_back = () => {
        navigate('/my-applications');
    }

    useEffect(() => {
        get_application_info()
        get_application_message_data()
    }, [])
    // if (loading) return <LoadingPage />
    if (messageData && !loading) {
        return (
            // {application_info ? ( if application doesn't exist don't render or smth
            <div className="pet-application">
                <div id="page-container">
                    <form>
                        <h1>Application - {pet_name} <span className="badge bg-secondary">{application_status_string[application_info?.application_status]}</span></h1>

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
                                readOnly />
                        </div>

                        <div className="input-group">
                            <span className="input-group-text material-symbols-outlined">email</span>
                            <input type="email"
                                placeholder="Email"
                                value={seeker_info.email}
                                className="form-control"
                                readOnly />
                        </div>

                        {/* <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">phone</span>
                    <input type="tel" 
                    placeholder="Phone Number" 
                    // value={userInfo?.} 
                    className="form-control" 
                    readOnly />
                </div> */}

                        <div className="input-group">
                            <span className="input-group-text material-symbols-outlined">reorder</span>
                            <textarea placeholder="Message"
                                readOnly className="form-control"
                                rows="4"
                                value={application_info?.application_status === 4 ? "Applicant has withdrawn application" : application_info?.content}
                            />
                        </div>

                        {userInfo.is_shelter ? (
                            application_info?.application_status !== 4 ? (
                                <div className="submit-button">
                                    <button type="submit" className="btn btn-green btn-primary d-flex" onClick={() => handle_status_change_accept(application_info?.id)}>
                                        Approve
                                    </button>

                                    <button type="submit" className="btn btn-red btn-primary d-flex" onClick={() => handle_status_change_deny(application_info?.id)}>
                                        Deny
                                    </button>
                                </div>
                            ) : (
                                <button type="submit" className="btn btn-red btn-primary d-flex" onClick={() => handle_go_back()}>
                                    Go back
                                </button>
                            )
                        ) : (
                            <div className="submit-button">
                                {application_info?.application_status !== 4 ? (
                                    <button type="submit" className="btn btn-primary d-flex" onClick={() => handle_status_change_withdraw(application_info?.id)}>
                                        Withdraw Application
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary d-flex" onClick={() => handle_status_change_withdraw(application_info?.id)} disabled>
                                        Withdraw Application
                                    </button>
                                )}
                            </div>
                        )}

                        <hr />

                        {/* <h1>Chat With Shelter</h1>

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
                        <label htmlFor="send-message" className="form-label">Send a message...</label>
                        <div className="input-box">
                            <div className="form-group mb-3">
                                <input name="email" type="text" id="send-message" required="required" className="form-control"
                                    value="" autoComplete="off" />
                            </div>
                        </div>
                        <a type="submit" className="btn btn-primary">Send message</a>
                    </form>
                </div> */}
                    </form>

                    <Box mt={6} width={"100%"} display={"flex"} justifyContent={"center"}>
                        <ApplicationMessages messageData={messageData} is_seeker={!userInfo.is_shelter} load_more={() => get_application_message_data()} can_load_more={nextPage} send_message={(message) => add_application_message(message)} />
                    </Box>

                </div>
            </div>
            // ) : (
            //     <p></p>
            // )}
        )
    }
}
export default PetApplicationPage;