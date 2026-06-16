const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { complaintId, userId, rating, comment } = req.body;

    const feedback = await Feedback.create({
      complaintId,
      userId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "name email")
      .populate("complaintId", "title category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Feedback fetched successfully",
      feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
};