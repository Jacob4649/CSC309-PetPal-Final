import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./update-seeker.css"
import clean_request_data from "../../utils/clearRequestData";
import { useNavigate } from "react-router-dom";
const UpdateSeekerPage = ({ user_id }) => {
    const [userInfo, setUserInfo] = useState({});
    const [pfpUploaded, setPfpUploaded] = useState(false);
    const [imageHash, setImageHash] = useState(Date.now());
    const pfp_element = useRef()
    const navigate = useNavigate()
    const get_user_info = () => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${user_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setUserInfo(data)
        })
    }
    const update_profile_image = (file) => {

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const binaryData = event.target.result;

                fetch(`http://127.0.0.1:8000/accounts/${user_id}/profile_image`, {
                    method: "PUT",
                    headers: generateHeaders("image/png"),
                    body: binaryData
                }).then((res) => res.json()).then((data) => {
                    setUserInfo({
                        ...userInfo,
                        profile_pic_link: data.profile_pic_link
                    })
                    setImageHash(Date.now())
                })
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const update_fields = () => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${user_id}/`, {
            method: "PATCH",
            headers: generateHeaders(),
            body: JSON.stringify(clean_request_data({ ...userInfo, profile_pic_link: null }))
        }).then(() => { navigate("/") })
    }
    useEffect(() => {
        get_user_info()
    }, [])
    return (
        <div id="page-container">
            <form onSubmit={(e) => {
                e.preventDefault()
                update_fields()
            }}>
                <h2>Account Info</h2>

                <div id="profile-pic">
                    <img src={userInfo.profile_pic_link ? `${userInfo.profile_pic_link}?${imageHash}` : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} />
                </div>

                <div className="container-fluid d-flex flex-column p-0">
                    <div className="input-group">
                        <span
                            className="input-group-text material-symbols-outlined d-none d-sm-inline">add_photo_alternate</span>
                        <input type="file" className="form-control container-fluid m-0" ref={pfp_element} onChange={(e) => {
                            if (e.target.value) {
                                setPfpUploaded(true)
                            } else {
                                setPfpUploaded(false)
                            }
                        }} />
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <button className="btn btn-outline-secondary content" type="button" onClick={(e) => {
                            update_profile_image(pfp_element.current.files[0])
                        }}
                            disabled={!pfpUploaded}>Update Profile Pic</button>
                    </div>
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">badge</span>
                    <input type="text" placeholder="Name" value={userInfo.name} className="form-control" onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }} />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">email</span>
                    <input type="email" placeholder="Email" value={userInfo.email} className="form-control" onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }} />
                </div>

                <div className="container-fluid d-flex flex-column flex-lg-row p-0">
                    <div className="container-fluid d-flex flex-column p-0">
                        <div className="input-group">
                            <span className="input-group-text material-symbols-outlined">my_location</span>
                            <input type="text" placeholder="Street Address" value={userInfo.address}
                                onChange={(e) => { setUserInfo({ ...userInfo, address: e.target.value }) }} className="form-control" />
                        </div>
                        <div className="input-group mt-3">
                            <span className="input-group-text material-symbols-outlined">location_city</span>
                            <input type="text" placeholder="City" value={userInfo.city}
                                onChange={(e) => { setUserInfo({ ...userInfo, city: e.target.value }) }}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="container-fluid d-flex flex-column p-0">
                        <div className="input-group mt-3 mt-lg-0">
                            <span className="input-group-text material-symbols-outlined">map</span>
                            <input type="text" placeholder="Province" value={userInfo.province}
                                onChange={(e) => { setUserInfo({ ...userInfo, province: e.target.value }) }} className="form-control" />
                        </div>
                        <div className="input-group mt-3">
                            <span className="input-group-text material-symbols-outlined">markunread_mailbox</span>
                            <input type="text" placeholder="Postal Code" value={userInfo.postal_code}
                                onChange={(e) => { setUserInfo({ ...userInfo, postal_code: e.target.value }) }} className="form-control" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary d-flex">
                    Save Changes
                </button>
            </form>
        </div>
    )
}
export default UpdateSeekerPage;