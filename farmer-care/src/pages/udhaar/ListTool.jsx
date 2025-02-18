import { useState } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function ListTool() {
  const [formData, setFormData] = useState({
    toolName: "",
    description: "",
    rentalFee: "",
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const user = auth.currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTool = async () => {
    if (!user) return;
  
    try {
      
      const farmerRef = doc(db, "farmers", user.uid);
      const farmerSnap = await getDoc(farmerRef);
      let contactNumber = "";
      
      if (farmerSnap.exists()) {
        contactNumber = farmerSnap.data().contactNumber || ""; 
      }
  
      
      await addDoc(collection(db, "tools"), {
        owner: user.uid,
        toolName: formData.toolName,
        description: formData.description,
        rentalFee: formData.rentalFee,
        availableDates: startDate && endDate
          ? `${format(startDate, "dd MMM yyyy")} - ${format(endDate, "dd MMM yyyy")}`
          : "all season",
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        status: "Available",
        borrower: null,
        contactNumber: contactNumber,
      });
  
      setFormData({ toolName: "", description: "", rentalFee: "" });
      setDateRange([null, null]);
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">List Your Tool</h2>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          name="toolName"
          placeholder="Tool Name"
          value={formData.toolName}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="mb-3">
          <label className="block text-gray-700 mb-2">Available Dates</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            isClearable={true}
            placeholderText="Select date range (leave blank for all season)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            dateFormat="dd MMM yyyy"
            minDate={new Date()}
          />
        </div>
        <input
          type="number"
          name="rentalFee"
          placeholder="Rental Fee (₹)"
          value={formData.rentalFee}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTool}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Tool
        </button>
      </div>
    </div>
  );
}

export default ListTool;
