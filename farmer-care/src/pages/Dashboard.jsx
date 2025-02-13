import { useState } from "react";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const weather = {
    current: { temp: 25, condition: "Sunny" },
    forecast: [
      { day: "Tomorrow", temp: 26, condition: "Partly Cloudy" },
      { day: "Day 2", temp: 24, condition: "Rainy" },
      { day: "Day 3", temp: 27, condition: "Sunny" },
      { day: "Day 4", temp: 25, condition: "Cloudy" },
      { day: "Day 5", temp: 23, condition: "Rainy" },
      { day: "Day 6", temp: 26, condition: "Sunny" },
      { day: "Day 7", temp: 28, condition: "Clear" },
      { day: "Day 8", temp: 27, condition: "Partly Cloudy" },
      { day: "Day 9", temp: 25, condition: "Windy" },
      { day: "Day 10", temp: 24, condition: "Rainy" },
      { day: "Day 11", temp: 26, condition: "Sunny" },
      { day: "Day 12", temp: 25, condition: "Cloudy" },
      { day: "Day 13", temp: 27, condition: "Clear" },
      { day: "Day 14", temp: 28, condition: "Sunny" },
      { day: "Day 15", temp: 26, condition: "Partly Cloudy" },
    ],
  };

  const crops = [
    { name: "Wheat", status: "Growing", plantedDate: "2024-01-15" },
    { name: "Rice", status: "Ready for harvest", plantedDate: "2023-12-01" },
    { name: "Corn", status: "Growing", plantedDate: "2024-02-01" },
  ];

  const totalPages = Math.ceil(weather.forecast.length / 3);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

  const visibleForecast = weather.forecast.slice(currentPage * 3, (currentPage + 1) * 3);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Dashboard</h1>

      {/* Weather Section */}
      {/* Weather Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-green-300">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Today's Weather</h2>
          <div className="text-5xl font-bold text-green-700">{weather.current.temp}°C</div>
          <div className="text-gray-800 font-medium">{weather.current.condition}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-green-300">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Weather Forecast</h2>
          <div className="space-y-2">
            {visibleForecast.map((day, index) => (
              <div key={index} className="flex justify-between items-center bg-green-50 p-2 rounded-md shadow-sm">
                <span className="font-semibold text-green-900">{day.day}</span>
                <span className="text-gray-800 font-medium">{day.temp}°C - {day.condition}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-green-400 text-white font-semibold rounded disabled:opacity-50 hover:bg-green-600"
            >
              Previous
            </button>
            <span className="text-gray-800 font-semibold">Page {currentPage + 1} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-green-400 text-white font-semibold rounded disabled:opacity-50 hover:bg-green-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>


      {/* Current Crops Section */}
      
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold text-green-800 mb-3">Current Crops</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {crops.map((crop, index) => (
            <div key={index} className="bg-green-100 p-4 rounded-lg shadow-sm border border-green-300">
              <h3 className="text-lg font-semibold text-green-900">{crop.name}</h3>
              <p className="text-gray-800 font-medium">Status: {crop.status}</p>
              <p className="text-gray-800 font-medium">Planted: {crop.plantedDate}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
