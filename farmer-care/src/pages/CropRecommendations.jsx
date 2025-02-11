function CropRecommendations() {
  const recommendations = [
    {
      crop: "Wheat",
      season: "Rabi",
      soilType: "Loamy",
      waterRequirement: "Medium",
      expectedYield: "4-5 tonnes/hectare"
    },
    {
      crop: "Rice",
      season: "Kharif",
      soilType: "Clay",
      waterRequirement: "High",
      expectedYield: "3-4 tonnes/hectare"
    },
    {
      crop: "Cotton",
      season: "Kharif",
      soilType: "Black soil",
      waterRequirement: "Medium",
      expectedYield: "2-3 tonnes/hectare"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Crop Recommendations</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((crop, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-3">{crop.crop}</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Season:</span> {crop.season}</p>
              <p><span className="font-medium">Soil Type:</span> {crop.soilType}</p>
              <p><span className="font-medium">Water Requirement:</span> {crop.waterRequirement}</p>
              <p><span className="font-medium">Expected Yield:</span> {crop.expectedYield}</p>
            </div>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropRecommendations