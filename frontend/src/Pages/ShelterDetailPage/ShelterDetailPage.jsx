import { useEffect, useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet";
import "./ShelterDetail.css"
import { useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import ShelterComments from "../../Components/Comments/ShelterComments";

const ShelterDetailPage = ({ }) => {
    const { shelter_id } = useParams();
    const [shelterData, setShelterData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/accounts/shelters/${shelter_id}/`, {
            method: "GET",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log("shelter detail stuff")
            console.log(data)
            setShelterData(data)
            setLoading(false)
        })
    }, [])

    if (loading) return <LoadingPage />
    return (
        <div className="container d-flex flex-column content-wrap shelter-detail-page">
            <h1 className="text-center">{shelterData.name}</h1>
            <div className="d-flex flex-column">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="profile-pic">
                        <img className="shelter-profile-pic" src={shelterData.profile_pic_link ? shelterData.profile_pic_link : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} />
                    </div>
                </div>
                <div className="p-md-5 d-flex flex-column align-items-center">
                    {shelterData.description !== null && shelterData.description !== "" ?
                        <>
                            <div className="d-flex flex-row justify-content-start">
                                <span className="material-symbols-outlined filled-icon pe-2">
                                    format_quote
                                </span>
                                <div>
                                    {shelterData.description}
                                </div>
                            </div>
                            <hr className="hr container-fluid" />
                        </>
                        :
                        <></>
                    }

                    <div className="container-fluid d-flex flex-column align-items-center">
                        <div className="text-center">
                            Address: {shelterData.address && shelterData.address !== ""
                                ?
                                shelterData.address :
                                "No address listed"
                            }
                        </div>
                        <div className="text-center">
                            Contact: {shelterData.email}
                        </div>
                    </div>
                    <hr className="hr container-fluid" />
                </div>
                <ShelterComments shelter_id={shelter_id} />
            </div>
        </div>
    )
}
export default ShelterDetailPage