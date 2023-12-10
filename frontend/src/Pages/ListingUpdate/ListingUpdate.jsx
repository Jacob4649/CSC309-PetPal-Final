import { useEffect, useState } from "react";
import "./listing-update.css";
import { useNavigate } from "react-router-dom";
import generateHeaders from "../../utils/fetchTokenSet";

const ListingUpdate = ({ listing_id }) => {
    const [listingData, setListingData] = useState({
        name: '',
        species: '',
        breed: '',
        weight_lbs: 0.0,
        height_feet: 0.0,
        age_months: 0,
        age_years: 0,
        listing_status: 3,
        description: ''
    })

    const getListingInfo = () => {
        fetch(`http://127.0.0.1:8000/listings/${listing_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            const ageYears = Math.floor(data.age_months / 12);
            const ageMonths = data.age_months % 12;
            const heightInches = data.height_feet * 12;

            setListingData({
                name: '',
                species: '',
                breed: '',
                weight_lbs: 0.0,
                listing_status: 3,
                description: '',
                age_years: ageYears,
                age_months: ageMonths,
                height_feet: heightInches
            });
        });
    }

    const handleChange = (event) => {
        const { id, value } = event.target
        const updatedListingData = {
            name: listingData.name,
            species: listingData.species,
            breed: listingData.breed,
            weight_lbs: listingData.weight_lbs,
            height_feet: listingData.height_feet,
            age_months: listingData.age_months,
            age_years: listingData.age_years,
            listing_status: listingData.listing_status,
            description: listingData.description
        }
        updatedListingData[id] = value
        setListingData(updatedListingData)
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const new_age = (listingData.age_years * 12) + listingData.age_months
        let new_status = 0
        switch (listingData.listing_status) {
            case 'adopted':
                new_status = 1;
                break;
            case 'canceled':
                new_status = 2;
                break;
            case 'available':
                new_status = 3;
                break;
        }
        const new_height = listingData.height_feet * 12
        const response = fetch("http://127.0.0.1:8000/listings/", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: listingData.name,
                species: listingData.species,
                breed: listingData.breed,
                weight_lbs: listingData.weight_lbs,
                height_feet: new_height,
                age_months: new_age,
                listing_status: new_status,
                description: listingData.description
            })
        })
        try {
            const response_value = await response
            if (response_value.status === 200) {
                navigate('/login')
            }
        } catch {
            console.log("register error occurred")
        }
    }

    useEffect(() => {
        getListingInfo()
    }, [])

    return (
        <div className="listing-update">
            <form onSubmit={handleSubmit}>
                <h2>Create Pet Listing</h2>

                // TODO: Fix pfp
                <div className="profile-pic">
                    <img src="../../../public/img/default_dog_profile_pic.png" alt="Default Dog Profile" />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">pets</span>
                    <input type="text"
                        placeholder="Pet Name"
                        className="form-control"
                        onChange={handleChange}
                        value={listingData.name}
                        required />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">sound_detection_dog_barking</span>
                    <input type="text"
                        placeholder="Species"
                        className="form-control"
                        onChange={handleChange}
                        value={listingData.species}
                        required />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">pet_supplies</span>
                    <input type="text"
                        placeholder="Breed"
                        className="form-control"
                        onChange={handleChange}
                        value={listingData.breed}
                        required />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">check</span>
                    <select className="form-control"
                        onChange={handleChange}
                        value={listingData.listing_status} required>
                        <option disabled selected value="">Availability Status</option>
                        <option value="available">Available</option>
                        <option value="adopted">Adopted</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                // TODO: Implement pfp upload
                <div className="container-fluid d-flex flex-column p-0">
                    <div className="input-group">
                        <span className="input-group-text material-symbols-outlined d-none d-sm-inline">add_photo_alternate</span>
                        <input type="file" className="form-control container-fluid m-0" />
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <button type="button" className="btn btn-outline-secondary content">Upload Pet Photo</button>
                    </div>
                </div>

                <div className="container-fluid d-flex flex-column flex-lg-row p-0">
                    <div className="container-fluid d-flex flex-column p-0">
                        <div className="input-group">
                            <span className="input-group-text material-symbols-outlined">calendar_month</span>
                            <input type="text"
                                placeholder="Age (Years)"
                                id="years"
                                min="0"
                                max="99"
                                className="form-control"
                                onChange={handleChange}
                                value={listingData.age_years} required />
                        </div>
                    </div>
                    <div className="container-fluid d-flex flex-column p-0">
                        <div className="input-group mt-3 mt-lg-0">
                            <span className="input-group-text material-symbols-outlined">event</span>
                            <input type="number"
                                placeholder="Age (Months)"
                                id="months"
                                min="0"
                                max="11"
                                className="form-control"
                                onChange={handleChange}
                                value={listingData.age_months} required />
                        </div>
                    </div>
                </div>

                <div className="container-fluid d-flex flex-column flex-lg-row p-0">
                    <div className="container-fluid d-flex flex-column p-0">
                        <div className="input-group mt-3 mt-lg-0">
                            <span className="input-group-text material-symbols-outlined">height</span>
                            <input type="number"
                                id="height"
                                placeholder="Height (inches)"
                                className="form-control"
                                min="0"
                                max="100"
                                step="0.5"
                                onChange={handleChange}
                                value={listingData.height_feet} required />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">reorder</span>
                    <textarea placeholder="Description (medical history, behavior, special needs, etc.)"
                        className="form-control"
                        rows="4"
                        onChange={handleChange}
                        value={listingData.description}>
                    </textarea>
                </div>

                <button type="submit"
                    className="btn btn-primary d-flex"
                    onClick={handleSubmit}>
                    Create Listing
                </button>
            </form>
        </div>
    )
}

export default ListingUpdate

