import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/re.css';


const Results = ({ userScore, userName }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/quizzes/leaderboard');
                console.log('Fetched Leaderboard:', response.data); // Debugging log
                setLeaderboard(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setErrorMessage('Failed to fetch leaderboard. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="results-container">
            <h2>Results</h2>
            {userName && (
                <p className="user-score">
                    <strong>{userName}'s Score:</strong> {userScore}
                </p>
            )}
            <h3>Leaderboard</h3>
            {isLoading ? (
                <p>Loading leaderboard...</p>
            ) : errorMessage ? (
                <p className="error-text">{errorMessage}</p>
            ) : (
                <ul className="leaderboard-list">
                    {leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                            <li key={index} className="leaderboard-item">
                                <span className="leaderboard-rank">#{index + 1}</span>{' '}
                                <span className="leaderboard-name">{entry.name}</span>:{' '}
                                <span className="leaderboard-score">{entry.score}</span>
                            </li>
                        ))
                    ) : (
                        <p>No leaderboard data available yet.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Results;
