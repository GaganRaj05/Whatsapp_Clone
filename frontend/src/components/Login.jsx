import { useState } from "react";
import SendOtp from "../services/sendOtp";
import VerifyOtp from "../services/verifyOtp";

function Login() {
  const [loginFormData, setLoginFormData] = useState({ phone: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginFormDisplay, setLoginFormDisplay] = useState(true);
  const [otpFormDisplay, setOtpFormDisplay] = useState(false);
  const [otp,setOtp] = useState("");

  const loginFormHandleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  const loginFormHandleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await SendOtp(loginFormData);
    if (
      response.error &&
      (response.error === "Failed to fetch" ||
        response.error === "Internal server error")
    ) {
      setError("some error occured please try again later");
      console.log("some error occured please try again later");
    } else if (
      response.error &&
      response.error === "No users found, create an account"
    ) {
      setError("No users found, create an account");
      console.log("No users found");
    } else {
        setLoginFormDisplay(false);
        setOtpFormDisplay(true)
      setSuccess(response);
    }
  };

  const otpFormHandleChange = (e)=> {
    setOtp(e.target.value)
    console.log(otp)
}
  const otpFormSubmit = async(e) => {
    e.preventDefault();
    setError("");
    const formData = {
        "phone":loginFormData.phone,
        "otp":otp
    }
    console.log(formData)
    const response = await VerifyOtp(formData);

    if(response.error && (response.error === "Internal server error" || response.error === "Failed to fetch")) {
        setError("Some error occured please try again later");
    }
    else if(response.error && response.error === "Otp expired please request a new one...!") {
        setError("Otp expired please request a new one...!");
    }
    else {
        alert("successfully");
    }

  }

  return (
    <div>
      {loginFormDisplay && (
        <div className="loginForm">
          {error && <p>{error}</p>}

          <form onSubmit={loginFormHandleSubmit}  method="POST">
            <input
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              onChange={loginFormHandleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {otpFormDisplay && (<div>
            <form onSubmit={otpFormSubmit}>
                {error && <p>{error}</p>}
                {success && <p>Otp sent successfully to your email address</p>}
                <input type="text" name="otp" placeholder="Enter your otp" onChange={otpFormHandleChange} value={otp} required/>
                <button type="submit">Submit</button>
            </form>
        
        </div>)}
    </div>
  );
}
export default Login;
