import { useState } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./login-user.css";
import {Link, useNavigate} from "react-router-dom";

const LoginUser = ({ setUserInfo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'email') {
            setEmail(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        submitUser();
    }

    const [errorMessage, setErrorMessage] = useState(null)

    const submitUser = () => {
        fetch("http://127.0.0.1:8000/token/", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password
                    }
                )
        }).then(res => {
            if (res.status === 401) {
                setErrorMessage("Invalid email or password")
            }
            return res.json()
        }).then(data => {
                localStorage.setItem("token", data.access)
                fetch("http://127.0.0.1:8000/accounts/pet_seekers/info/", { headers: generateHeaders() })
                .then((res) => res.json())
                .then((userInfo) => {
                    setUserInfo(userInfo)
                    navigate('/home')
                })
            })
    }

    return (
        <div className="page-container-login-user">

            <form onSubmit={handleSubmit}>

                <h1>Login</h1>

                <div className="text-input">
                    <span className="material-symbols-outlined">email</span>
                    <div className="form-outline">
                        <input type="email"
                               onChange={handleChange}
                               value={email}
                               id="email"
                               className="form-control"
                               placeholder="Email" required>
                        </input>
                    </div>
                </div>

                <div className="text-input">
                    <span className="material-symbols-outlined">lock</span>
                    <div className="form-outline">
                        <input type="password"
                               onChange={handleChange}
                               value={password}
                               id="password"
                               className="form-control"
                               placeholder="Password"
                               required>
                        </input>
                    </div>
                </div>

                <div className="submit-details">
                    <a type="button" className="btn btn-primary" onClick={submitUser}>Login</a>
                </div>

                <div className="login-signup-switch">
                    <p>Don't have an account? <Link to="/signup-seeker">Join PetPal</Link></p>
                </div>

                {
                    !!errorMessage &&
                    (<div className="error-message">
                        {errorMessage}
                    </div>)
                }

            </form>

        </div>
    )
}

export default LoginUser;