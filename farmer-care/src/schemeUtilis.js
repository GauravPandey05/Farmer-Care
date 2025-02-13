import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchSchemes = async (userInput) => {
  try {
    const schemesRef = collection(db, "schemes");
    const snapshot = await getDocs(schemesRef);
    const matchedSchemes = [];

    snapshot.forEach((doc) => {
      const schemeData = doc.data();
      const eligibility = schemeData.eligibility_criteria || {};

      // Apply filtering logic based on userInput
      if (
        (eligibility.land_size_limit && userInput.land_size > eligibility.land_size_limit) ||
        (eligibility.income_limit && userInput.income > eligibility.income_limit) ||
        (eligibility.aadhaar_required && !userInput.aadhaar_available) ||
        (eligibility.govt_employee_restricted && userInput.is_govt_employee) ||
        (userInput.state &&
          !schemeData.applicable_states.includes(userInput.state) &&
          !schemeData.applicable_states.includes("All"))
      ) {
        return; // Skip ineligible schemes
      }

      matchedSchemes.push(schemeData);
    });

    return matchedSchemes;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    throw new Error("Failed to fetch government schemes.");
  }
};
