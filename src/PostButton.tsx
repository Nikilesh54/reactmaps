import React from 'react';
import './CSS/PostButton.css';

const FancyButton: React.FC = () => {
    return (
        <a className="fancy" href="#">
            <span className="top-key"></span>
            <span className="text">Post</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </a>
    );
};

export default FancyButton;