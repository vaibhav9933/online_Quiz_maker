import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/create', { title: quizTitle, questions });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create a Quiz</h2>
            <input
                type="text"
                placeholder="Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
            />
            {/* Add questions dynamically */}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default QuizForm;
