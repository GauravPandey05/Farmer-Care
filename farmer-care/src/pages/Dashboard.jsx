import React, { useEffect, useState } from "react";
import { fetchWeatherByCoords } from "../apiUtils";

function Dashboard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const crops = [
        { name: "Wheat", status: "Growing", plantedDate: "2024-01-15" },
        { name: "Rice", status: "Ready for harvest", plantedDate: "2023-12-01" },
        { name: "Corn", status: "Growing", plantedDate: "2024-02-01" },
    ];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const data = await fetchWeatherByCoords(latitude, longitude);
                    if (data) setWeather(data);
                } catch (err) {
                    setError("Failed to fetch weather data.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Location access denied. Unable to fetch weather data.");
                setLoading(false);
            }
        );
    }, []);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(0, prev - 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(4, prev + 1));

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Dashboard</h1>

            {/* Weather Section */}
            <div className="grid md:grid-cols-2 gap-6">
                {loading ? (
                    <p className="text-black">Fetching weather data...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : weather ? (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow border border-green-300">
                            <h2 className="text-xl font-semibold text-green-800 mb-3">
                                Today's Weather in {weather.city}
                            </h2>
                            <div className="text-5xl font-bold text-green-700">{weather.current.temp}°C</div>
                            <div className="text-gray-800 font-medium">{weather.current.condition}</div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-green-300">
                            <h2 className="text-xl font-semibold text-green-800 mb-3">Weather Forecast</h2>
                            <div className="space-y-2">
                                {weather.forecast.slice(currentPage * 3, (currentPage + 1) * 3).map((day, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-green-50 p-2 rounded-md shadow-sm"
                                    >
                                        <span className="font-semibold text-green-900">{day.day}</span>
                                        <span className="text-gray-800 font-medium">
                                            {day.temp}°C - {day.condition}
                                        </span>
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
                                <span className="text-gray-800 font-semibold">
                                    Page {currentPage + 1} of 5
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === 4}
                                    className="px-4 py-2 bg-green-400 text-white font-semibold rounded disabled:opacity-50 hover:bg-green-600"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Unable to fetch weather data.</p>
                )}
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

            {/* Farming Insights Section (Reduced Size) */}
            <div className="bg-white p-4 rounded-lg shadow mt-6">
                <h2 className="text-lg font-semibold text-green-800 mb-3">Farming Insights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm border border-green-300">
                        <h3 className="text-md font-semibold text-green-900">Soil Health</h3>
                        <p className="text-gray-800 text-sm">
                            Regular soil testing helps determine nutrient levels and pH balance for optimal crop yield.
                        </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm border border-green-300">
                        <h3 className="text-md font-semibold text-green-900">Irrigation Management</h3>
                        <p className="text-gray-800 text-sm">
                            Efficient water use techniques like drip irrigation help conserve water and enhance growth.
                        </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm border border-green-300">
                        <h3 className="text-md font-semibold text-green-900">Pest Control</h3>
                        <p className="text-gray-800 text-sm">
                            Use natural predators, crop rotation, and organic pesticides to reduce pest damage.
                        </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow-sm border border-green-300">
                        <h3 className="text-md font-semibold text-green-900">Market Trends</h3>
                        <p className="text-gray-800 text-sm">
                            Stay updated with market prices to sell your crops at the best possible rate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
