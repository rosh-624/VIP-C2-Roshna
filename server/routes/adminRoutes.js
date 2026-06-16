const express = require("express");
const {
  getDashboardStats,
  approveAgent,
  getAllAgents,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", getDashboardStats);

router.put("/approve/:agentId", approveAgent);
router.get("/agents", getAllAgents);

module.exports = router;