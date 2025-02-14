export async function fetchWeatherByCoords(lat, lon) {
    const API_KEY = "7e679e1208558ffc690106de6550ecd4"; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API request failed");
    
    const data = await response.json();
    return {
        city: data.city.name,
        current: {
            temp: data.list[0].main.temp,
            condition: data.list[0].weather[0].description,
        },
        forecast: data.list.slice(1, 16).map((entry, index) => ({
            day: `Day ${index + 1}`,
            temp: entry.main.temp,
            condition: entry.weather[0].description,
        })),
    };
}
