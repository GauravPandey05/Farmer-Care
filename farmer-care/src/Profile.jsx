import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

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
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const fetchUserProfile = async () => {
      try {
        const userProfileRef = doc(db, "farmers", user.uid);
        const docSnap = await getDoc(userProfileRef);
        
        if (docSnap.exists()) {
          setFormData(prev => ({
            ...prev,
            ...docSnap.data()
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
          <label className="block font-semibold text-gray-800">Full Name</label>
          <input type="text" name="name" placeholder="Enter your name" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500"
            value={formData.name} onChange={handleChange} required />

          <label className="block font-semibold text-gray-800">Land Size (in acres)</label>
          <input type="number" name="landSize" placeholder="Enter land size" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500"
            value={formData.landSize} onChange={handleChange} required />

          <label className="block font-semibold text-gray-800">Crops Grown</label>
          <input type="text" name="crops" placeholder="Comma-separated crops" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500"
            value={formData.crops} onChange={handleChange} required />

          <label className="block font-semibold text-gray-800">Annual Income (₹)</label>
          <input type="number" name="income" placeholder="Enter income" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500"
            value={formData.income} onChange={handleChange} required />

          <label className="block font-semibold text-gray-800">State/UT</label>
          <select name="state" className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500" value={formData.state} onChange={handleChange} required>
            <option value="">Select State/UT</option>
            {indianStatesAndUTs.map((stateName, index) => (
              <option key={index} value={stateName}>{stateName}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <input type="checkbox" name="aadhaarAvailable" checked={formData.aadhaarAvailable} onChange={handleChange} className="w-5 h-5" />
            <span className="text-gray-900 font-semibold">Aadhaar Available</span>
          </div>

          <input type="text" name="aadhaarNumber" placeholder="Enter Aadhaar Number (12 digits)"
            className="border border-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            value={formData.aadhaarNumber} onChange={handleChange} required={formData.aadhaarAvailable}
            disabled={!formData.aadhaarAvailable} />

          <div className="flex items-center space-x-2">
            <input type="checkbox" name="isGovtEmployee" checked={formData.isGovtEmployee} onChange={handleChange} className="w-5 h-5" />
            <span className="text-gray-900 font-semibold">Government Employee</span>
          </div>

          <button type="submit" disabled={updating} className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition">
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
