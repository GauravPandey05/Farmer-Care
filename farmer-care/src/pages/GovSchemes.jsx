import { useEffect, useState } from "react";
import { fetchSchemes } from "../schemeUtils";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function GovSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate= useNavigate();
  

  useEffect(() => {
    const getUserDataAndSchemes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in.");

        const userRef = doc(db, "farmers", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) throw new Error("User profile not found.");

        const userInfo = userSnap.data();
        console.log("User data:", userInfo); 

        const fetchedSchemes = await fetchSchemes(userInfo);
        console.log("Fetched schemes:", fetchedSchemes); 

        setSchemes(fetchedSchemes);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserDataAndSchemes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Government Schemes</h1>

      {loading ? (
        <p className="text-gray-600">Loading schemes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : schemes.length === 0 ? (
        <p className="text-gray-600">No schemes found for your criteria.</p>
      ) : (
        <div className="space-y-6"> 
          {schemes.map((scheme, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-green-700 mb-3">{scheme.name}</h2>
              <p className="text-gray-600 mb-4">{scheme.description}</p>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => window.open("https://pmayg.nic.in/netiayHome/home.aspx", "_blank")}
              >
                Get Started
              </button>
           </div>
          ))}
        </div>

      )}
    </div>
  );
}

export default GovSchemes;
