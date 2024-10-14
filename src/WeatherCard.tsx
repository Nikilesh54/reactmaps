import React, { useState, useEffect } from 'react';
import './CSS/WeatherCard.css';

interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    uvi: number;
    weather: {
        description: string;
        icon: string;
    }[];
}

const WeatherCard: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=YOUR_LATITUDE&lon=YOUR_LONGITUDE&units=metric&appid=YOUR_API_KEY`
                );
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cardm">
            <div className="card">
                <svg className="weather" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" xmlSpace="preserve">
                    {/* Add SVG content here */}
                </svg>
                <div className="main">{weatherData.main.temp} °C</div>
                <div className="mainsub">{weatherData.weather[0].description}</div>
            </div>

            <div className="card2">
                <div className="upper">
                    <div className="humidity">
                        <div className="humiditytext">Humidity<br />{weatherData.main.humidity}%</div>
                        <p className="humiditysvg">svgtag Humidity</p>
                    </div>

                    <div className="air">
                        <div className="airtext">Wind<br />{weatherData.wind.speed} Km/h</div>
                        <p className="airsvg">svgtag windspeed</p>
                    </div>
                </div>

                <div className="lower">
                    <div className="aqi">
                        <p className="aqisvg">svgtag UVI</p>
                        <div className="aqitext">UVI<br />{weatherData.uvi}</div>
                    </div>

                    <div className="realfeel">
                        <p className="realfeelsvg">svgtag RealFeel</p>
                        <div className="realfeeltext">Real Feel<br />{weatherData.main.feels_like} °C</div>
                    </div>

                    <div className="pressure">
                        <p className="pressuresvg">svgtag Pressure</p>
                        <div className="pressuretext">Pressure<br />{weatherData.main.pressure} mbar</div>
                    </div>
                    <div className="card3">
                        {weatherData.weather[0].description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;