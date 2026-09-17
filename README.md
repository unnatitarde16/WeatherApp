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



Q: Is a backend used?
A: No. The React application directly calls the Open-Meteo APIs.

Q: How is CSS made responsive?
A: CSS media queries change the layout for smaller screen sizes.
