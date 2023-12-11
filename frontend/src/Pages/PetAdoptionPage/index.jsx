import { useEffect, useState, useRef } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./pet-adoption.css"
import clean_request_data from "../../utils/clearRequestData";
import { Routes, Route , useNavigate, useParams } from "react-router-dom";

const PetAdoptionPage = ({userInfo}) => {
    const [pet_info, setPetInfo] = useState({});
    let { petId } = useParams();
    const [success_message, setSuccessMessage] = useState(null);
    const [error_message, setErrorMessage] = useState(null);

    const [application_data, setApplicationData] = useState({
      content: '',
      listing: petId
    });

    const get_pet_info = () => {
        // fetch(`http://127.0.0.1:8000/listings/${petId}/`, {
        //     method: "get",
        //     headers: generateHeaders()
        // }).then(async (res) => res.json()).then((data) => {
        //     console.log(data)
        //     setPetInfo(data)
        // })
        fetch(`http://127.0.0.1:8000/listings/${petId}/`, {
            method: "get",
            headers: generateHeaders()
        }).then(async (res) => {
            const data = await res.json()
            if (!(res.status >= 200 && res.status < 300)) {
              navigate("/404")
            }
            else {
              console.log(data)
              setPetInfo(data)
            }
        })
    }

    // changes to message(content)
    const handleChange = (event) => {
        setApplicationData({
          ...application_data,
          content: event.target.value,
        });
    }

    const navigate = useNavigate()

    // hanle post request of creating an app
    const handleSubmit = async (event) => {
      event.preventDefault()

      // maybe an auth issue needs fixing **
      const response = await fetch(`http://127.0.0.1:8000/applications/`, {
          method: 'POST',
          headers: generateHeaders(),
          body: JSON.stringify({
              content: application_data.content,
              listing: petId
            })
      })
      try {
        const response_value = await response
        if (response_value.status === 201) {
            setSuccessMessage("Application submitted successfully")
        }
        else {
          setErrorMessage("Unauthorized")
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
          <h2 className="pet-adop-header">Pet Application - {pet_info.name}</h2>

          {/* if no pet pfp
          <div id="profile-pic">
            <img src="./img/Mr%20Biscuit.jpg" />
          </div> */}
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">badge</span>
            <input type="text" 
            placeholder="Name" 
            className="form-control" 
            value={userInfo.name}
            required />
          </div>
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">email</span>
            <input type="email" 
            placeholder="Email" 
            className="form-control" 
            value={userInfo.email}
            required />
          </div>
    
          {/* <div className="input-group">
            <span className="input-group-text material-symbols-outlined">phone</span>
            <input type="tel" placeholder="Phone Number" className="form-control" required />
          </div> */}
    
          <div className="input-group">
            <span className="input-group-text material-symbols-outlined">reorder</span>
            <textarea placeholder="Message to Shelter" 
              className="form-control" 
              rows="4" 
              onChange={handleChange}
              value={application_data.content}
            />
          </div>
    
          <button type="submit" className="btn btn-primary d-flex" onClick={handleSubmit}>
            Apply
          </button>
          {success_message && <div className="success-message">{success_message}</div>}
          {error_message && <div className="error-message">{error_message}</div>}
        </form>
      </div>
      </div>
    )
}

export default PetAdoptionPage;