import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoanSchemes from "./pages/LoanSchemes";
import CropRecommendations from "./pages/CropRecommendations";
import GovSchemes from "./pages/GovSchemes";
import Profile from "./Profile";
import Udhaar from "./pages/udhaar/Udhaar";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profileRef = doc(db, "farmers", currentUser.uid);
          const profileSnap = await getDoc(profileRef);
          setProfileExists(profileSnap.exists());
        } catch (error) {
          console.error("Error checking profile:", error);
          setProfileExists(false);
        }
      } else {
        setProfileExists(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfileExists(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-gray-700 font-semibold text-xl">Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      {user && <Navbar onLogout={handleSignOut} />}
      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : profileExists ? <Navigate to="/dashboard" replace /> : <Navigate to="/profile" replace />}
        />
        <Route
          path="/home"
          element={!user ? <Home /> : profileExists ? <Navigate to="/dashboard" replace /> : <Navigate to="/profile" replace />}
        />
        <Route
          path="/dashboard"
          element={user && profileExists ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/loan-schemes"
          element={user && profileExists ? <LoanSchemes /> : <Navigate to="/" replace />}
        />
        <Route
          path="/crop-recommendations"
          element={user && profileExists ? <CropRecommendations /> : <Navigate to="/" replace />}
        />
        <Route
          path="/gov-schemes"
          element={user && profileExists ? <GovSchemes /> : <Navigate to="/" replace />}
        />
        {/* ✅ Added Udhaar Route */}
        <Route
          path="/udhaar/*"
          element={user && profileExists ? <Udhaar /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
