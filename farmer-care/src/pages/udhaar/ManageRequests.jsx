import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDoc 
} from "firebase/firestore";
import ToolCard from "./ToolCard";

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [tools, setTools] = useState({});
  const [borrowers, setBorrowers] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;

      // ✅ Fetch requests where user is the lender
      const lenderQuery = query(
        collection(db, "borrowRequests"), 
        where("lenderId", "==", user.uid)
      );
      const lenderSnapshot = await getDocs(lenderQuery);
      const lenderRequests = lenderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // ✅ Fetch requests where user is the borrower
      const borrowerQuery = query(
        collection(db, "borrowRequests"), 
        where("borrowerId", "==", user.uid)
      );
      const borrowerSnapshot = await getDocs(borrowerQuery);
      const borrowerRequests = borrowerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // ✅ Combine both lender and borrower requests
      let fetchedRequests = [...lenderRequests, ...borrowerRequests];

      // Fetch tools to verify they exist
      const toolsSnapshot = await getDocs(collection(db, "tools"));
      const toolsData = toolsSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = { id: doc.id, ...doc.data() };
        return acc;
      }, {});

      // Filter requests to only include those where the tool still exists
      fetchedRequests = fetchedRequests.filter(req => toolsData[req.toolId]);

      setRequests(fetchedRequests);
      setTools(toolsData);

      // Fetch borrower details
      let borrowerData = {};
      for (const req of fetchedRequests) {
        if (req.borrowerId && !borrowerData[req.borrowerId]) {
          const borrowerRef = doc(db, "farmers", req.borrowerId);
          const borrowerSnap = await getDoc(borrowerRef);
          if (borrowerSnap.exists()) {
            borrowerData[req.borrowerId] = borrowerSnap.data().name || "Unknown";
          } else {
            borrowerData[req.borrowerId] = "Unknown";
          }
        }
      }
      setBorrowers(borrowerData);
    };

    fetchRequests();
  }, [user]);

  const handleUpdateStatus = async (requestId, status) => {
    await updateDoc(doc(db, "borrowRequests", requestId), { status });
    setRequests((prev) => prev.map(req => req.id === requestId ? { ...req, status } : req));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Requests</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm border">
              {tools[req.toolId] && (
                <ToolCard 
                  tool={{ ...tools[req.toolId], contactNumber: req.borrowerContact }} 
                  showContact={true} 
                />
              )}
              <p className="text-gray-600 font-semibold">Borrower: {borrowers[req.borrowerId] || "Unknown"}</p>
              <p className="text-gray-600">Requested Dates: {req.dates}</p>
              <p className="text-gray-500 text-sm">Requested on: {new Date(req.requestedAt).toLocaleDateString()}</p>
              <p className="text-gray-600">Status: <span className="font-semibold">{req.status}</span></p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleUpdateStatus(req.id, "Approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateStatus(req.id, "Rejected")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No requests found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageRequests;
