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
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        navigate("/dashboard");
      } else {
        navigate("/register");
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-12">How does FarmerCare help you</h2>
        <div className="container mx-auto max-w-4xl space-y-6">
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Weather Forecasting</h3>
            <p className="text-green-800">Get accurate weather predictions to plan your farming activities effectively.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Crop Management</h3>
            <p className="text-green-800">Track and manage your crops with expert recommendations for better yield.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Government Schemes</h3>
            <p className="text-green-800">Stay updated with latest government schemes and benefits for farmers.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Loan Assistance</h3>
            <p className="text-green-800">Easy access to information about agricultural loans and financial support.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Expert Support</h3>
            <p className="text-green-800">Get guidance from agricultural experts for your farming needs.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
