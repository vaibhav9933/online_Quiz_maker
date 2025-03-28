const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes'); // Path to your route file

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz API!'); // Root route message
});

// Connect routes
app.use('/quizzes', quizRoutes); // Prefix all quiz routes with '/quizzes'

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
