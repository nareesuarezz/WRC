import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface User {
    username: string;
    password: string;
    img: string;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername && storedPassword) {
            setUsername(storedUsername);
            setPassword(storedPassword);
        }
    }, []);

    const handleLogin = () => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            navigate('/');
        } else {
            alert('Invalid username or password');
        }
    };
    return (
        <div className="login-container">
            
            <form>
            <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <p className="login-text">Did you forget your password?</p>
                <p className="login-text">Don't you have an account? Create one!</p>
            </form>
        </div>
    );
    
};

export default Login;
