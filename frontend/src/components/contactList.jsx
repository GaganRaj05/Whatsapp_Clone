import { useEffect } from "react"; 
import GetContacts from "../services/getContacts";

function ContactsList() {
    const [contacts,setContacts] = useState([]);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    useEffect(()=> {
        async function getContacts() {
            const response = await GetContacts();
            if(response.error && response.error === "No contacts found") {
                setLoading(false)
                setError("No contacts found");
            }
            else if(response.error && response.error === "Some error occured, please try again later") {
                setLoading(false)
                setError("Some error occured, please try again later");
            }
            else if(response.error && response.error === "Failed to fetch") {
                setLoading(false)
                setError("Some error occured, please try again later");   
            }
            else {
                setLoading(false);
                setContacts([response])
                console.log(typeof response);
            }
            
        }
    },[]);

    return (
        <div className="contact-list">
            {error && ({error})}
            {loading && (<p>Loading contacts</p>)}


        </div>
    );
}