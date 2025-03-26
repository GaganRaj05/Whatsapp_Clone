const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function VerifyOtp(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/login/verify-otp`, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData),
        })
        const data = await response.json();
        if(!response.ok) {
            return {error:data};
        }
        return data;
    }
    catch(err) {
        return {error:err.message};
    }
}

export default VerifyOtp;