import React from 'react';
import './CSS/CurrentLocationButton.css'; // Make sure this path matches your project structure

const CurrentLocationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button className="Btn" onClick={onClick}>
            Current Location
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 384 512"
                className="svg"
            >
                <path
                    d="M172.3 501.7c16.8 16.4 43.6 16.4 60.4 0 28.5-27.9 170.3-187.6 170.3-293.7C403 93.5 324.5 0 224 0 123.5 0 45 93.5 45 208c0 106.1 141.8 265.8 170.3 293.7zM224 272c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
                ></path>
            </svg>
        </button>
    );
};

export default CurrentLocationButton;
