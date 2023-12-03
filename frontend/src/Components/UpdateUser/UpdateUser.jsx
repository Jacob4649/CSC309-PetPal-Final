import { useEffect, useState } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./update-user.css"
const UpdateUser = ({ user_id }) => {
    const [userInfo, setUserInfo] = useState({});
    const get_user_info = () => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${user_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setUserInfo(data)
        })
    }
    // todo
    const get_user_pfp = () => {

    }
    const update_profile_image = (image) => {
        fetch(`http://127.0.0.1:8000/accounts/${user_id}/profile_image`, {
            method: "GET",
            // body: image
        }).then(() => { get_user_pfp() })
    }

    const update_fields = () => {
        fetch(`http://127.0.0.1:8000/accounts/pet_seekers/${user_id}/`, {
            method: "PATCH",
            headers: generateHeaders(),
            body: JSON.stringify({ ...userInfo, profile_pic_link: null })
        }).then(() => {/*Navigate Away*/ })
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
                    <img src={userInfo.profile_pic_link ? userInfo.profile_pic_link : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} />
                </div>

                <div className="container-fluid d-flex flex-column p-0">
                    <div className="input-group">
                        <span
                            className="input-group-text material-symbols-outlined d-none d-sm-inline">add_photo_alternate</span>
                        <input type="file" className="form-control container-fluid m-0" />
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <button className="btn btn-outline-secondary content" type="button" onClick={(e) => {
                            const formData = new FormData();
                            formData.append('file', e.target.value)
                            update_profile_image(formData)
                        }}>Update Profile Pic</button>
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
export default UpdateUser;