const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { answers } = req.body;
    // Mock result calculation
    const score = answers.filter((a) => a.correct).length;
    res.json({ message: 'Quiz completed', score });
});

module.exports = router;
