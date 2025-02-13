function CropRecommendations() {
  const recommendations = [
    {
      crop: "Wheat",
      season: "Rabi",
      soilType: "Loamy",
      waterRequirement: "Medium",
      expectedYield: "4-5 tonnes/hectare",
    },
    {
      crop: "Rice",
      season: "Kharif",
      soilType: "Clay",
      waterRequirement: "High",
      expectedYield: "3-4 tonnes/hectare",
    },
    {
      crop: "Cotton",
      season: "Kharif",
      soilType: "Black soil",
      waterRequirement: "Medium",
      expectedYield: "2-3 tonnes/hectare",
    },
  ];

  const handleViewDetails = (cropName) => {
    alert(`More details about ${cropName} coming soon!`);
  };

  return (
    <div className="min-h-screen bg-black py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-600 text-center mb-8">Crop Recommendations</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((crop, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">{crop.crop}</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">🌱 Season:</span> {crop.season}</p>
                <p><span className="font-medium">🌍 Soil Type:</span> {crop.soilType}</p>
                <p><span className="font-medium">💧 Water Requirement:</span> {crop.waterRequirement}</p>
                <p><span className="font-medium">📊 Expected Yield:</span> {crop.expectedYield}</p>
              </div>
              <button
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all"
                onClick={() => handleViewDetails(crop.crop)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CropRecommendations;
