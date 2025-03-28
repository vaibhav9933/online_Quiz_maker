const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: String,
    questions: [
        {
            questionText: String,
            options: [String],
            correctAnswer: String
        }
    ],
    highScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('Quiz', QuizSchema);
