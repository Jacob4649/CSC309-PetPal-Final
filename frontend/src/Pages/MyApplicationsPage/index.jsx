import { useEffect, useState } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import { Paper, Table, TableContainer, TableHead, TableRow, Typography, TableCell, TableBody, Avatar, Container, Link, Box, Pagination, IconButton, Button, Menu, MenuItem } from "@mui/material"
import { ArrowDownward, ArrowOutward } from "@mui/icons-material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BACKEND_ENDPOINT } from "../../gateway/static";

const MyApplicationsPage = ({ userInfo }) => {
    const [applications, setApplications] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const status_int_to_string = {
        0: "All",
        1: 'Approved',
        2: 'Pending',
        3: 'Declined',
        4: 'Withdrawn',
    }
    const string_to_status_int = {
        "All": 0,
        "Approved": 1,
        "Pending": 2,
        "Declined": 3,
        "Withdrawn": 4,
    }
    const sort_string_to_int = {
        "None": 0,
        "Creation Time - ASC": 1,
        "Creation Time - DESC": 2,
        "Last Updated Time - ASC": 3,
        "Last Updated Time - DESC": 4
    }
    const sort_int_to_string = {
        0: "None",
        1: "Creation Time - ASC",
        2: "Creation Time - DESC",
        3: "Last Updated Time - ASC",
        4: "Last Updated Time - DESC"
    }
    const [currPage, setCurrPage] = useState(searchParams.get("page") || 1);
    const [totalApplications, setTotalApplications] = useState(0);
    const [statusAnchorEl, setStatusAnchorEl] = useState(null)
    const [statusSelected, setStatusSelected] = useState(status_int_to_string[searchParams.get("status") || 0])
    const status_dropdown_open = Boolean(statusAnchorEl);
    const [sortAnchorEl, setSortAnchorEl] = useState(null)
    const [sortSelected, setSortSelected] = useState(sort_int_to_string[searchParams.get("sort") || 0])
    const sort_dropdown_open = Boolean(sortAnchorEl);

    const navigate = useNavigate()
    const generate_search_url = () => {
        const myUrlWithParams = new URL(`${BACKEND_ENDPOINT}/applications/`);
        if (statusSelected != "All") {
            myUrlWithParams.searchParams.append("status", string_to_status_int[statusSelected]);
        }
        if (sortSelected == "Creation Time - ASC") {
            myUrlWithParams.searchParams.append("sort_order", "created_time");
            myUrlWithParams.searchParams.append("desc", false);
        } else if (sortSelected == "Creation Time - DESC") {
            myUrlWithParams.searchParams.append("sort_order", "created_time");
            myUrlWithParams.searchParams.append("desc", true);
        } else if (sortSelected == "Last Updated Time - ASC") {
            myUrlWithParams.searchParams.append("sort_order", "last_updated_time");
            myUrlWithParams.searchParams.append("desc", false);
        } else if (sortSelected == "Last Updated Time - DESC") {
            myUrlWithParams.searchParams.append("sort_order", "last_updated_time");
            myUrlWithParams.searchParams.append("desc", true);
        }

        if (currPage) {
            myUrlWithParams.searchParams.append("page", currPage);
        }
        return myUrlWithParams.toString()
    }
    const getApplicationData = (page) => {
        const search_url = generate_search_url()
        setCurrPage(page)
        setSearchParams({ page: page, status: string_to_status_int[statusSelected], sort: sort_string_to_int[sortSelected] })
        // fetch shit
        fetch(search_url,
            {
                method: "get",
                headers: generateHeaders(),

            }
        ).then(res => res.json()).then((applicationData) => {
            setApplications(applicationData.results)
            setTotalApplications(applicationData.count)
        })
    }
    const formatDateTime = (date_string) => {
        const date = new Date(date_string)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }

    useEffect(() => {
        getApplicationData(currPage)
    }, [])
    useEffect(() => {
        getApplicationData(1)
        setSearchParams({ page: currPage, status: string_to_status_int[statusSelected], sort: sort_string_to_int[sortSelected] })
    }, [sortSelected, statusSelected])

    return (
        <>
            <Typography variant="h3" mb={10} mt={5} textAlign={"center"}>
                My Applications
            </Typography>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-around" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    Status:
                    <Box width={120}>
                        <Button
                            onClick={(e) => setStatusAnchorEl(e.currentTarget)}
                        >
                            <ArrowDownward fontSize="14px" sx={{ mr: 1 }} />
                            {statusSelected}


                        </Button>
                        <Menu
                            anchorEl={statusAnchorEl}
                            open={status_dropdown_open}
                            onClose={() => setStatusAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => {
                                setStatusAnchorEl(null)
                                setStatusSelected("All")
                            }
                            }>All</MenuItem>
                            <MenuItem onClick={() => {
                                setStatusAnchorEl(null)
                                setStatusSelected("Approved")
                            }
                            }>Approved</MenuItem>
                            <MenuItem onClick={() => {
                                setStatusAnchorEl(null)
                                setStatusSelected("Declined")
                            }
                            }>Declined</MenuItem>
                            <MenuItem onClick={() => {
                                setStatusAnchorEl(null)
                                setStatusSelected("Pending")
                            }
                            }>Pending</MenuItem>
                            <MenuItem onClick={() => {
                                setStatusAnchorEl(null)
                                setStatusSelected("Withdrawn")
                            }
                            }>Withdrawn</MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    Sort Order:
                    <Box width={260}>
                        <Button
                            onClick={(e) => setSortAnchorEl(e.currentTarget)}
                        >
                            <ArrowDownward fontSize="14px" sx={{ mr: 1 }} />
                            {sortSelected}


                        </Button>
                        <Menu
                            anchorEl={sortAnchorEl}
                            open={sort_dropdown_open}
                            onClose={() => setSortAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => {
                                setSortAnchorEl(null)
                                setSortSelected("None")
                            }
                            }>None</MenuItem>
                            <MenuItem onClick={() => {
                                setSortAnchorEl(null)
                                setSortSelected("Creation Time - ASC")
                            }
                            }>Creation Time - ASC</MenuItem>
                            <MenuItem onClick={() => {
                                setSortAnchorEl(null)
                                setSortSelected("Creation Time - DESC")
                            }
                            }>Creation Time - DESC</MenuItem>
                            <MenuItem onClick={() => {
                                setSortAnchorEl(null)
                                setSortSelected("Last Updated Time - ASC")
                            }
                            }>Last Updated Time - ASC</MenuItem>
                            <MenuItem onClick={() => {
                                setSortAnchorEl(null)
                                setSortSelected("Last Updated Time - DESC")
                            }
                            }>Last Updated Time - DESC</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
                <TableContainer component={Paper} sx={{ width: { xs: 300, sm: 500, md: 800, lg: 1200 }, mb: 5, height: 650 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Pet
                                </TableCell>
                                {
                                    userInfo.is_shelter &&
                                    <TableCell>
                                        Applciant
                                    </TableCell>
                                }
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Created
                                </TableCell>
                                <TableCell>
                                    Last Updated
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((application) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Container disableGutters sx={{ display: "flex", alignItems: "center" }}>
                                                {application.pet_name}
                                            </Container>
                                        </TableCell>
                                        {
                                            userInfo.is_shelter &&
                                            <TableCell>
                                                {application.applicant_name}
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {status_int_to_string[application.application_status]}
                                        </TableCell>
                                        <TableCell>
                                            {formatDateTime(application.created_time)}
                                        </TableCell>
                                        <TableCell>
                                            {formatDateTime(application.last_updated_time)}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => navigate(`/pet-application/${application.id}`)}><ArrowOutward /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer >
                <Pagination count={Math.ceil(totalApplications / 3)} page={currPage} onChange={(e, page) => { getApplicationData(page) }} />
            </Box>
        </>
    )
}

export default MyApplicationsPage;