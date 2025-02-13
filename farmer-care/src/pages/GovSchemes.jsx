import { useEffect, useState } from "react";
import { fetchSchemes } from "../schemeUtils";

function GovSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInput = {
    category: "Agriculture",
    land_size: 10,
    income: 50000,
    aadhaar_available: true,
    is_govt_employee: false,
    state: "Odisha",
  };

  useEffect(() => {
    const getSchemes = async () => {
      try {
        const fetchedSchemes = await fetchSchemes(userInput);
        setSchemes(fetchedSchemes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSchemes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Government Schemes</h1>

      {loading ? (
        <p className="text-gray-600">Loading schemes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : schemes.length === 0 ? (
        <p className="text-gray-600">No schemes found for your criteria.</p>
      ) : (
        <div className="space-y-6">
          {schemes.map((scheme, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-green-700 mb-3">{scheme.name}</h2>
              <p className="text-gray-600 mb-4">{scheme.benefits}</p>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Benefits:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {scheme.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Eligibility:</h3>
                <p className="text-gray-600">{scheme.eligibility}</p>
              </div>

              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GovSchemes;
