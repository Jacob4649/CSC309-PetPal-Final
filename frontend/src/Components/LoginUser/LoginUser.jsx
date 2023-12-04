import { useState } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import "./login-user.css";

const LoginUser = ({ userInfo, setUserInfo }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'username') {
            setUsername(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        submitUser();
    }

    const submitUser = () => {
        fetch("http://127.0.0.1:8000/token/", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "email": username,
                        "password": password
                    }
                )
            }).then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.access)
                fetch("http://127.0.0.1:8000/accounts/pet_seekers/info/", { headers: generateHeaders() })
                .then((res) => res.json())
                .then((userInfo) => {
                    setUserInfo(userInfo)
                })
            })
    }

    return (
        <div id="page-container">

            <form onSubmit={handleSubmit}>

                <h1>Login</h1>

                <div className="text-input">
                    <span className="material-symbols-outlined">email</span>
                    <div className="form-outline">
                        <input type="email"
                               onChange={handleChange}
                               value={username}
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
                    <a type="button" className="btn btn-primary" href="">Login</a>
                </div>

                <div className="login-signup-switch">
                    <p>Don't have an account? <a href="">Join PetPal</a></p>
                </div>

            </form>

        </div>
    )
}

export default LoginUser;