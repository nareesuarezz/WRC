import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './changeUsername.css'; 

const ChangeUsername: React.FC = () => {
    const [currentUsername, setCurrentUsername] = useState<string>('');
    const [newUsername, setNewUsername] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const storedUsername = localStorage.getItem('username');

        if (currentUsername === storedUsername) {
            localStorage.setItem('username', newUsername);
            navigate(-1);
        } else {
            alert('The actual username is wrong, put your username');
        }
    };

    return (
        <div className="change-username-container">
            <form className="change-username-form" onSubmit={handleSubmit}>
                <h1>Change Username</h1>
                <input
                    type="text"
                    placeholder="Current Username"
                    value={currentUsername}
                    onChange={(e) => setCurrentUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button type="submit">Change Username</button>
            </form>
        </div>
    );
};

export default ChangeUsername;
