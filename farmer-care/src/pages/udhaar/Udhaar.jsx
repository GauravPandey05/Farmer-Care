import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ListTool from "./ListTool";
import AvailableTools from "./AvailableTools";
import ManageRequests from "./ManageRequests";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./index.css";


function Udhaar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [featuredTools, setFeaturedTools] = useState([]);

  useEffect(() => {
    const fetchFeaturedTools = async () => {
      const toolsSnapshot = await getDocs(collection(db, "tools"));
      const allTools = toolsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeaturedTools(allTools.slice(0, 3));
    };
    fetchFeaturedTools();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar Menu */}
      <div className={`bg-gray-800 text-white w-64 p-4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-bold mb-4">UDHAAR Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/udhaar/list-tool" className="hover:bg-gray-700 p-2 rounded">List Tool</Link>
          <Link to="/udhaar/available-tools" className="hover:bg-gray-700 p-2 rounded">Available Tools</Link>
          <Link to="/udhaar/manage-requests" className="hover:bg-gray-700 p-2 rounded">Manage Requests</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="list-tool" element={<ListTool />} />
          <Route path="available-tools" element={<AvailableTools />} />
          <Route path="manage-requests" element={<ManageRequests />} />

          {/* Default Landing Page */}
          <Route
            path="/"
            element={
              <div className="bg-white p-6 shadow-md rounded-md text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to UDHAAR</h1>
                <p className="text-gray-600 mb-6">
                  A platform where farmers can lend and borrow harvesting tools with ease.
                </p>
                
                {/* Quick Actions */}
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <Link to="/udhaar/list-tool" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    List Your Tool
                  </Link>
                  <Link to="/udhaar/available-tools" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Borrow a Tool
                  </Link>
                </div>

                {/* Featured Tools Section */}
                {featuredTools.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">Featured Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {featuredTools.map((tool) => (
                        <div key={tool.id} className="border p-3 rounded shadow-md">
                          <p className="font-bold">{tool.toolName}</p>
                          <p className="text-gray-600">{tool.description}</p>
                          <p className="text-green-700 font-semibold">₹{tool.rentalFee}/day</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Udhaar;