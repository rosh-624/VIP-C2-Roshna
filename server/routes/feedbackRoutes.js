const express = require("express");
const {
  submitFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/submit", submitFeedback);
router.get("/all", getAllFeedback);

module.exports = router;