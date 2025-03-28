import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory
const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Initialize useHistory

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/quizzes/login', { username, password });
            setMessage(response.data.message);
            setLoggedIn(true);
            // Redirect to quiz page after success
            history.push('/quiz');
        } catch (error) {
            setMessage('Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
            />
            <button onClick={handleLogin} className="login-button">Login</button>
            {message && <p className="login-message">{message}</p>}
        </div>
    );
};

export default Login;
