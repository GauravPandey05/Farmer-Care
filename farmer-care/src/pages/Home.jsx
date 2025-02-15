import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "farmers", userCredential.user.uid), { email, createdAt: new Date() });
        navigate("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
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
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                  {isSignUp === null ? "Get Started" : isSignUp ? "Sign Up" : "Login"}
                </h2>
                {error && <p className="text-red-400 text-center">{error}</p>}

                {isSignUp === null ? (
                  <div className="flex flex-col space-y-4">
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => setIsSignUp(false)}
                    >
                      Login
                    </button>
                    <button
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="example@mail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white">Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                    </button>
                    <button
                      type="button"
                      className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                      onClick={() => setIsSignUp(null)}
                    >
                      Back
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
