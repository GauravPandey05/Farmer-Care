import { useState, useEffect } from "react";
import { fetchLoans } from "../loanUtils";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function LoanSchemes() {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "farmers", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData);
          const recommendedLoans = await fetchLoans(userData);
          setLoans(recommendedLoans);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  if (loading) return <h2 className="text-center text-2xl font-semibold text-green-600">Loading...</h2>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Loan Schemes</h1>

      {loans.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
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
