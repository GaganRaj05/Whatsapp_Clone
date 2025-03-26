const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function GetContacts() {
    try {
        const response = await fetch(`${BACKEND_URL}/features/contacts`, {
            method:"GET",
            credentials:'include'
        })
        const data = response.json();
        if(!response.ok) {
            return {error:data}
        }
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

export default GetContacts;