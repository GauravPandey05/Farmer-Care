import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("C:/Users/Gaurav/Project/farmer-care/scripts/firestorekey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ✅ Fully Corrected Loan Data (No Loans Missing)
loans = [
    {
        "name": "Kisan Credit Card (KCC)",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 7,
        "loan_amount": 500000,
        "subsidy_available": True
    },
    {
        "name": "KALIA Scheme",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": 200000,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Odisha"],
        "interest_rate": 0,
        "loan_amount": 50000,
        "subsidy_available": True
    },
    {
        "name": "Rythu Bandhu Scheme",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Telangana"],
        "interest_rate": 0,
        "loan_amount": 400000,
        "subsidy_available": True
    },
    {
        "name": "YSR Rythu Bharosa Scheme",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": 500000,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Andhra Pradesh"],
        "interest_rate": 0,
        "loan_amount": 50000,
        "subsidy_available": True
    },
    {
        "name": "Mukhyamantri Krishi Ashirwad Yojana",
        "category": "Agriculture",
        "max_land_size": 5,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Jharkhand"],
        "interest_rate": 0,
        "loan_amount": 25000,
        "subsidy_available": True
    },
    {
        "name": "Crop Loan",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 2,
        "loan_amount": 300000,
        "subsidy_available": True
    },
    {
        "name": "Mukhya Mantri Krishi Yantra Yojana",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Madhya Pradesh"],
        "interest_rate": 3,
        "loan_amount": 500000,
        "subsidy_available": True
    },
    {
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 1.5,
        "loan_amount": 250000,
        "subsidy_available": True
    },
    {
        "name": "NABARD Rural Infrastructure Development Fund (RIDF)",
        "category": "Infrastructure",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": False,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 5,
        "loan_amount": 1000000,
        "subsidy_available": False
    },
    {
        "name": "Fisheries Loan",
        "category": "Fisheries",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 5,
        "loan_amount": 150000,
        "subsidy_available": False
    },
    {
        "name": "Prime Minister’s Employment Generation Programme (PMEGP)",
        "category": "Rural Employment",
        "max_land_size": None,
        "max_income": 500000,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 5,
        "loan_amount": 1000000,
        "subsidy_available": True
    },
    {
        "name": "Atma Nirbhar Bharat Abhiyan Loan",
        "category": "Rural Development",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 6,
        "loan_amount": 200000,
        "subsidy_available": True
    },
    {
        "name": "Krishi Pump Set Subsidy Scheme",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Bihar"],
        "interest_rate": 0,
        "loan_amount": 20000,
        "subsidy_available": True
    },
    {
        "name": "Chhattisgarh Agriculture Loan Waiver Scheme",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["Chhattisgarh"],
        "interest_rate": 0,
        "loan_amount": 100000,
        "subsidy_available": True
    },
    {
        "name": "Dairy Loans",
        "category": "Animal Husbandry",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 6,
        "loan_amount": 200000,
        "subsidy_available": False
    },
    {
        "name": "Farm Machinery Loans",
        "category": "Agriculture",
        "max_land_size": None,
        "max_income": None,
        "aadhaar_needed": True,
        "is_govt_employee": False,
        "applicable_states": ["All States"],
        "interest_rate": 5,
        "loan_amount": 85000,
        "subsidy_available": False
    }
]

# ✅ Upload Data to Firestore
for loan in loans:
    # Replace None values with defaults
    loan["interest_rate"] = loan.get("interest_rate", 5)  # Default interest rate 5%
    loan["loan_amount"] = loan.get("loan_amount", 1000)  # Default minimum ₹1000

    db.collection("loans").add(loan)

print("✅ All loan data uploaded successfully!")