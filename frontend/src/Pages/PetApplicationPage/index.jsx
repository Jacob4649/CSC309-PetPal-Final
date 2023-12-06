import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-application.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams } from "react-router-dom";

const PetApplicationPage = () => {
    return (
        <div id="page-container">
            <form>
                <h1>Your Application - Mr Biscuit <span class="badge bg-secondary">Submitted</span></h1>

                {/* <div id="profile-pic">
                    <img src="./img/Mr%20Biscuit.jpg" />
                </div> */}

                <div class="input-group">
                    <span class="input-group-text material-symbols-outlined">badge</span>
                    <input type="text" placeholder="Name" value="Jack Sun" class="form-control" readonly />
                </div>

                <div class="input-group">
                    <span class="input-group-text material-symbols-outlined">email</span>
                    <input type="email" placeholder="Email" value="jack@utoronto.edu" class="form-control" readonly />
                </div>

                <div class="input-group">
                    <span class="input-group-text material-symbols-outlined">phone</span>
                    <input type="tel" placeholder="Phone Number" value="647 603 8622" class="form-control" readonly />
                </div>

                <div class="input-group">
                    <span class="input-group-text material-symbols-outlined">reorder</span>
                    <textarea placeholder="Message to shelter (optional)" 
                        readonly class="form-control"
                        rows="4"
                        value="I really want this dog."
                    /> 
                </div>

                <hr />

                <h1>Chat With Shelter</h1>

                <div class="chat-box">
                    <div class="messages">
                        <div class="msg-box other-msg">
                            <div class="msg-author">
                                Homes for Pets
                            </div>
                            <div class="msg-contents">
                                When would you be free to come and pick Mr Biscuit up?
                            </div>
                        </div>

                        <div class="msg-box your-msg">
                            <div class="msg-author">
                                You
                            </div>
                            <div class="msg-contents">
                                Immediately.
                            </div>
                        </div>

                        <div class="msg-box other-msg">
                            <div class="msg-author">
                                Homes for Pets
                            </div>
                            <div class="msg-contents">
                                We're closed today, but would you like to come in tomorrow?
                            </div>
                        </div>

                        <div class="msg-box your-msg">
                            <div class="msg-author">
                                You
                            </div>
                            <div class="msg-contents">
                                Affirmative.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chat-input">
                    <form>
                        <label for="send-message" class="form-label">Send a message...</label>
                        <div class="input-box">
                            <div class="form-group mb-3">
                                <input name="email" type="text" id="send-message" required="required" class="form-control"
                                    value="" autocomplete="off" />
                            </div>
                        </div>
                        <a type="submit" class="btn btn-primary">Send message</a>
                    </form>
                </div>
            </form>
        </div>
    )
}
export default PetApplicationPage;