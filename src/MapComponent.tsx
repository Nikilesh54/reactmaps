import React, { useState, useEffect, useRef } from 'react';
import { What3wordsMap, What3wordsAutosuggest } from '@what3words/react-components';
import './CSS/MapComponent.css';
import CurrentLocationButton from './CurrentLocationButton';
import Tabs from './Tabs';
import PostButton from './PostButton';
import WeatherCard from './WeatherCard';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ReactiveForm from './ReactiveForm';

const API_KEY = '4BT9O5NR';
const MAP_API_KEY = 'AIzaSyDIRFZk0OcgUFUn8Qw00te7r4mmls6eALI';
const WEATHER_API_KEY = '9e39bcf3d5d4d16d46058e69edb02e8d';

const MapComponent: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number, lng: number } | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [isWeatherPopupVisible, setIsWeatherPopupVisible] = useState(false);
    const [isCoordinatesVisible, setIsCoordinatesVisible] = useState(false);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const [markers, setMarkers] = useState<{ lat: number, lng: number }[]>([]);
    const [isMarkerPlacementMode, setIsMarkerPlacementMode] = useState(false);
    const mapRef = useRef<google.maps.Map | null>(null);

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setSelectedLatLng({ lat: latitude, lng: longitude });

                    if (mapRef.current) {
                        mapRef.current.setCenter({ lat: latitude, lng: longitude });
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
        if (lat && lng) {
            setSelectedLatLng({ lat, lng });
            setIsCoordinatesVisible(true);
            fetchWeatherData({ lat, lng });
        }
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

    // Add this state to manage the visibility of the reactive form
    const [showForm, setShowForm] = useState(false);

    // Function to open the form when the post button is clicked
    const handlePostButtonClick = () => {
        setShowForm(true);
    };

    // Function to close the form
    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <div className="map-wrapper">
            <div className="tabs-container">
                <Tabs />
            </div>
            <div className="post-button-container">
                <PostButton onClick={handlePostButtonClick} />
            </div>
            {showForm && <ReactiveForm onClose={closeForm} />}
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
                    style={{ width: '100%', height: '100%' }}
                >
                    <div slot="map" style={{ width: '100%', height: '100%' }} />
                    <div slot="search-control" style={{ margin: '10px 0 0 10px' }}>
                        <What3wordsAutosuggest>
                            <input
                                type="text"
                                placeholder="Search for a 3 word address"
                                style={{ width: '100%' }}
                            />
                        </What3wordsAutosuggest>
                    </div>
                    <div slot="current-location-control" style={{ margin: '0 10px 10px 0' }}>
                        <CurrentLocationButton onClick={handleCurrentLocation} />
                    </div>
                </What3wordsMap>

                <LoadScript googleMapsApiKey={MAP_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={currentLocation || { lat: 38.89680649400657, lng: -77.18941237551974 }}
                        zoom={18}
                        onLoad={map => {
                            mapRef.current = map;
                        }}
                    >
                        {markers.map((marker, index) => (
                            <Marker key={index} position={marker} />
                        ))}
                    </GoogleMap>
                </LoadScript>

                {isCoordinatesVisible && selectedLatLng && (
                    <div className="coordinates-popup" style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                    }}>
                        <p>Latitude: {selectedLatLng.lat}</p>
                        <p>Longitude: {selectedLatLng.lng}</p>
                        <button onClick={closeCoordinatesPopup}>Close</button>
                    </div>
                )}

                <WeatherCard
                    isWeatherPopupVisible={isWeatherPopupVisible}
                    isLoadingWeather={isLoadingWeather}
                    weatherError={weatherError}
                    weatherData={weatherData}
                    closeWeatherPopup={closeWeatherPopup}
                />
            </div>
        </div>
    );
};

export default MapComponent;