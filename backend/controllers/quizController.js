const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(200).json({ message: 'Quiz created successfully!', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await Quiz.findById(quizId);
        const score = calculateScore(quiz.questions, answers);
        res.status(200).json({ message: 'Quiz submitted!', score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Quiz.find().sort({ highScore: -1 }).limit(10);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Helper function for scoring
const calculateScore = (questions, answers) => {
    let score = 0;
    questions.forEach((q, index) => {
        if (q.correctAnswer === answers[index]) score++;
    });
    return score;
};

module.exports = { createQuiz, submitQuiz, getLeaderboard };
