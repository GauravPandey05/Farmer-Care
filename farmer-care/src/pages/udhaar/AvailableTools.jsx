import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, query, where, doc, getDoc, addDoc } from "firebase/firestore";
import ToolCard from "./ToolCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function AvailableTools() {
  const [tools, setTools] = useState([]);
  const [approvedTools, setApprovedTools] = useState({});
  const [dateRanges, setDateRanges] = useState({}); // Store selected dates for each tool
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTools = async () => {
      const toolsSnapshot = await getDocs(collection(db, "tools"));
      setTools(toolsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchApprovedRequests = async () => {
      if (!user) return;

      const requestsQuery = query(
        collection(db, "borrowRequests"),
        where("borrowerId", "==", user.uid),
        where("status", "==", "Approved")
      );

      const requestsSnapshot = await getDocs(requestsQuery);
      let approvedData = {};

      for (const requestDoc of requestsSnapshot.docs) {
        const requestData = requestDoc.data();
        const toolId = requestData.toolId;
        const lenderId = requestData.lenderId;

        if (!lenderId) continue; // Safety check

        // Fetch lender's contact number from the `farmers` collection
        const lenderRef = doc(db, "farmers", lenderId);
        const lenderSnap = await getDoc(lenderRef);

        if (lenderSnap.exists()) {
          const lenderData = lenderSnap.data();
          approvedData[toolId] = lenderData.contactNumber || "N/A";
        } else {
          approvedData[toolId] = "N/A"; // Default if lender data not found
        }
      }

      setApprovedTools(approvedData);
    };

    fetchTools();
    fetchApprovedRequests();
  }, [user]);

  const handleRequestTool = async (tool) => {
    if (!user) {
      alert("Please log in to request a tool.");
      return;
    }

    const [startDate, endDate] = dateRanges[tool.id] || [null, null];

    if (!startDate || !endDate) {
      alert("Please select a borrowing date range.");
      return;
    }

    const requestData = {
      borrowerId: user.uid,
      toolId: tool.id,
      lenderId: tool.lenderId || "unknown", // Ensure lenderId is available
      status: "Pending",
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    };

    try {
      await addDoc(collection(db, "borrowRequests"), requestData);
      alert(`Request sent for ${tool.toolName}!`);
    } catch (error) {
      console.error("Error requesting tool:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Tools</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <div key={tool.id} className="mb-6">
              <ToolCard 
                tool={{ ...tool, contactNumber: approvedTools[tool.id] || "N/A" }} 
                showContact={!!approvedTools[tool.id]} 
              />
              <div className="mt-3">
                <label className="block text-gray-700 mb-2">Select Borrowing Dates</label>
                <DatePicker
                  selectsRange={true}
                  startDate={dateRanges[tool.id]?.[0] || null}
                  endDate={dateRanges[tool.id]?.[1] || null}
                  onChange={(update) => setDateRanges((prev) => ({ ...prev, [tool.id]: update }))}
                  isClearable={true}
                  placeholderText="Select date range"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  dateFormat="dd MMM yyyy"
                  required
                />
              </div>
              <button
                onClick={() => handleRequestTool(tool)}
                className="mt-3 w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg 
                          hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Request {tool.toolName}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tools available.</p>
        )}
      </div>
    </div>
  );
}

export default AvailableTools;
