import { useState, useEffect } from "react"; 
import Papa from "papaparse";

function CropRecommendations() {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [conditions, setConditions] = useState({ soil: "", rainfall: "" });
  const [soilTypes, setSoilTypes] = useState([]);

  useEffect(() => {
    fetch("/crop_yield_100.csv")
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            console.log("CSV Data Loaded:", result.data);
            if (result.data.length > 0) {
              setCrops(result.data);
              
              // Extract unique soil types correctly
              const uniqueSoils = [...new Set(result.data.map(crop => crop["Soil_Type"]).filter(Boolean))];
              setSoilTypes(uniqueSoils);
            }
          },
        });
      })
      .catch(error => console.error("Error loading CSV:", error));
  }, []);

  const handleFilter = () => {
    const { soil, rainfall } = conditions;
    const filtered = crops.filter(crop =>
      (!soil || crop["Soil_Type"] === soil) &&
      (!rainfall || (crop["Annual_Rainfall"] >= parseFloat(rainfall)))
    );
    console.log("Filtered Crops:", filtered); // Debugging Log
    setFilteredCrops(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Crop Recommendations</h1>
      
      <div className="mb-4 w-full max-w-md">
        <label className="block text-lg font-semibold text-black">Soil Type:</label>
        <select
          value={conditions.soil}
          onChange={(e) => setConditions({ ...conditions, soil: e.target.value })}
          className="border p-2 rounded w-full bg-white text-black"
        >
          <option value="">Any</option>
          {soilTypes.length > 0 ? (
            soilTypes.map((soil, index) => (
              <option key={index} value={soil}>{soil}</option>
            ))
          ) : (
            <option disabled>Loading soil types...</option>
          )}
        </select>
      </div>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-lg font-semibold text-black">Minimum Rainfall (mm):</label>
        <input
          type="number"
          value={conditions.rainfall}
          onChange={(e) => setConditions({ ...conditions, rainfall: e.target.value })}
          className="border p-2 rounded w-full bg-white text-black"
        />
      </div>

      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700 w-full max-w-md"
      >
        Get Recommendations
      </button>

      <button
        onClick={() => { setFilteredCrops([]); setConditions({ soil: "", rainfall: "" }); }}
        className="px-4 py-2 mt-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700 w-full max-w-md"
      >
        Reset
      </button>

      <div className="mt-6 w-full max-w-md">
        {filteredCrops.length > 0 ? (
          <ul className="space-y-2">
            {filteredCrops.map((crop, index) => {
              console.log("Rendering Crop:", crop); // Debugging Log
              return (
                <li key={index} className="p-4 bg-gray-200 shadow-md rounded-lg border">
                  <strong className="text-black">{crop?.Crop || "Unknown Crop"}</strong> 
                  <p className="text-black">Soil Type: {crop?.Soil_Type || "N/A"}</p>
                  <p className="text-black">Rainfall: {crop?.Annual_Rainfall ? `${crop.Annual_Rainfall} mm` : "N/A"}</p>
                  <p className="text-black">Yield: {crop?.Yield || "N/A"}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600 mt-4">No crops match your criteria.</p>
        )}
      </div>

    </div>
  );
}

export default CropRecommendations;
