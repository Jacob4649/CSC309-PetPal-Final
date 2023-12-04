import { useEffect, useState } from "react";
import generateHeaders from "../../utils/fetchTokenSet";
import { Paper, Table, TableContainer, TableHead, TableRow, Typography, TableCell, TableBody, Avatar, Container, Link, Box, Pagination } from "@mui/material"

const MyApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [totalApplications, setTotalApplications] = useState(0);

    const getApplicationData = (page) => {

        setCurrPage(page)
        // fetch shit
        fetch(`http://127.0.0.1:8000/applications/?page=${page}`,
            {
                method: "get",
                headers: generateHeaders(),

            }
        ).then(res => res.json()).then((applicationData) => {
            setApplications(applicationData.results)
            setTotalApplications(applicationData.count)
        })
    }

    const formatDate = (date_string) => {
        const date = new Date(date_string)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    useEffect(() => {
        getApplicationData(currPage)
    }, [])

    return (
        <>
            <Typography variant="h3" mb={10} mt={5} textAlign={"center"}>
                My Applications
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
                <TableContainer component={Paper} sx={{ width: { xs: 500, md: 800, lg: 1200 }, mb: 5 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Pet
                                </TableCell>
                                <TableCell>
                                    Date
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
                                                <Avatar src={"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg"} sx={{ marginRight: 3 }} />
                                                {application.username}
                                            </Container>
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(application.created_time)}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={application.application_link}>Application Page</Link>
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