import { TextField, Button, Paper } from "@mui/material"
import { useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet"
import { BACKEND_ENDPOINT } from "../../gateway/static"

const LoginPage = ({ setUserInfo, userInfo }) => {
    const [seekerUsername, setSeekerUsername] = useState("p1@mail.com")
    const [seekerPassword, setSeekerPassword] = useState("12345678")
    const [shelterUsername, setShelterUsername] = useState("s1@mail.com")
    const [shelterPassword, setShelterPassword] = useState("12345678")
    const submitSeeker = () => {
        fetch(`${BACKEND_ENDPOINT}/token/`,
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "email": seekerUsername,
                        "password": seekerPassword
                    }
                )
            }).then((res => res.json())).then(data => {
                localStorage.setItem("token", data.access)
                fetch(`${BACKEND_ENDPOINT}/accounts/pet_seekers/info/`, { headers: generateHeaders() }).then((res) => res.json()).then((userInfo) => {
                    setUserInfo(userInfo)
                })
            })
    }
    const submitShelter = () => {
        fetch(`${BACKEND_ENDPOINT}/token/`,
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "email": shelterUsername,
                        "password": shelterPassword
                    }
                )
            }).then((res => res.json())).then(data => {
                localStorage.setItem("token", data.access)
                fetch(`${BACKEND_ENDPOINT}/accounts/shelters/info/`, { headers: generateHeaders() }).then((res) => res.json()).then((userInfo) => {
                    setUserInfo(userInfo)
                })
            })
    }

    return (
        <div>
            <Paper>
                <TextField value={seekerUsername} onChange={(e) => { setSeekerUsername(e.target.value) }} />
                <TextField value={seekerPassword} onChange={(e) => { setSeekerPassword(e.target.value) }} />
                <Button variant="outlined" onClick={() => submitSeeker()}>Login Seeker</Button>
            </Paper>

            <TextField value={shelterUsername} onChange={(e) => { setShelterUsername(e.target.value) }} />
            <TextField value={shelterPassword} onChange={(e) => { setShelterPassword(e.target.value) }} />
            <Button onClick={() => submitShelter()} variant="outlined">Login Shelter</Button>
            <div>
                {userInfo !== null ? `Logged into ${userInfo.email}` : "Not Logged In"}
            </div>
        </div>
    )
}


export default LoginPage