import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-adoption.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams } from "react-router-dom";

const PetAdoptionPage = () => {
    const [pet_info, setPetInfo] = useState({});
    let { petId } = useParams();

    const [application_data, setApplicationData] = useState({
      content: '',
      listing: petId
    });

    const get_pet_info = () => {
        fetch(`http://127.0.0.1:8000/listings/${petId}`, {
            method: "get",
            headers: generateHeaders()
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setPetInfo(data)
        })
    }

    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (event) => {
        // const {id, value} = event.target
        // const updatedApplicationData = {
        //     content: application_data.content
        // }
        // updatedApplicationData[id] = value
        // setApplicationData(updatedApplicationData)
        setApplicationData({
          ...application_data,
          content: event.target.value,
        });
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
      event.preventDefault()

      const response = await fetch("http://127.0.0.1:8000/applications", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              content: application_data.content,
              listing: petId
            })
      })
      try {
        const response_value = await response
        if (response_value.status === 200) {
            navigate('/applications')
        }
      } catch {
          console.log("register error occurred")
      }
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
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">badge</span>
            <input type="text" placeholder="Name" className="form-control" required />
          </div>
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">email</span>
            <input type="email" placeholder="Email" className="form-control" required />
          </div>
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">phone</span>
            <input type="tel" placeholder="Phone Number" className="form-control" required />
          </div>
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">reorder</span>
            <textarea placeholder="Message to shelter (optional)" 
              className="form-control" 
              rows="4" 
              onChange={handleChange}
              value={application_data.content}
            />
          </div>
    
          <div className="agreement">
            <input className="form-check-input" type="checkbox" id="agree" required />
            <label className="form-check-label" for="agree">I agree to the <a href="">Needs Fixing Adoption Terms of Service</a></label>
          </div>
    
          <button type="submit" className="btn btn-primary d-flex" onClick={handleSubmit}>
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