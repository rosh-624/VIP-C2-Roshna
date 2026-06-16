import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function OfficerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [complaints, setComplaints] = useState([]);
  const [notes, setNotes] = useState({});

  const fetchAssignedComplaints = async () => {
    try {
      const res = await API.get(`/complaints/agent/${user.id}`);
      setComplaints(res.data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (complaintId, status) => {
    try {
      await API.put(`/complaints/status/${complaintId}`, { status });
      alert("Status updated successfully");
      fetchAssignedComplaints();
    } catch (error) {
      alert("Status update failed");
    }
  };

  const addNote = async (complaintId) => {
    try {
      if (!notes[complaintId]) {
        alert("Please enter a note");
        return;
      }

      await API.put(`/complaints/note/${complaintId}`, {
        text: notes[complaintId],
      });

      alert("Note added successfully");

      setNotes({
        ...notes,
        [complaintId]: "",
      });

      fetchAssignedComplaints();
    } catch (error) {
      alert("Note adding failed");
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Officer Dashboard</h1>
        <p className="subtitle">Manage complaints assigned to you</p>

        <div className="stats">
          <div className="stat-card">
            <h3>Assigned Complaints</h3>
            <h2>{complaints.length}</h2>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <h2>{complaints.filter((c) => c.status === "Pending").length}</h2>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <h2>
              {complaints.filter((c) => c.status === "In Progress").length}
            </h2>
          </div>

          <div className="stat-card">
            <h3>Resolved</h3>
            <h2>{complaints.filter((c) => c.status === "Resolved").length}</h2>
          </div>
        </div>

        <div className="table-card">
          <h2>Assigned Complaints</h2>

          {complaints.length === 0 ? (
            <p>No complaints assigned.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Add Note</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.category}</td>
                    <td>{c.location || "N/A"}</td>
                    <td>
                      <span className="badge">{c.status}</span>
                    </td>
                    <td>
                      <button
                        className="small-btn"
                        onClick={() => updateStatus(c._id, "Pending")}
                      >
                        Pending
                      </button>
                      <button
                        className="small-btn"
                        onClick={() => updateStatus(c._id, "In Progress")}
                      >
                        In Progress
                      </button>
                      <button
                        className="small-btn"
                        onClick={() => updateStatus(c._id, "Resolved")}
                      >
                        Resolved
                      </button>
                    </td>
                    <td>
                      <input
                        className="note-input"
                        placeholder="Add action note"
                        value={notes[c._id] || ""}
                        onChange={(e) =>
                          setNotes({
                            ...notes,
                            [c._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="small-btn"
                        onClick={() => addNote(c._id)}
                      >
                        Add
                      </button>
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

export default OfficerDashboard;