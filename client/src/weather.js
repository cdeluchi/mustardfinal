import { useEffect, useState } from "react";

export default function Weather() {
    const [weatherData, setWeatherData] = useState([{}]);
    const [city, setCity] = useState("");

    const apiKey = "79891816e8335ce95961e618850f1e04";

    const getWeather = (e) => {
        if (e.key == "Enter") {
            fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setWeatherData(data);
                    setCity("");
                });
        }
    };
    return (
        <div className="weatherContainer">
            <h2 className="h2InWeather">This is the weather in</h2>
            <input
                className="inputWeather"
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                onKeyPress={getWeather}
            />
            {typeof weatherData.main === "undefined" ? (
                <div>
                    <h2 className="h2InWeather"></h2>{" "}
                </div>
            ) : (
                <div className="contentWeather">
                    <p>{weatherData.name}</p>
                    <p>{Math.round(weatherData.main.temp)}C</p>
                    <p>{weatherData.weather[0].main}</p>
                </div>
            )}

            {weatherData.cod === "404" ? <p>City not found</p> : <></>}
        </div>
    );
}
