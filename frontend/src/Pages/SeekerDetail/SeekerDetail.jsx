import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./seeker-detail.css"
import clean_request_data from "../../utils/clearRequestData";
import {useNavigate, useParams} from "react-router-dom";
import { Alert, Box, Button, Modal, Typography } from "@mui/material";
const UpdateSeekerPage = ({ user_id }) => {
    const [userInfo, setUserInfo] = useState({});
    const [pfpUploaded, setPfpUploaded] = useState(false);
    const [imageHash, setImageHash] = useState(Date.now());
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const pfp_element = useRef()
    const navigate = useNavigate()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 330, sm: 540 },
        bgcolor: 'black',
        color: "white",
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
    };
    const get_user_info = () => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${user_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then(async (res) => {
            const data = await res.json()
            if (!(res.status >= 200 && res.status < 300)) {
                setError(data.message)
            } else {
                setUserInfo(data)
            }
        })
    }

    useEffect(() => {
        get_user_info()
    }, [])
    return (
        <div className="user-detail">
            <div id="page-container">
                <form>
                    <h1>Account Info</h1>

                    <div id="profile-pic">
                        <img src={userInfo.profile_pic_link ? `${userInfo.profile_pic_link}?${imageHash}` : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} />
                    </div>

                    <div className="input-group">
                        <span className="input-group-text material-symbols-outlined">badge</span>
                        <input type="text" placeholder="Name" value={userInfo.name} className="form-control" readOnly={true} />
                    </div>

                    <div className="input-group">
                        <span className="input-group-text material-symbols-outlined">email</span>
                        <input type="email" placeholder="Email" value={userInfo.email} className="form-control" readOnly={true} />
                    </div>

                    <div className="container-fluid d-flex flex-column flex-lg-row p-0">
                        <div className="container-fluid d-flex flex-column p-0">
                            <div className="input-group">
                                <span className="input-group-text material-symbols-outlined">my_location</span>
                                <input type="text" placeholder="Street Address" value={userInfo.address}
                                       readOnly={true} className="form-control" />
                            </div>
                            <div className="input-group mt-3">
                                <span className="input-group-text material-symbols-outlined">location_city</span>
                                <input type="text" placeholder="City" value={userInfo.city}
                                       readOnly={true}
                                       className="form-control" />
                            </div>
                        </div>
                        <div className="container-fluid d-flex flex-column p-0">
                            <div className="input-group mt-3 mt-lg-0">
                                <span className="input-group-text material-symbols-outlined">map</span>
                                <input type="text"
                                       placeholder="Province"
                                       value={userInfo.province}
                                       readOnly={true}
                                       className="form-control" />
                            </div>
                            <div className="input-group mt-3">
                                <span className="input-group-text material-symbols-outlined">markunread_mailbox</span>
                                <input type="text" placeholder="Postal Code" value={userInfo.postal_code}
                                       readOnly={true} className="form-control" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default UpdateSeekerPage;