const express = require('express');
const { getAllWebtoons, getWebtoonById, addWebtoon, deleteWebtoon } = require('../Controllers/Anime');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /webtoons - Fetch all webtoons
router.get('/', getAllWebtoons);

// POST /webtoons - Add a new webtoon (protected)
router.post('/', authenticateToken, addWebtoon);

// GET /webtoons/:id - Fetch a specific webtoon by ID
router.get('/:id', getWebtoonById);

// DELETE /webtoons/:id - Remove a webtoon by ID (protected)
router.delete('/:id', authenticateToken, deleteWebtoon);

module.exports = router;
