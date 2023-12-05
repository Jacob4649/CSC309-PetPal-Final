import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-adoption.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams } from "react-router-dom";

const PetAdoptionPage = () => {
    const [pet_info, setPetInfo] = useState({});
    
    let { petId } = useParams();

    const get_pet_info = () => {
        fetch(`http://127.0.0.1:8000/listings/${petId}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setPetInfo(data)
        })
    }

    useEffect(() => {
        get_pet_info()
    }, [])
    return (
        <div className="pet-adoption">
        <div id="page-container">
        <form>
          <h2>Pet Application - {pet_info.name}</h2>
    
          <div id="profile-pic">
            <img src="./img/Mr%20Biscuit.jpg" />
          </div>
    
          <div class="input-group">
            <span class="input-group-text material-symbols-outlined">badge</span>
            <input type="text" placeholder="Name" class="form-control" required />
          </div>
    
          <div class="input-group">
            <span class="input-group-text material-symbols-outlined">email</span>
            <input type="email" placeholder="Email" class="form-control" required />
          </div>
    
          <div class="input-group">
            <span class="input-group-text material-symbols-outlined">phone</span>
            <input type="tel" placeholder="Phone Number" class="form-control" required />
          </div>
    
          <div class="input-group">
            <span class="input-group-text material-symbols-outlined">reorder</span>
            <textarea placeholder="Message to shelter (optional)" class="form-control" rows="4"></textarea>
          </div>
    
          <div class="agreement">
            <input class="form-check-input" type="checkbox" id="agree" required />
            <label class="form-check-label" for="agree">I agree to the <a href="">Adoption Terms of Service</a></label>
          </div>
    
          <button type="submit" class="btn btn-primary d-flex">
            Apply
          </button>
        </form>
        <footer>
            Copyright PetPal, 2023
        </footer>
      </div>
      </div>
    )
}

export default PetAdoptionPage;