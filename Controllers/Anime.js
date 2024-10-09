const { Anime } = require('../Models/Anime');
const { createHmac, randomBytes } = require('crypto');


const getAllWebtoons = async (req, res) => {
    try {
        const webtoons = await Anime.find({}, 'title description characters');
        res.status(200).json({ success: true, data: webtoons });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//..................................................................................

const getWebtoonById = async (req, res) => {
    try {
        const webtoon = await Anime.findById(req.params.id);
        if (!webtoon) return res.status(404).json({ success: false, message: 'Webtoon not found' });
        res.status(200).json({ success: true, data: webtoon });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const addWebtoon = async (req, res) => {
    const { title, description, characters } = req.body;
    if (!title || !description || !characters) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    try {
        const webtoon = new Anime({ title, description, characters });
        await webtoon.save();
        res.status(201).json({ success: true, data: webtoon });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}; 


const deleteWebtoon = async (req, res) => {
    try {
        const webtoon = await Anime.findByIdAndDelete(req.params.id);
        if (!webtoon) return res.status(404).json({ success: false, message: 'Webtoon not found' });
        res.status(200).json({ success: true, message: 'Webtoon deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { getAllWebtoons, getWebtoonById, deleteWebtoon, addWebtoon  };
