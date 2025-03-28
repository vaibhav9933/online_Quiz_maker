const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Mock login validation
    if (username === 'admin' && password === 'password') {
        res.json({ message: 'Login successful', token: 'mock-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
