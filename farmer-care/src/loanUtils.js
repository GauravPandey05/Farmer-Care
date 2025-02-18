import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchLoans(userInput) {
  try {
    console.log("fetchLoans called with input:", userInput);

    const userIncome = parseFloat(userInput.income) || 0;
    const userLandSize = parseFloat(userInput.landSize) || 0;
    const userState = userInput.state.trim().toLowerCase();
    
    console.log("Converted Income:", userIncome, "Converted Land Size:", userLandSize);
    console.log("User State:", userState);

    if (isNaN(userIncome) || isNaN(userLandSize)) {
      console.error("Invalid input: income and land size must be numbers");
      return [];
    }

    const loansRef = collection(db, "loans");
    const querySnapshot = await getDocs(loansRef);
    console.log(`Total loans fetched: ${querySnapshot.size}`);

    let applicableLoans = [];

    querySnapshot.forEach((doc) => {
      const loanData = doc.data();
      console.log(`Checking loan: ${loanData.name}`, loanData);

      // ✅ Income Check: Ensure userIncome is within the limit
      if (loanData.max_income != null && userIncome > loanData.max_income) {
        console.warn(`SKIPPED ${loanData.name}: Income (${userIncome}) exceeds max income (${loanData.max_income})`);
        return;
      }

      // ✅ Land Size Check
      if (loanData.max_land_size != null && userLandSize > loanData.max_land_size) {
        console.warn(`SKIPPED ${loanData.name}: Land size (${userLandSize}) exceeds max (${loanData.max_land_size})`);
        return;
      }

      // ✅ Aadhaar Requirement
      if (loanData.aadhaar_needed && !userInput.aadhaarAvailable) {
        console.warn(`SKIPPED ${loanData.name}: Aadhaar required but not available`);
        return;
      }

      // ✅ Government Employee Restriction
      if (loanData.is_govt_employee && userInput.isGovtEmployee !== true) {
        console.warn(`SKIPPED ${loanData.name}: Only for government employees`);
        return;
      }

      // ✅ State Eligibility Check
      if (
        loanData.applicable_states &&
        Array.isArray(loanData.applicable_states) &&
        !loanData.applicable_states.map(state => state.toLowerCase()).includes("all states") &&
        !loanData.applicable_states.map(state => state.toLowerCase()).includes(userState)
      ) {
        console.warn(`SKIPPED ${loanData.name}: Not available in ${userInput.state}`);
        return;
      }

      console.log(`✅ ${loanData.name} is applicable!`);
      applicableLoans.push(loanData);
    });

    console.log("Final Applicable Loans:", applicableLoans);
    return applicableLoans;
  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
}
