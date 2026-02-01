const router = require("express").Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find().populate('toyId');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
