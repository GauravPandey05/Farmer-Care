import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    landSize: "",
    crops: "",
    income: "",
    aadhaarAvailable: false,
    aadhaarNumber: "",
    isGovtEmployee: false,
    state: "",
    contactNumber: ""
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async () => {
      try {
        const userProfileRef = doc(db, "farmers", user.uid);
        const docSnap = await getDoc(userProfileRef);

        if (docSnap.exists()) {
          setFormData(prev => ({
            ...prev,
            ...docSnap.data(),
            contactNumber: docSnap.data().contactNumber || ""
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "aadhaarNumber" && !/^\d{0,12}$/.test(value)) return;
    if (name === "contactNumber" && !/^\d{0,10}$/.test(value)) return; 


    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordChange = async () => {
    if (!user || !password) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    try {
      setPasswordUpdating(true);
      await updatePassword(auth.currentUser, password);
      alert("Password updated successfully!");
      setPassword("");
      setPasswordError("");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.code === "auth/requires-recent-login") {
        setPasswordError("Please re-login and try again.");
      } else {
        setPasswordError("Failed to update password. Please try again.");
      }
    }
    setPasswordUpdating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in");
      return;
    }

    try {
      setUpdating(true);
      await setDoc(doc(db, "farmers", user.uid), formData, { merge: true });
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Try again.");
    }
    setUpdating(false);
  };

  if (loading) return <h2 className="text-center text-gray-700 font-semibold">Loading Profile...</h2>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Update Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Enter full name" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white"
            value={formData.name} onChange={handleChange} required />

          <input type="number" name="landSize" placeholder="Enter land size(acres)" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white"
            value={formData.landSize} onChange={handleChange} required />

          <input type="text" name="crops" placeholder="Enter crops grown" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white"
            value={formData.crops} onChange={handleChange} required />

          <input type="number" name="income" placeholder="Enter annual income" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white"
            value={formData.income} onChange={handleChange} required />

          <select name="state" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 text-black bg-white" value={formData.state} onChange={handleChange} required>
            <option value="" disabled className="text-gray-500">Select State/UT</option>
            {indianStatesAndUTs.map((stateName, index) => (
              <option key={index} value={stateName} className="text-black">
                {stateName}
              </option>
            ))}
          </select>

          <input 
            type="text" 
            name="contactNumber" 
            placeholder="Enter contact number" 
            className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white" 
            value={formData.contactNumber} 
            onChange={handleChange} 
            required 
          />


          <div className="flex items-center space-x-2">
            <input type="checkbox" name="aadhaarAvailable" checked={formData.aadhaarAvailable} onChange={handleChange} className="w-5 h-5 accent-green-600" />
            <span className="text-gray-900 font-semibold">Aadhaar Available</span>
          </div>

          <input type="text" name="aadhaarNumber" placeholder="Enter Aadhaar number" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white disabled:opacity-50"
            value={formData.aadhaarNumber} onChange={handleChange} disabled={!formData.aadhaarAvailable} />

          <div className="flex items-center space-x-2">
            <input type="checkbox" name="isGovtEmployee" checked={formData.isGovtEmployee} onChange={handleChange} className="w-5 h-5 accent-green-600" />
            <span className="text-gray-900 font-semibold">Government Employee</span>
          </div>

          <button type="submit" disabled={updating} className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition">
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">Change Password</h2>
        <input type="password" placeholder="Enter new password" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-black bg-white mt-2"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handlePasswordChange} disabled={passwordUpdating} className="w-full mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          {passwordUpdating ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
