const express = require('express');
const router = express.Router();

let users = []; // Array to store registered users
let leaderboard = []; // Array to store leaderboard scores

// **Registration Route**
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required!' });
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    users.push({ username, password });
    console.log(`User registered: ${username}`);
    res.status(201).json({ message: 'Registration successful!' });
});


// **Login Route**
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required!' });
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log(`User logged in: ${username}`); // Debug log
        return res.status(200).json({ message: 'Login successful!', token: 'mockToken123' }); // Mock token
    } else {
        return res.status(401).json({ message: 'Invalid credentials!' });
    }
});

// **GET quizzes**

router.get('/', (req, res) => {
    const quizzes = [
        { question: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' },
        { question: 'What is the capital of France?', options: ['Berlin', 'Paris', 'Rome'], answer: 'Paris' }
    ];
    console.log('Fetching quizzes...'); // Debug log
    res.status(200).json(quizzes);
});



// **POST leaderboard (Submit Score)**
router.post('/leaderboard', (req, res) => {
    const { name, score } = req.body;

    // Validate input
    if (!name || score === undefined) {
        return res.status(400).json({ message: 'Name and score are required!' });
    }

    // Add the new entry to the leaderboard
    leaderboard.push({ name: name.trim(), score }); // Save the trimmed name

    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Limit leaderboard to top 10 entries
    leaderboard = leaderboard.slice(0, 10);

    console.log('Updated leaderboard:', leaderboard); // Debug log
    res.status(201).json(leaderboard); // Send the updated leaderboard
});
// **GET leaderboard (Retrieve Scores)**
router.get('/leaderboard', (req, res) => {
    try {
        console.log('Fetching leaderboard...'); // Debug log
        res.status(200).json(leaderboard); // Return the leaderboard
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard. Please try again.' });
    }
});


module.exports = router;
