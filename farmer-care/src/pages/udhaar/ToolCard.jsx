function ToolCard({ tool, onRequest, showContact = false }) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.toolName}</h3>
        <p className="text-gray-700 mb-2">{tool.description}</p>
  
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Available:</span> {tool.availableDates}
          </p>
          <p className="text-green-700 font-bold text-lg">₹{tool.rentalFee}/day</p>
  
          {showContact && (
            <p className="text-gray-700">
              <span className="font-semibold">Contact:</span> {tool.contactNumber || "N/A"}
            </p>
          )}
  
          {!showContact && onRequest && (
            <button
              onClick={() => onRequest(tool)}
              className="w-full mt-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out"
            >
              Request {tool.toolName}
            </button>
          )}
        </div>
      </div>
    );
  }
  
  export default ToolCard;
  