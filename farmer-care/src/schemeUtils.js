import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchSchemes = async (userInput) => {
  try {
    const snapshot = await getDocs(collection(db, "schemes"));
    const schemes = [];

    snapshot.forEach((doc) => {
      const schemeData = doc.data();
      const eligibility = schemeData.eligibility_criteria || {};

      if (
        (eligibility.land_size_limit && userInput.land_size > eligibility.land_size_limit) ||
        (eligibility.income_limit && userInput.income > eligibility.income_limit) ||
        (eligibility.aadhaar_required && !userInput.aadhaar_available) ||
        (eligibility.govt_employee_restricted && userInput.is_govt_employee) ||
        (!schemeData.applicable_states || // Fixed to prevent errors
          (!schemeData.applicable_states.includes(userInput.state) &&
            !schemeData.applicable_states.includes("All")))
      ) {
        return; // Skip ineligible schemes
      }

      schemes.push(schemeData);
    });

    console.log("Eligible Schemes:", schemes); // Debugging log
    return schemes;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return []; // Return empty array instead of throwing an error
  }
};
