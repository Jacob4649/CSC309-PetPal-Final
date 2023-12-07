import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-application.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams } from "react-router-dom";

const PetApplicationPage = () => {
    return (
        <div className="pet-application">
        <div id="page-container">
            <form>
                <h1>Your Application - Mr Biscuit <span className="badge bg-secondary">Submitted</span></h1>

                {/* Needs Fixing */}
                {/* <div id="profile-pic">
                    <img src="./img/Mr%20Biscuit.jpg" />
                </div> */}

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">badge</span>
                    <input type="text" placeholder="Name" value="Jack Sun" className="form-control" readonly />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">email</span>
                    <input type="email" placeholder="Email" value="jack@utoronto.edu" className="form-control" readonly />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">phone</span>
                    <input type="tel" placeholder="Phone Number" value="647 603 8622" className="form-control" readonly />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">reorder</span>
                    <textarea placeholder="Message to shelter (optional)" 
                        readonly className="form-control"
                        rows="4"
                        value="I really want this dog."
                    /> 
                </div>

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