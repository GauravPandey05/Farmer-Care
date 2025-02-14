import { useState, useEffect } from "react";
import Papa from "papaparse";

function CropRecommendations() {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [conditions, setConditions] = useState({ soil: "", rainfall: "" });

  useEffect(() => {
    fetch("/cropproduction.csv")
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => setCrops(result.data),
        });
      });
  }, []);

  const handleFilter = () => {
    const { soil, rainfall } = conditions;
    const filtered = crops.filter(crop =>
      (!soil || crop.Soil === soil) &&
      (!rainfall || (crop.Rainfall >= parseInt(rainfall)))
    );
    setFilteredCrops(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Crop Recommendations</h1>
      
      <div className="mb-4">
        <label className="block text-lg font-semibold">Soil Type:</label>
        <input
          type="text"
          value={conditions.soil}
          onChange={(e) => setConditions({ ...conditions, soil: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold">Minimum Rainfall (mm):</label>
        <input
          type="number"
          value={conditions.rainfall}
          onChange={(e) => setConditions({ ...conditions, rainfall: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
      >
        Get Recommendations
      </button>

      <div className="mt-6">
        {filteredCrops.length > 0 ? (
          <ul className="space-y-2">
            {filteredCrops.map((crop, index) => (
              <li key={index} className="p-4 bg-white shadow rounded">
                <strong>{crop.Crop}</strong> - Suitable for {crop.Soil}, Rainfall: {crop.Rainfall}mm
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-4">No crops match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default CropRecommendations;
