
import { Link, useNavigate } from "react-router-dom";

/**
 * Row in an application table
 * @param props including an application object 
 */
export const ApplicationRow = ({ application }) => {
    const navigate = useNavigate();
    return <tr onClick={() => navigate(`/pet-application/${application.id}`)}>
        <td>{application.listing.name}</td>
        <td>{application.listing.shelter.name}</td>
        <td>{application.created_time.toLocaleDateString()}</td>
    </tr>
}