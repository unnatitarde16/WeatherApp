# Weather App - React Project

This project is made according to the given assignment:

- Develop a weather forecasting application using React.
- Fetch weather data from an external API using useEffect.
- Display current weather conditions and forecasts.
- Implement error handling for API requests.
- Style the application using CSS.

## Technologies

- React
- JavaScript
- useState
- useEffect
- Fetch API
- Open-Meteo API
- CSS
- Vite

## Folder Structure

weather-app/
├── package.json
├── index.html
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── style.css

## How to Run

Open the project folder in VS Code or another terminal.

Run:

npm install

Then:

npm run dev

Open the localhost link shown in the terminal.

## How the API Works

1. The user enters a city name.
2. The Open-Meteo Geocoding API finds the city's latitude and longitude.
3. The Open-Meteo Forecast API uses those coordinates to get weather information.
4. React displays the current weather and 5-day forecast.

No backend and no hardcoded weather values are used.

## Simple Viva Explanation

Q: What is React?
A: React is a JavaScript library used to build user interfaces.

Q: Why did you use useState?
A: useState stores changing values such as city, weather data, loading status, and errors.

Q: Why did you use useEffect?
A: useEffect runs the initial weather request when the component loads.

Q: What API is used?
A: Open-Meteo is used for geocoding and weather forecast data.

Q: Why is the Geocoding API needed?
A: Weather data needs latitude and longitude, so the city name is first converted into coordinates.

Q: What happens if the city is invalid?
A: An error message is displayed using error state and conditional rendering.

Q: Is a backend used?
A: No. The React application directly calls the Open-Meteo APIs.

Q: How is CSS made responsive?
A: CSS media queries change the layout for smaller screen sizes.
