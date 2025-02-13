import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function AuthHandler({ children }) {
  const [user, setUser] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const profileRef = doc(db, "farmers", currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        setProfileExists(profileSnap.exists());
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfileExists(false);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {user && <Navbar onLogout={handleSignOut} />}
      {children}
      {user && <Footer />}
    </>
  );
}
