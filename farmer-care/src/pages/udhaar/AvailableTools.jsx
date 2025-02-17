import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function AvailableTools() {
  const [tools, setTools] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTools = async () => {
      const toolsSnapshot = await getDocs(collection(db, "tools"));
      setTools(toolsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchTools();
  }, []);

  const handleRequest = async (toolId, lenderId) => {
    if (!user) return;
    await addDoc(collection(db, "borrowRequests"), {
      toolId,
      lenderId,
      borrowerId: user.uid,
      status: "Pending",
    });
  };

  return (
    <div>
      <h2>Available Tools</h2>
      {tools.map((tool) => (
        <div key={tool.id}>
          <p>{tool.toolName}</p>
          <button onClick={() => handleRequest(tool.id, tool.owner)}>Request Tool</button>
        </div>
      ))}
    </div>
  );
}
export default AvailableTools;