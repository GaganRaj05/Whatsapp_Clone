const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function SendOtp(phoneNum) {
    try {
        console.log(phoneNum)
        const response = await fetch(`${BACKEND_URL}/auth/login`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(phoneNum),     
        });

        const data = await response.json();
        if(!response.ok) {
            console.log(typeof data)
            return {error:data};
        }

        return data;

    }
    catch(err) {
        console.log(err)
        return {error: err.message};
    }
}
export default SendOtp;