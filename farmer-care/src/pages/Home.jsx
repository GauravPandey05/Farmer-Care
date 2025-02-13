import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, signInWithPhoneNumber, setUpRecaptcha } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Your complete farming companion for better yield and sustainable growth.";
  const [textIndex, setTextIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + fullText[textIndex]);
        setTextIndex(textIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSignupMessage("");
    setLoading(true);
    
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    }
    
    setLoading(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSignupMessage("");
    setLoading(true);
    
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "farmers", user.uid));
      if (userDoc.exists()) {
        navigate("/dashboard");
      } else {
        setSignupMessage("User not found. Please sign up below.");
      }
    } catch (err) {
      setError("Invalid OTP. Try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/736x/a2/c7/7c/a2c77c05492aa6037bcf76482cf5d1ed.jpg)',
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white md:w-1/2 text-center md:text-left z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FarmerCare</h1>
              <p className="text-xl md:text-2xl">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            <div className="md:w-1/2 max-w-md w-full z-10">
              <div className="backdrop-blur-md bg-white bg-opacity-10 p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Login</h2>
                {error && <p className="text-red-400 text-center">{error}</p>}
                {signupMessage && (
                  <div className="text-yellow-400 text-center">
                    <p>{signupMessage}</p>
                    <button
                      className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
                {!confirmationResult ? (
                  <form onSubmit={sendOtp} className="space-y-4">
                    <div>
                      <label className="block text-white">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={verifyOtp} className="space-y-4">
                    <div>
                      <label className="block text-white">Enter OTP</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </form>
                )}
                <div id="recaptcha-container"></div>

                <p className="text-white text-center mt-4">
                  New user?{" "}
                  <button onClick={() => navigate("/register")} className="text-yellow-400 underline hover:text-yellow-500">
                    Sign Up
                  </button>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
