const User = require("../models/User");
const Complaint = require("../models/Complaint");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "USER",
    });

    const totalAgents = await User.countDocuments({
      role: "AGENT",
    });

    const totalComplaints = await Complaint.countDocuments();

    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending",
    });

    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved",
    });

    const inProgressComplaints = await Complaint.countDocuments({
      status: "In Progress",
    });

    res.status(200).json({
      totalUsers,
      totalAgents,
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      inProgressComplaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
const approveAgent = async (req, res) => {
  try {
    const { agentId } = req.params;

    const agent = await User.findByIdAndUpdate(
      agentId,
      { isApproved: true },
      { new: true }
    );

    res.status(200).json({
      message: "Agent approved successfully",
      agent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "AGENT" }).select("-password");

    res.status(200).json({
      message: "Agents fetched successfully",
      agents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  getDashboardStats,
  approveAgent,
  getAllAgents
};