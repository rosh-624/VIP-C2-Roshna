const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createComplaint,
  getUserComplaints,
  updateComplaintStatus,
  assignAgent,
  getAgentComplaints,
  addComplaintNote,
  getAllComplaints,
  getComplaintById,
  reopenComplaint,
} = require("../controllers/complaintController");

const router = express.Router();

router.post(
  "/create",
  protect,
  upload.single("attachment"),
  createComplaint
);

router.get("/user/:userId", protect, getUserComplaints);

router.get("/all", protect, getAllComplaints);

router.get("/agent/:agentId", protect, getAgentComplaints);

router.get("/:complaintId", protect, getComplaintById);

router.put("/status/:complaintId", protect, updateComplaintStatus);

router.put("/assign/:complaintId", protect, assignAgent);

router.put("/note/:complaintId", protect, addComplaintNote);

router.put("/reopen/:complaintId", protect, reopenComplaint);

module.exports = router;