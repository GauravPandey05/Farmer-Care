import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate, useLocation } from "react-router-dom";

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const cropsList = ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton", "Pulses", "Soybean", "Tea", "Coffee", "Jute"];

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    name: "",
    landSize: "",
    crops: [],
    income: "",
    aadhaarAvailable: false,
    aadhaarNumber: "",
    isGovtEmployee: false,
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); 

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "farmers", user.uid));
        if (userDoc.exists() && !dataFetched) {
          setFormData((prev) => ({
            ...prev,
            ...userDoc.data(),
          }));
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (!dataFetched) fetchUserProfile();
  }, [user, navigate, dataFetched]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCropSelection = (crop) => {
    setFormData((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop)
        ? prev.crops.filter((c) => c !== crop)
        : [...prev.crops, crop],
    }));
  };

  const isValidAadhaar = (number) => /^\d{12}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in");
      return;
    }

    if (formData.landSize <= 0 || formData.income < 0) {
      alert("Land size and income must be positive numbers.");
      return;
    }

    if (formData.aadhaarAvailable && !isValidAadhaar(formData.aadhaarNumber)) {
      alert("Aadhaar number must be exactly 12 digits.");
      return;
    }

    const userProfile = {
      uid: user.uid,
      name: formData.name,
      phone: user.phoneNumber || "N/A",
      land_size: parseFloat(formData.landSize),
      crops: formData.crops,
      income: parseFloat(formData.income),
      aadhaar_available: formData.aadhaarAvailable,
      aadhaar_number: formData.aadhaarAvailable ? formData.aadhaarNumber : null,
      is_govt_employee: formData.isGovtEmployee,
      state: formData.state,
    };

    try {
      setLoading(true);
      await setDoc(doc(db, "farmers", user.uid), userProfile);
      sessionStorage.setItem("userData", JSON.stringify(userProfile));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-xl font-bold">Complete Your Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="border p-2 rounded w-full my-2"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="landSize"
        placeholder="Land Size (in acres)"
        className="border p-2 rounded w-full my-2"
        value={formData.landSize}
        onChange={handleChange}
        required
      />

      <p className="text-gray-700 mt-2">Select Crops Grown:</p>
      <div className="flex flex-wrap">
        {cropsList.map((crop) => (
          <label key={crop} className="mr-4">
            <input
              type="checkbox"
              checked={formData.crops.includes(crop)}
              onChange={() => handleCropSelection(crop)}
            />
            {crop}
          </label>
        ))}
      </div>

      <input
        type="number"
        name="income"
        placeholder="Annual Income (₹)"
        className="border p-2 rounded w-full my-2"
        value={formData.income}
        onChange={handleChange}
        required
      />

      <select
        name="state"
        className="border p-2 rounded w-full my-2"
        value={formData.state}
        onChange={handleChange}
        required
      >
        <option value="">Select State/UT</option>
        {indianStatesAndUTs.map((stateName, index) => (
          <option key={index} value={stateName}>
            {stateName}
          </option>
        ))}
      </select>

      <label className="flex items-center space-x-2 my-2">
        <input type="checkbox" name="aadhaarAvailable" checked={formData.aadhaarAvailable} onChange={handleChange} />
        <span>Aadhaar Available</span>
      </label>

      {formData.aadhaarAvailable && (
        <input
          type="text"
          name="aadhaarNumber"
          placeholder="Enter Aadhaar Number (12 digits)"
          className="border p-2 rounded w-full my-2"
          value={formData.aadhaarNumber}
          onChange={handleChange}
          required
        />
      )}

      <label className="flex items-center space-x-2 my-2">
        <input type="checkbox" name="isGovtEmployee" checked={formData.isGovtEmployee} onChange={handleChange} />
        <span>Government Employee</span>
      </label>

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Register;
