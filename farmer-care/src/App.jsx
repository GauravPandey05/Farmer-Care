import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoanSchemes from "./pages/LoanSchemes";
import CropRecommendations from "./pages/CropRecommendations";
import GovSchemes from "./pages/GovSchemes";
import Register from "./Register";
import Profile from "./Profile";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const profileRef = doc(db, "farmers", currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        setUser({
          ...currentUser,
          profileExists: profileSnap.exists(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <Router>
      {user && <Navbar onLogout={handleSignOut} />}
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to={user.profileExists ? "/dashboard" : "/register"} />} />
        <Route path="/register" element={user ? <Register user={user} /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
        <Route path="/loan-schemes" element={user ? <LoanSchemes /> : <Navigate to="/" />} />
        <Route path="/crop-recommendations" element={user ? <CropRecommendations /> : <Navigate to="/" />} />
        <Route path="/gov-schemes" element={user ? <GovSchemes /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
