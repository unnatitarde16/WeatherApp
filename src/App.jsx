import { useEffect, useState } from "react";

const weatherConditions = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Heavy Rain Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm"
};

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Find the city's latitude and longitude.
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=en&format=json`
      );

      if (!locationResponse.ok) {
        throw new Error("Unable to search for the city.");
      }

      const locationData = await locationResponse.json();

      if (!locationData.results || locationData.results.length === 0) {
        throw new Error("City not found. Please try another city.");
      }

      const place = locationData.results[0];

      // Step 2: Get weather using the coordinates.
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to fetch weather data.");
      }

      const weatherData = await weatherResponse.json();

      setLocation(place);
      setWeather(weatherData);
    } catch (err) {
      setWeather(null);
      setLocation(null);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather when the application starts.
  useEffect(() => {
    getWeather("Mumbai");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather(city);
  };

  const getCondition = (code) =>
    weatherConditions[code] || "Unknown Condition";

  const getIcon = (code) => {
    if (code === 0) return "☀️";
    if ([1, 2].includes(code)) return "🌤️";
    if ([3, 45, 48].includes(code)) return "☁️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌡️";
  };

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather App</h1>
        <p className="subtitle">
          Check current weather conditions and 5-day forecasts
        </p>

        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {loading && <p className="message">Fetching weather data...</p>}
        {error && <p className="error">{error}</p>}

        {weather && location && !loading && (
          <>
            <div className="current-weather">
              <div className="main-weather">
                <h2>
                  {location.name}
                  {location.country ? `, ${location.country}` : ""}
                </h2>
                <div className="weather-icon">
                  {getIcon(weather.current.weather_code)}
                </div>
                <div className="temperature">
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <p>{getCondition(weather.current.weather_code)}</p>
              </div>

              <div className="weather-details">
                <div>
                  <span>💧</span>
                  <strong>Humidity</strong>
                  <p>{weather.current.relative_humidity_2m}%</p>
                </div>
                <div>
                  <span>💨</span>
                  <strong>Wind Speed</strong>
                  <p>{weather.current.wind_speed_10m} km/h</p>
                </div>
              </div>
            </div>

            <h2 className="forecast-title">5-Day Forecast</h2>

            <div className="forecast">
              {weather.daily.time.map((date, index) => (
                <div className="forecast-card" key={date}>
                  <h3>{formatDate(date)}</h3>
                  <div className="forecast-icon">
                    {getIcon(weather.daily.weather_code[index])}
                  </div>
                  <p>{getCondition(weather.daily.weather_code[index])}</p>
                  <strong>
                    {Math.round(weather.daily.temperature_2m_max[index])}° /
                    {" "}
                    {Math.round(weather.daily.temperature_2m_min[index])}°
                  </strong>
                </div>
              ))}
            </div>
          </>
        )}

        <footer>Weather data provided by Open-Meteo</footer>
      </div>
    </div>
  );
}

export default App;