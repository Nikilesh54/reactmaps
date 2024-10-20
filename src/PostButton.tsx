import React from 'react';
import './CSS/PostButton.css';

const PostButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <a className="fancy" href="#" onClick={onClick}>
            <span className="top-key"></span>
            <span className="text">Post</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </a>
    );
};

export default PostButton;
