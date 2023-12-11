import { useEffect, useState } from "react";
import "./listing-update.css";
import {useNavigate, useParams} from "react-router-dom";
import generateHeaders from "../../utils/fetchTokenSet";

const ListingUpdate = () => {
    const [listingData, setListingData] = useState({
        name: '',
        species: '',
        breed: '',
        height_feet: null,
        age_months: null,
        age_years: null,
        weight_lbs: null,
        listing_status: null,
        description: ''
    })
    let { listing_id } = useParams();

    const getListingInfo = () => {
        fetch(`http://127.0.0.1:8000/listings/${listing_id}`, {
            method: "get",
            headers: generateHeaders()
        }).then(r => {
            if (r.status === 401 || r.status === 403) {
                if (!(r.status >= 200 && r.status < 300)) {
                    navigate("/404")
                }
            }
            return data.json();
        }).then((res) => res.json()).then((data) => {
            const ageYears = Math.floor(data.age_months / 12);
            const ageMonths = data.age_months % 12;
            const heightInches = data.height_feet * 12;
            let new_status = ''
            switch (data.listing_status) {
                case 1:
                    new_status = 'adopted';
                    break;
                case 2:
                    new_status = 'canceled';
                    break;
                case 3:
                    new_status = 'available';
                    break;
            }

            setListingData({
                name: data.name,
                species: data.species,
                breed: data.breed,
                weight_lbs: data.weight_lbs,
                listing_status: new_status,
                description: data.description,
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
        const new_age = ((listingData.age_years * 12) + listingData.age_months) || 0
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
        const new_height = (listingData.height_feet * 12) || 0
        const response = fetch(`http://127.0.0.1:8000/listings/${listing_id}/`, {
            method: 'PATCH',
            headers: generateHeaders(),
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
                navigate(`/pet-detail/${listing_id}`)
            }
        } catch {
            console.log("register error occurred")
        }
    }

    useEffect(() => {
        getListingInfo()
    }, [])
    return (
        <div className="listing-create">
            <form onSubmit={handleSubmit}>
                <h2>Update Pet Listing</h2>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">pets</span>
                    <input
                        type="text"
                        id="name"
                        placeholder="Pet Name"
                        className="form-control"
                        onChange={handleChange}
                        value={listingData.name}
                        required />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">sound_detection_dog_barking</span>
                    <input
                        type="text"
                        id="species"
                        placeholder="Species"
                        className="form-control"
                        onChange={handleChange}
                        value={listingData.species}
                        required />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">pet_supplies</span>
                    <input
                        type="text"
                        id="breed"
                        placeholder="Breed"
                        className="form-control"
                        onChange={handleChange}
                        value={listingData.breed}
                        required />
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">check</span>
                    <select
                        className="form-control"
                        id="listing_status"
                        onChange={handleChange}
                        value={listingData.listing_status} required>
                        <option disabled selected value="">Availability Status</option>
                        <option value="available">Available</option>
                        <option value="adopted">Adopted</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <div className="container-fluid d-flex flex-column flex-lg-row p-0">
                    <div className="container-fluid d-flex flex-column p-0">
                        <div className="input-group">
                            <span className="input-group-text material-symbols-outlined">calendar_month</span>
                            <input
                                type="text"
                                id="age_years"
                                placeholder="Age (years)"
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
                                   placeholder="Age (months)"
                                   id="age_months"
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
                                   id="height_feet"
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


                <div className="container-fluid d-flex flex-column p-0">
                    <div className="input-group mt-3 mt-lg-0">
                        <span className="input-group-text material-symbols-outlined">scale</span>
                        <input type="number"
                               id="weight_lbs"
                               placeholder="Weight (pounds)"
                               className="form-control"
                               min="0"
                               max="300"
                               step="0.1"
                               onChange={handleChange}
                               value={listingData.weight_lbs}
                               required />
                    </div>
                </div>

                <div className="input-group">
                    <span className="input-group-text material-symbols-outlined">reorder</span>
                    <textarea
                        placeholder="Description (medical history, behavior, special needs, etc.)"
                        id="description"
                        className="form-control"
                        rows="4"
                        onChange={handleChange}
                        value={listingData.description}>
                    </textarea>
                </div>

                <button type="submit"
                        className="btn btn-primary d-flex"
                        onClick={handleSubmit}>
                    Update Listing
                </button>
            </form>
        </div>
    )
}

export default ListingUpdate

