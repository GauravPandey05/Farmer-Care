import { useState } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

function ListTool() {
  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [rentalFee, setRentalFee] = useState("");
  const user = auth.currentUser;

  const handleAddTool = async () => {
    if (!user) return;
    try {
      await addDoc(collection(db, "tools"), {
        owner: user.uid,
        toolName,
        description,
        availableDates,
        rentalFee,
        status: "Available",
        borrower: null,
      });
      setToolName("");
      setDescription("");
      setAvailableDates("");
      setRentalFee("");
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  return (
    <div>
      <h2>List Your Tool</h2>
      <input type="text" placeholder="Tool Name" value={toolName} onChange={(e) => setToolName(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Available Dates" value={availableDates} onChange={(e) => setAvailableDates(e.target.value)} />
      <input type="text" placeholder="Rental Fee" value={rentalFee} onChange={(e) => setRentalFee(e.target.value)} />
      <button onClick={handleAddTool}>Add Tool</button>
    </div>
  );
}
export default ListTool;