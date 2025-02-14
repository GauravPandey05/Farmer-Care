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
      setUser(currentUser);
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Router>
      {user && <Navbar onLogout={handleSignOut} />}
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" replace />} />
        <Route path="/loan-schemes" element={user ? <LoanSchemes /> : <Navigate to="/" replace />} />
        <Route path="/crop-recommendations" element={user ? <CropRecommendations /> : <Navigate to="/" replace />} />
        <Route path="/gov-schemes" element={user ? <GovSchemes /> : <Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/profile" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
