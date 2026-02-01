const Review = require("../models/Review");

exports.addReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReviews = async (req, res) => {
    const reviews = await Review.find().populate("toy");
    res.json(reviews);
};

