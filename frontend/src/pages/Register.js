import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
const Register = ({ setRegistered }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Initialize useHistory

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/quizzes/register', { username, password });
            setMessage(response.data.message);
            setRegistered(true);
            // Redirect to login page after success
            setTimeout(() => history.push('/'), 2000); // Wait 2 seconds before redirecting
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
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
            <button onClick={handleRegister} className="register-button">Register</button>
            {message && <p className="register-message">{message}</p>}
        </div>
    );
};


export default Register;