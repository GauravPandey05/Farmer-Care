import React, { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, db, setUpRecaptcha } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const requestOTP = async () => {
    if (!phone.trim() || !phone.startsWith("+")) {
      alert("Enter a valid phone number with country code (e.g., +91XXXXXXXXXX)");
      return;
    }
  
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
      setUpRecaptcha(); // ✅ Always reinitialize reCAPTCHA
  
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP Sent!");
    } catch (error) {
      console.error("OTP Error:", error);
      alert("Error sending OTP: " + error.message);
    }
  };
  

  const verifyOTP = async () => {
    if (!confirmationResult || !otp.trim()) {
      alert("Please enter OTP and request it first.");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      alert("Login Successful!");

      const userProfileRef = doc(db, "farmers", user.uid);
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        sessionStorage.setItem("userData", JSON.stringify(docSnap.data()));
        navigate("/dashboard");
      } else {
        navigate("/register");
      }
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Farmer Login</h2>

      <input
        type="text"
        placeholder="Enter Phone Number (+91XXXXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-full my-2"
      />
      <button onClick={requestOTP} className="px-4 py-2 bg-blue-500 text-white rounded">
        Get OTP
      </button>
      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-full my-2"
          />
          <button onClick={verifyOTP} className="px-4 py-2 bg-green-500 text-white rounded">
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
