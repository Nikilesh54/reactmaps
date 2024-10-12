import * as React from 'react';
import './CSS/HamburgerMenu.css';
import { useState } from 'react';
import halflogo from './Images/uninav_halflogo1.png';
import fulllogo from './Images/uninav_fulllogo1.png';

const HamburgerMenu: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    React.useEffect(() => {
        const mapWrapper = document.querySelector('.map-wrapper');
        if (mapWrapper) {
            if (isHovered) {
                mapWrapper.classList.add('expanded');
            } else {
                mapWrapper.classList.remove('expanded');
            }
        }
    }, [isHovered]);

    return (
        <div
            className={`hamburger-menu ${isHovered ? 'expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="logo-container">
                <img
                    src={isHovered ? fulllogo : halflogo}
                    alt="Logo"
                    className="logo"
                />
            </div>
            <div className="menu-item">
                <i className="icon">🏠</i>
                {isHovered && <span>Option 1</span>}
            </div>
            <div className="menu-item">
                <i className="icon">📊</i>
                {isHovered && <span>Option 2</span>}
            </div>
            <div className="menu-item">
                <i className="icon">🔔</i>
                {isHovered && <span>Option 3</span>}
            </div>
            <div className="menu-item">
                <i className="icon">📅</i>
                {isHovered && <span>Option 4</span>}
            </div>
            <div className="menu-item">
                <i className="icon">⚙️</i>
                {isHovered && <span>Option 5</span>}
            </div>
            <div className="menu-footer">
                <div className="color-theme">
                    {isHovered && <span>Light mode</span>}
                    <i className="icon">🌙</i>
                </div>
                <i className="icon">🔒</i>
                {isHovered && <span>Logout</span>}
            </div>


        </div>
    );
};

export default HamburgerMenu;