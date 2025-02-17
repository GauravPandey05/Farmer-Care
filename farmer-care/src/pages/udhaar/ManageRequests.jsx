import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      const q = query(collection(db, "borrowRequests"), where("lenderId", "==", user.uid));
      const requestsSnapshot = await getDocs(q);
      setRequests(requestsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchRequests();
  }, [user]);

  const handleUpdateStatus = async (requestId, status) => {
    await updateDoc(doc(db, "borrowRequests", requestId), { status });
  };

  return (
    <div>
      <h2>Manage Requests</h2>
      {requests.map((req) => (
        <div key={req.id}>
          <p>Tool ID: {req.toolId}</p>
          <p>Status: {req.status}</p>
          <button onClick={() => handleUpdateStatus(req.id, "Approved")}>Approve</button>
          <button onClick={() => handleUpdateStatus(req.id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
export default ManageRequests;