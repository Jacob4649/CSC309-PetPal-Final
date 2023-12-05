import { useState } from "react";
import "./login-user.css";
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SignupUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const handleChange = (event) => {
        const {id, value} = event.target
        const updatedUserData = {
            name: userData.name,
            email: userData.email,
            password1: userData.password1,
            password2: userData.password2
        }
        updatedUserData[id] = value
        setUserData(updatedUserData)
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch("http://127.0.0.1:8000/accounts/pet_seekers/", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userData.email, password: userData.password1 })
        })
        if (response.status === 200) {
            navigate('/login')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h1>Register</h1>

            <div className="text-input">
                <span className="material-symbols-outlined">badge</span>
                <div className="form-outline">
                    <input type="text"
                           id="name"
                           className="form-control"
                           placeholder="Name"
                           onChange={handleChange}
                           value={userData.name} required>
                    </input>
                </div>
            </div>

            <div className="text-input">
                <span className="material-symbols-outlined">email</span>
                <div className="form-outline">
                    <input type="email"
                           id="email"
                           className="form-control"
                           placeholder="Email"
                           onChange={handleChange}
                           value={userData.email} required>
                    </input>
                </div>
            </div>

            <div className="text-input">
                <span className="material-symbols-outlined">lock</span>
                <div className="form-outline">
                    <input type="password"
                           id="password"
                           className="form-control"
                           placeholder="Password"
                           onChange={handleChange}
                           value={userData.password1} required>
                    </input>
                </div>
            </div>

            <div className="text-input">
                <span className="material-symbols-outlined">key</span>
                <div className="form-outline">
                    <input type="password"
                           id="confirm-password"
                           className="form-control"
                           placeholder="Confirm Password"
                           onChange={handleChange}
                           value={userData.password2} required>
                    </input>
                </div>
            </div>

            <div className="submit-details" onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>

            <div className="login-signup-switch">
                <p>Already have an account? <Link to="">Login</Link></p>
            </div>
        </form>
    )
}

export default SignupUser