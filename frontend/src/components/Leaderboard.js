import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('/api/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((entry, index) => (
                    <li key={index}>{entry.title} - {entry.highScore}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
