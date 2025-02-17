import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

function LoanSchemes() {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, "farmers", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      setUser(userData);
      await fetchAndRankLoans(userData);
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const fetchAndRankLoans = async (userData) => {
    const loansRef = collection(db, "loans");
    const loanDocs = await getDocs(loansRef);
    let applicableLoans = [];

    loanDocs.forEach((loan) => {
      const loanData = loan.data();
      loanData.id = loan.id; // Ensure each loan has a unique ID

      // Updated condition to handle "All States"
      if (
        (loanData.max_land_size && userData.land_size > loanData.max_land_size) ||
        (loanData.max_income && userData.income > loanData.max_income) ||
        (loanData.aadhaar_needed && !userData.aadhaar_available) ||
        (loanData.is_govt_employee && userData.is_govt_employee) ||
        (loanData.applicable_states &&
          !loanData.applicable_states.includes("All States") && // "All States" condition
          !loanData.applicable_states.includes(userData.state)) // User state check
      ) {
        return; // Skip the loan if it doesn't meet criteria
      }

      const profitabilityScore =
        loanData.interest_rate > 0
          ? loanData.loan_amount / loanData.interest_rate
          : Infinity;

      applicableLoans.push({ ...loanData, profitability_score: profitabilityScore });
    });

    // Sort loans based on profitability score
    applicableLoans.sort((a, b) => b.profitability_score - a.profitability_score);

    // Set loans to state after sorting
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
                <p><span className="font-medium">Profitability Score:</span> {loan.profitability_score.toFixed(2)}</p>
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
