import React, { useState } from 'react';
import '../assets/Styles/WhatsAppLogin.css';
import { FaDownload } from 'react-icons/fa';

function WhatsAppLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [otp, setOtp] = useState('');

  const handleNext = () => {
    if (phoneNumber.trim() !== '') {
      setShowOtpPage(true);
    }
  };

  const handleVerifyOtp = () => {

    alert(`OTP entered: ${otp}`);
  };

  return (
    <div className="whatsapp-page">
      <div className="header">
        <img src="/whatsapp-logo.png" alt="WhatsApp Logo" className="whatsapp-logo" />
        <button className="download-button">
          <FaDownload /> Download
        </button>
      </div>

      <div className="content-wrapper">
        <div className="whatsapp-login-container">
          {!showOtpPage ? (
            <div className="whatsapp-login-box">
              <h2>Enter phone number</h2>
              <input
                type="text"
                className="phone-input"
                placeholder="+91"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
              <br />
              <a href="#" className="qr-code-link">
                Log in with QR code
              </a>
            </div>
          ) : (
            <div className="whatsapp-login-box">
              <h2>Enter OTP</h2>
              <input
                type="text"
                className="otp-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="verify-button" onClick={handleVerifyOtp}>
                Verify
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Encryption Message */}
      <p className="encryption-info">Your personal messages are end-to-end encrypted</p>
    </div>
  );
}

export default WhatsAppLogin;