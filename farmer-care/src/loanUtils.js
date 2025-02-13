import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchLoans(userInput) {
  try {
    const loansRef = collection(db, "loans");
    const querySnapshot = await getDocs(loansRef);
    let applicableLoans = [];

    querySnapshot.forEach((doc) => {
      const loanData = doc.data();

      // Debugging: Log each loan being checked
      console.log(`Checking loan: ${loanData.name}`);

      // Land size restriction
      if (loanData.max_land_size !== undefined && userInput.land_size > loanData.max_land_size) {
        console.log(`Skipping ${loanData.name}: Land size exceeds ${loanData.max_land_size}`);
        return;
      }

      // Income restriction
      if (loanData.max_income !== undefined && userInput.income > loanData.max_income) {
        console.log(`Skipping ${loanData.name}: Income exceeds ${loanData.max_income}`);
        return;
      }

      // Aadhaar requirement
      if (loanData.aadhaar_needed && !userInput.aadhaar_available) {
        console.log(`Skipping ${loanData.name}: Aadhaar required but not available`);
        return;
      }

      // Government employee restriction
      if (loanData.is_govt_employee && userInput.is_govt_employee) {
        console.log(`Skipping ${loanData.name}: Govt employees not eligible`);
        return;
      }

      // State eligibility
      if (
        loanData.applicable_states &&
        Array.isArray(loanData.applicable_states) &&
        !loanData.applicable_states.includes("All") &&
        !loanData.applicable_states.includes(userInput.state)
      ) {
        console.log(`Skipping ${loanData.name}: Not available in ${userInput.state}`);
        return;
      }

      // If all checks pass, add loan to list
      applicableLoans.push(loanData);
    });

    return applicableLoans;
  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
}
