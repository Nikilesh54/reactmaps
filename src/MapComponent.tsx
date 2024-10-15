import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { What3wordsMap, What3wordsAutosuggest } from '@what3words/react-components';
import './CSS/MapComponent.css';
import CurrentLocationButton from './CurrentLocationButton';
import Tabs from './Tabs';
import PostButton from './PostButton';

const API_KEY = '4BT9O5NR';  // What3Words API key
const MAP_API_KEY = 'AIzaSyDIRFZk0OcgUFUn8Qw00te7r4mmls6eALI';  // Google Maps API key
const WEATHER_API_KEY = '9e39bcf3d5d4d16d46058e69edb02e8d';  // OpenWeatherMap API key

const MapComponent: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number, lng: number } | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [isWeatherPopupVisible, setIsWeatherPopupVisible] = useState(false);
    const [isCoordinatesVisible, setIsCoordinatesVisible] = useState(false);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const mapRef = useRef<any>(null);

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setSelectedLatLng({ lat: latitude, lng: longitude });

                    if (mapRef.current && mapRef.current.map) {
                        mapRef.current.map.setCenter({ lat: latitude, lng: longitude });
                    }
                    fetchWeatherData({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const fetchWeatherData = async ({ lat, lng }: { lat: number, lng: number }) => {
        setIsLoadingWeather(true);
        setWeatherError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
            );
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            setWeatherData(data);
            setIsWeatherPopupVisible(true);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherError('Failed to fetch weather data. Please try again.');
        } finally {
            setIsLoadingWeather(false);
        }
    };

    const handleSquareSelect = (event: any) => {
        const { lat, lng } = event.detail.coordinates;
        setSelectedLatLng({ lat, lng });
        setIsCoordinatesVisible(true);
        fetchWeatherData({ lat, lng });
    };

    useEffect(() => {
        const w3wMap = document.getElementById("w3w-map");
        if (w3wMap) {
            w3wMap.addEventListener("selected_square", handleSquareSelect);
        }
        return () => {
            if (w3wMap) {
                w3wMap.removeEventListener("selected_square", handleSquareSelect);
            }
        };
    }, []);

    const closeCoordinatesPopup = () => {
        setIsCoordinatesVisible(false);
    };

    const closeWeatherPopup = () => {
        setIsWeatherPopupVisible(false);
    };

    return (
        <div className="map-wrapper">
            <div className="tabs-container">
                <Tabs />
            </div>
            <div className="post-button-container">
                <PostButton />
            </div>
            <div className="map-container">
                <What3wordsMap
                    id="w3w-map"
                    api_key={API_KEY}
                    map_api_key={MAP_API_KEY}
                    zoom={18}
                    selected_zoom={20}
                    lng={currentLocation ? currentLocation.lng : -77.18941237551974}
                    lat={currentLocation ? currentLocation.lat : 38.89680649400657}
                    search_control_position={2}
                    map_type_control={true}
                    zoom_control={true}
                    fullscreen_control={true}
                    fullscreen_control_position={3}
                    current_location_control_position={9}
                    disable_default_ui={true}
                    words="filled.count.soap"
                    ref={mapRef}
                    style={{ width: '100%', height: '100%' }}
                >
                    <div slot="map" style={{ width: '100%', height: '100%' }} />
                    <div slot="search-control" style={{ margin: '10px 0 0 10px' }}>
                        <What3wordsAutosuggest>
                            <input
                                type="text"
                                placeholder="Find your address"
                                style={{ width: '300px' }}
                                autoComplete="off"
                            />
                        </What3wordsAutosuggest>
                    </div>
                    <div slot="current-location-control" style={{ margin: '0 10px 10px 0' }}>
                        <CurrentLocationButton onClick={handleCurrentLocation} />
                    </div>
                </What3wordsMap>

                {isCoordinatesVisible && selectedLatLng && (
                    <div className="coordinates-popup" style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: 'white',
                        padding: '10px',
                        border: '1px solid black',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <button onClick={closeCoordinatesPopup} style={{ float: 'right' }}>Close</button>
                        <h3>Coordinates</h3>
                        <p>Latitude: {selectedLatLng.lat.toFixed(6)}</p>
                        <p>Longitude: {selectedLatLng.lng.toFixed(6)}</p>
                    </div>
                )}

                {isWeatherPopupVisible && (
                    <div className="weather-popup">
                        <button onClick={closeWeatherPopup} style={{ float: 'right' }}>Close</button>
                        <h3>Weather Information</h3>
                        {isLoadingWeather ? (
                            <p>Loading weather data...</p>
                        ) : weatherError ? (
                            <p style={{ color: 'red' }}>{weatherError}</p>
                        ) : weatherData ? (
                            <div>
                                <p>Temperature: {weatherData.main.temp.toFixed(1)}°C</p>
                                <p>Weather: {weatherData.weather[0].description}</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            </div>
                        ) : (
                            <p>No weather data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapComponent;