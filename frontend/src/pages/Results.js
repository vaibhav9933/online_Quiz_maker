import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/quizzes/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="results-container">
            <h2>Results</h2>
            <p>Your final score will be displayed here.</p>
            <h3>Leaderboard</h3>
            <ul>
                {leaderboard.map((entry, index) => (
                    <li key={index}>{entry.name}: {entry.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Results;
