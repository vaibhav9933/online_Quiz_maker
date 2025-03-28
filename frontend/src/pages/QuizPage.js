import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/quiz.css';

const QuizPage = () => {
    const [quizData, setQuizData] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(30); // Timer set to 30 seconds
    const [leaderboard, setLeaderboard] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch quizzes on component mount
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/quizzes');
                console.log('Fetched Quiz Data:', response.data);
                setQuizData(response.data);
                setIsLoading(false);
            } catch (error) {
                setErrorMessage('Failed to load quizzes. Please try again later.');
                console.error('Error fetching quizzes:', error.response?.data?.message || error.message);
                setIsLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    // Fetch leaderboard on component mount
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/quizzes/leaderboard');
                console.log('Fetched Leaderboard:', response.data);
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error.response?.data?.message || error.message);
            }
        };

        fetchLeaderboard();
    }, []);

    // Timer countdown
    useEffect(() => {
        if (timer > 0 && !submitted) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval); // Cleanup to avoid memory leaks
        }
    }, [timer, submitted]);

    // Auto-submit when timer ends
    useEffect(() => {
        if (timer === 0 && !submitted) {
            handleSubmit();
        }
    }, [timer, submitted]);

    // Handle answer selection
    const handleSelectAnswer = (questionIndex, selectedOption) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: {
                selected: selectedOption,
                isCorrect: quizData[questionIndex]?.answer === selectedOption,
            },
        }));
    };

    // Handle quiz submission
    const handleSubmit = async () => {
        const correctAnswers = Object.values(selectedAnswers).filter((answer) => answer.isCorrect).length;
        setScore(correctAnswers);

        // Submit score to leaderboard
        try {
            const response = await axios.post('http://localhost:5000/quizzes/leaderboard', {
                name: 'User', // Replace with actual user's name
                score: correctAnswers,
            });
            console.log('Updated Leaderboard:', response.data);
            setLeaderboard(response.data); // Update leaderboard with latest scores
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting score to leaderboard:', error);
            setErrorMessage('Failed to submit score. Please try again.');
        }
    };

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Welcome to the Quiz</h1>
            {!submitted && timer > 0 && <p className="timer">Time Remaining: {timer}s</p>}

            {isLoading ? (
                <p className="loading-text">Loading quizzes...</p>
            ) : errorMessage ? (
                <p className="error-text">{errorMessage}</p>
            ) : submitted ? (
                <div className="results-container">
                    <h2>Your Score: {score}</h2>
                    <h3>Leaderboard</h3>
                    <ul className="leaderboard">
                        {leaderboard.length > 0 ? (
                            leaderboard.map((entry, index) => (
                                <li key={index}>
                                    {entry.name}: {entry.score}
                                </li>
                            ))
                        ) : (
                            <p>No leaderboard data yet.</p>
                        )}
                    </ul>
                </div>
            ) : (
                quizData.map((quiz, index) => (
                    <div key={index} className="quiz-question-container">
                        <h3 className="quiz-question">{quiz.question}</h3>
                        <ul className="quiz-options">
                            {quiz.options.map((option, idx) => (
                                <li key={idx}>
                                    <button
                                        className={`quiz-option-button ${
                                            selectedAnswers[index]?.selected === option ? 'selected' : ''
                                        }`}
                                        onClick={() => handleSelectAnswer(index, option)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {selectedAnswers[index]?.isCorrect !== undefined && (
                            <p
                                className={`feedback ${
                                    selectedAnswers[index]?.isCorrect ? 'correct' : 'wrong'
                                }`}
                            >
                                {selectedAnswers[index]?.isCorrect ? 'Correct!' : 'Wrong!'}
                            </p>
                        )}
                    </div>
                ))
            )}

            {!submitted && !isLoading && (
                <button className="submit-button" onClick={handleSubmit}>
                    Submit Answers
                </button>
            )}
        </div>
    );
};

export default QuizPage;
