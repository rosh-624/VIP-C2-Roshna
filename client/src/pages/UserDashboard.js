import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get(`/complaints/user/${user.id}`);
      setComplaints(res.data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  const reopenComplaint = async (complaintId) => {
    try {
      await API.put(`/complaints/reopen/${complaintId}`);
      alert("Complaint reopened successfully");
      fetchComplaints();
    } catch (error) {
      alert("Reopen failed");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const pendingCount = complaints.filter((c) => c.status === "Pending").length;
  const inProgressCount = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;
  const resolvedCount = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Welcome {user?.name}</h1>
        <p className="subtitle">Track and manage your complaints</p>

        <div style={{ marginBottom: "25px" }}>
          <button
            className="lodge-btn"
            onClick={() => (window.location.href = "/lodge")}
          >
            + Lodge Complaint
          </button>

          <button
            className="lodge-btn"
            style={{ marginLeft: "10px" }}
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Complaints</h3>
            <h2>{complaints.length}</h2>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <h2>{pendingCount}</h2>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <h2>{inProgressCount}</h2>
          </div>

          <div className="stat-card">
            <h3>Resolved</h3>
            <h2>{resolvedCount}</h2>
          </div>
        </div>

        <div className="table-card">
          <h2>My Complaints</h2>

          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint.title}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.urgency}</td>

                    <td>
                      <span className="badge">{complaint.status}</span>
                    </td>

                    <td>
                      <button
                        className="small-btn"
                        onClick={() =>
                          (window.location.href = `/complaint/${complaint._id}`)
                        }
                      >
                        View Details
                      </button>

                      {complaint.status === "Resolved" && (
                        <>
                          <button
                            className="small-btn"
                            onClick={() =>
                              (window.location.href = `/feedback/${complaint._id}`)
                            }
                          >
                            Feedback
                          </button>

                          <button
                            className="small-btn"
                            onClick={() => reopenComplaint(complaint._id)}
                          >
                            Reopen
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;