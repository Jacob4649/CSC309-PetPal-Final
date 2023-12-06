import { Link, useSearchParams, useNavigate } from "react-router-dom"
import {
    Typography,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Pagination,
    TableBody,
    TextField,
    IconButton,
    Container,
    Fab,
    Button,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import { useEffect, useState } from "react"
import generateHeaders from "../../utils/fetchTokenSet"
import LoadingPage from "../LoadingPage/LoadingPage"
import ShelterBlogSummary from "../../Components/ShelterBlogs/ShelterBlogSummary"

const ShelterBlogsPage = () => {
    const [loading, setLoading] = useState(true)
    const [shelterBlogData, setShelterBlogData] = useState();
    const [searchParam, setSearchParam] = useSearchParams();
    const [shelterName, setShelterName] = useState(searchParam.get("shelter"));
    const [currPage, setCurrPage] = useState(1);
    const [paginationBatch, setPaginationBatch] = useState();
    const navigate = useNavigate()
    const get_shelter_blogs = (shelter_name) => {
        console.log(shelter_name)
        if (shelterName !== null && shelterName !== "") {
            fetch(
                `http://127.0.0.1:8000/shelter-blogs/?shelter=${shelter_name}`,
                {
                    method: "GET",
                    headers: generateHeaders()
                }
            ).then(res => res.json()).then((data) => {
                console.log(data)
                setShelterBlogData(data)
                setPaginationBatch(data.slice(0, 7))
                setLoading(false)
            })
        } else {
            fetch(
                `http://127.0.0.1:8000/shelter-blogs`,
                {
                    method: "GET",
                    headers: generateHeaders()
                }
            ).then(res => res.json()).then((data) => {
                console.log(data)
                setShelterBlogData(data)
                setPaginationBatch(data.slice(0, 7))
                setLoading(false)
            })
        }
    }
    const update_pagination_batch = (page, batch_size) => {
        setCurrPage(page)
        setPaginationBatch(shelterBlogData.slice((page - 1) * batch_size, page * batch_size))
    }

    useEffect(() => {
        setLoading(true)
        get_shelter_blogs(shelterName)
    }, [searchParam])
    useEffect(() => {
        if (!loading) {
            update_pagination_batch(currPage, 7)
        }
    }, [shelterBlogData])

    if (loading) return <LoadingPage />
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3" mb={10} mt={5}>
                Shelter Blog Posts
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: { xs: 500, md: 800, lg: 1200 }, mb: 5 }}>
                <Box
                    width={"100%"}
                    sx={{ backgroundColor: "white" }}>
                    <TextField fullWidth
                        placeholder="Search Shelter Name"
                        value={shelterName}
                        variant="standard"
                        sx={
                            {
                                backgroundColor: "#ffffff",
                                p: 1
                            }
                        }
                        onChange={(e) => { setShelterName(e.target.value) }}
                        InputProps={{
                            startAdornment: <Button sx={{ width: 120 }} onClick={() => navigate("/shelter-blogs/create")}>
                                Add New
                            </Button>,
                            endAdornment: <IconButton onClick={(e) => {
                                setSearchParam({ shelter: shelterName })
                                get_shelter_blogs(shelterName)
                            }}><Search /></IconButton>
                        }} />
                </Box>
                <TableContainer component={Paper} sx={{ height: 600 }} >
                    <Table >
                        <TableRow></TableRow>
                        <TableHead>
                            <TableRow>
                                <TableCell>

                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginationBatch.map((shelterBlog, i) => {
                                return <ShelterBlogSummary
                                    title={shelterBlog.title}
                                    shelter_name={shelterBlog.shelter_name}
                                    blog_id={shelterBlog.id}
                                    key={shelterBlog.id}
                                    curr_user_liked={shelterBlog.current_user_liked}
                                    avatar={shelterBlog.shelter_profile_pic_link}
                                    like_count={shelterBlog.total_like_count}
                                    set_shelter_blog_info={(count, liked) => {
                                        const newShelterBlogPostData = {
                                            ...shelterBlog,
                                            current_user_liked: liked,
                                            total_like_count: count
                                        }
                                        console.log(newShelterBlogPostData)
                                        const newShelterBlogData = [...shelterBlogData.slice(0, (currPage - 1) * 7 + i), newShelterBlogPostData, ...shelterBlogData.slice((currPage - 1) * 7 + i + 1)]
                                        setShelterBlogData(newShelterBlogData)
                                    }
                                    }
                                />
                            })}
                        </TableBody>

                    </Table>
                </TableContainer >
                <Pagination count={Math.ceil(shelterBlogData.length / 7)} page={currPage} sx={{ mt: 2 }} onChange={(e, page) => { update_pagination_batch(page, 7) }} />
            </Box>
        </Box >
    )
}

export default ShelterBlogsPage