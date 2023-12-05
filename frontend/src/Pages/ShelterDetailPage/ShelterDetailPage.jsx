import { useEffect, useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet";
import "./ShelterDetail.css"
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const ShelterDetailPage = ({ userInfo }) => {
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

    if (loading) return <CircularProgress />
    return (
        <div className="container d-flex flex-column content-wrap shelter-detail-page">
            <h1 className="text-center">{shelterData.name}</h1>
            <div className="d-flex flex-column">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="profile-pic">
                        <img className="shelter-profile-pic" src={shelterData.profile_pic_link ? shelterData.profile_pic_link : "https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png"} />
                    </div>
                    {/* <div className="d-flex align-items-end m-2">
                        <span className="material-symbols-outlined filled-icon">star</span>
                        <span className="material-symbols-outlined filled-icon">star</span>
                        <span className="material-symbols-outlined">star_half</span>
                        <span className="material-symbols-outlined">star</span>
                        <span className="material-symbols-outlined">star</span>
                        <span>(30)</span>
                    </div> */}
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
                    {/* <h2 className="mb-3">Our Pets</h2>
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-touch="false"
                        data-bs-interval="false">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="img/buff_dog.png" className="d-block w-100" alt="...">
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Bartholomew</h5>
                                        <a href="pet-detail.html"><button className="btn btn-primary">Learn More</button></a>
                                    </div>
                            </div>
                            <div className="carousel-item">
                                <img src="img/Mr%20Biscuit.jpg" className="d-block w-100" alt="...">
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Mr. Biscuit</h5>
                                        <a href="pet-detail.html"><button className="btn btn-primary">Learn More</button></a>
                                    </div>
                            </div>
                            <div className="carousel-item">
                                <img src="img/cat1.jpg" className="d-block w-100" alt="...">
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Mr. Whiskers</h5>
                                        <a href="pet-detail.html"><button className="btn btn-primary">Learn More</button></a>
                                    </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default ShelterDetailPage