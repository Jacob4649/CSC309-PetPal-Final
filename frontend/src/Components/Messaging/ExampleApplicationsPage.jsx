import { useEffect } from "react"
import ApplicationMessages from "./ApplicationMessages"


const ExampleApplicationsPage = ({ userInfo }) => {
    const [loading, setLoading] = useState(true)
    const [messageData, setMessageData] = useState(null)

    useEffect(() => {
        fetch().then((res) => res.json()).then(
            () => {

            }
        )
    }, [])

    // return (
    //     <ApplicationMessages messageData={ } />
    // )
}