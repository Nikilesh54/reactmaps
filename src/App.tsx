import React from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';
/*import WeatherCard from './WeatherCard';*/

function App() {
    return (
        <div className="App">
            <HamburgerMenu />
            {/*<WeatherCard />*/}
            <MapComponent />
        </div>
    );
}

export default App;