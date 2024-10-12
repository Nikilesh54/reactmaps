import React from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';

function App() {
    return (
        <div className="App">
            <HamburgerMenu />
            <MapComponent />
        </div>
    );
}

export default App;