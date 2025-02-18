import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

function LoanSchemes() {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("Fetching user profile...");
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.warn("No user found. Exiting.");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "farmers", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.warn("User profile not found in Firestore.");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      console.log("User profile fetched:", userData);
      setUser(userData);
      await fetchAndRankLoans(userData);
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const fetchAndRankLoans = async (userData) => {
    console.log("Fetching loans from Firestore...");
    const loansRef = collection(db, "loans");
    const loanDocs = await getDocs(loansRef);
    let applicableLoans = [];

    console.log(`Total loans fetched: ${loanDocs.size}`);

    loanDocs.forEach((loan) => {
      const loanData = loan.data();
      loanData.id = loan.id;

      console.log(`Checking loan: ${loanData.name}`);

      if (
        (loanData.max_land_size && userData.land_size > loanData.max_land_size) ||
        (loanData.max_income && userData.income > loanData.max_income) ||
        (loanData.aadhaar_needed && !userData.aadhaar_available) ||
        (loanData.is_govt_employee && userData.is_govt_employee) ||
        (loanData.applicable_states &&
          !loanData.applicable_states.includes("All States") &&
          !loanData.applicable_states.includes(userData.state))
      ) {
        console.warn(`Skipping ${loanData.name} due to eligibility criteria.`);
        return;
      }

      applicableLoans.push(loanData);
    });

    console.log("Final applicable loans:", applicableLoans);
    setLoans(applicableLoans);
  };

  if (loading) return <h2 className="text-center text-2xl font-semibold text-green-600">Loading...</h2>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Loan Schemes</h1>

      {loans.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-green-700 mb-3">{loan.name}</h2>
              <p className="text-gray-600 mb-4">{loan.description || "No description available."}</p>
              <div className="space-y-2">
                <p><span className="font-medium">Interest Rate:</span> {loan.interest_rate ? `${loan.interest_rate}%` : "N/A"}</p>
                <p><span className="font-medium">Maximum Amount:</span> ₹{loan.loan_amount || "N/A"}</p>
              </div>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center text-xl font-semibold">No applicable loans found.</p>
      )}
    </div>
  );
}

export default LoanSchemes;
