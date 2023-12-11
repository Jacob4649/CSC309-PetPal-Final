import { Paper, TextField, Typography, Alert, Box, Button } from "@mui/material"
import { useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet"
import { useNavigate } from "react-router-dom"
import { BACKEND_ENDPOINT } from "../../gateway/static"

const CreateShelterBlogPage = ({ userInfo }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const check_errors = () => {
        if (title === "" || content === "") {
            setError("Title and Content must be present")
            return true
        }
        return false
    }

    const create_shelter_blog = () => {
        if (!check_errors()) {
            fetch(`${BACKEND_ENDPOINT}/shelter-blogs/`, {
                method: "POST",
                headers: generateHeaders(),
                body: JSON.stringify({ title, content })
            }).then(() => navigate("/shelter-blogs"))
        }
    }
    return (
        <>
            <Paper sx={{ m: 10 }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", m: 10, height: 800 }}>
                    <Typography variant="h2">
                        Create Shelter Blog Post
                    </Typography>
                    <TextField value={title} label={"Title"} minRows={5} maxRows={5} onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField value={content} label={"Content"} multiline rows={20} onChange={(e) => setContent(e.target.value)} fullWidth />
                    {
                        error ? <Alert severity="error">{error}</Alert> : <></>
                    }
                    <Button variant="contained" onClick={() => create_shelter_blog()}>Submit</Button>

                </Box>
            </Paper>
        </>
    )


}
export default CreateShelterBlogPage