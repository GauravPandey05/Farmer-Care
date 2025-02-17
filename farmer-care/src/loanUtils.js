import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchLoans(userInput) {
  try {
    const loansRef = collection(db, "loans");
    const querySnapshot = await getDocs(loansRef);
    let applicableLoans = [];

    // Convert income and landSize to numbers for correct comparison
    const userIncome = parseFloat(userInput.income);
    const userLandSize = parseFloat(userInput.landSize);

    if (isNaN(userIncome) || isNaN(userLandSize)) {
      console.error("Invalid input: income and land size must be numbers");
      return [];
    }

    querySnapshot.forEach((doc) => {
      const loanData = doc.data();

      console.log(`Checking loan: ${loanData.name}`);

      // Land size restriction
      if (loanData.max_land_size != null && userLandSize > loanData.max_land_size) {
        console.log(`Skipping ${loanData.name}: Land size exceeds ${loanData.max_land_size}`);
        return;
      }

      // Income restriction
      if (loanData.max_income != null && userIncome > loanData.max_income) {
        console.log(`Skipping ${loanData.name}: Income exceeds ${loanData.max_income}`);
        return;
      }

      // Aadhaar requirement (if the loan needs Aadhaar but the user doesn't have it)
      if (loanData.aadhaar_needed && !userInput.aadhaar_available) {
        console.log(`Skipping ${loanData.name}: Aadhaar required but not available`);
        return;
      }

      // Government employee restriction (if loan is for government employees)
      if (loanData.is_govt_employee && !userInput.isGovtEmployee) {
        console.log(`Skipping ${loanData.name}: Loan available only for govt employees`);
        return;
      }

      // State eligibility (handling "All States" as a valid condition)
      if (
        loanData.applicable_states &&
        Array.isArray(loanData.applicable_states) &&
        !loanData.applicable_states.includes("All States") &&
        !loanData.applicable_states.includes(userInput.state)
      ) {
        console.log(`Skipping ${loanData.name}: Not available in ${userInput.state}`);
        return;
      }

      // Calculate profitability score (optional but useful for ranking)
      const profitabilityScore =
        loanData.interest_rate > 0
          ? loanData.loan_amount / loanData.interest_rate
          : loanData.loan_amount;

      // Add profitability score and loan to the list
      applicableLoans.push({
        ...loanData,
        profitability_score: profitabilityScore,
      });
    });

    // Sort loans based on profitability score (descending order)
    applicableLoans.sort((a, b) => b.profitability_score - a.profitability_score);

    if (applicableLoans.length === 0) {
      console.log("No loans found matching your criteria.");
    }

    console.log(`Applicable Loans: ${JSON.stringify(applicableLoans)}`);
    return applicableLoans;
  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
}
