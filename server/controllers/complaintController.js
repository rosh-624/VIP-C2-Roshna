const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, urgency, userId } = req.body;

    if (!title || !description || !category || !userId) {
      return res.status(400).json({
        message: "Title, description, category and user are required",
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      urgency,
      userId,
      attachment: req.file ? req.file.filename : "",
    });

    

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getUserComplaints = async (req, res) => {
  try {
    const { userId } = req.params;

    const complaints = await Complaint.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "User complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }


    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const assignAgent = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { assignedAgentId } = req.body;

    if (!assignedAgentId) {
      return res.status(400).json({
        message: "Assigned agent is required",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { assignedAgentId },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Agent assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAgentComplaints = async (req, res) => {
  try {
    const { agentId } = req.params;

    const complaints = await Complaint.find({ assignedAgentId: agentId })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Agent complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const addComplaintNote = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Note text is required",
      });
    }

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.notes.push({
      text,
    });

    await complaint.save();

    res.status(200).json({
      message: "Note added successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email phone")
      .populate("assignedAgentId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId)
      .populate("userId", "name email phone")
      .populate("assignedAgentId", "name email phone department");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint fetched successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const reopenComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: "Reopened" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint reopened successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getUserComplaints,
  updateComplaintStatus,
  assignAgent,
  getAgentComplaints,
  addComplaintNote,
  getAllComplaints,
  getComplaintById,
  reopenComplaint,
};