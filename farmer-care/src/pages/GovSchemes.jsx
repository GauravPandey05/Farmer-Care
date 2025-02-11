function GovSchemes() {
  const schemes = [
    {
      title: "PM Kisan Samman Nidhi",
      description: "Direct income support of ₹6,000 per year to farmer families",
      benefits: ["Financial support", "Direct bank transfer", "No middlemen"],
      eligibility: "All farmer families owning cultivable land"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme to protect against natural calamities",
      benefits: ["Crop loss protection", "Low premium rates", "Quick claim settlement"],
      eligibility: "All farmers growing notified crops"
    },
    {
      title: "Soil Health Card Scheme",
      description: "Soil testing and recommendations for nutrients",
      benefits: ["Free soil testing", "Customized recommendations", "Improved yield"],
      eligibility: "All farmers"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Government Schemes</h1>
      
      <div className="space-y-6">
        {schemes.map((scheme, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-3">{scheme.title}</h2>
            <p className="text-gray-600 mb-4">{scheme.description}</p>
            
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
    </div>
  );
}

export default GovSchemes