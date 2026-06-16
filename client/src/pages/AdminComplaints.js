import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
  fetchComplaints();
  fetchAgents();
}, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/all");
      setComplaints(res.data.complaints);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAgents = async () => {
  try {
    const res = await API.get("/admin/agents");
    setAgents(res.data.agents);
  } catch (error) {
    console.log(error);
  }
};
const assignOfficer = async (complaintId, officerId) => {
  try {
    await API.put(`/complaints/assign/${complaintId}`, {
      assignedAgentId: officerId,
    });

    alert("Officer Assigned Successfully");
    fetchComplaints();
  } catch (error) {
    alert("Assignment Failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>All Complaints</h1>
        <p className="subtitle">
          View and monitor all complaints
        </p>

        <div className="table-card">
          <h2>Complaints List</h2>

          <table className="complaints-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>User</th>
                <th>Assign Officer</th>
              </tr>
            </thead>

            <tbody>
  {complaints.map((complaint) => (
    <tr key={complaint._id}>
      <td>{complaint.title}</td>

      <td>
        {complaint.description?.substring(0, 40)}
      </td>

      <td>{complaint.category}</td>

      <td>
        {complaint.location || "N/A"}
      </td>

      <td>
        <span className="badge">
          {complaint.status}
        </span>
      </td>

      <td>
        {complaint.userId?.name || "Unknown"}
      </td>
      <td>
  <select
    onChange={(e) =>
      assignOfficer(complaint._id, e.target.value)
    }
  >
    <option value="">Select Officer</option>

    {agents.map((agent) => (
      <option key={agent._id} value={agent._id}>
        {agent.name}
      </option>
    ))}
  </select>
</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminComplaints;