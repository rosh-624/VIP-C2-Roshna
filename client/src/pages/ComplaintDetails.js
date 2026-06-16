import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ComplaintDetails() {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);

  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/complaints/${complaintId}`);
      setComplaint(res.data.complaint);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  if (!complaint) {
    return (
      <>
        <Navbar />
        <div className="dashboard">
          <h2>Loading complaint details...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Complaint Details</h1>
        <p className="subtitle">Track full complaint progress and officer updates</p>

        <div className="table-card">
          <h2>{complaint.title}</h2>

          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Location:</strong> {complaint.location || "N/A"}</p>
          <p><strong>Urgency:</strong> {complaint.urgency}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="badge">{complaint.status}</span>
          </p>

          <hr />

          <h3>User Details</h3>
          <p><strong>Name:</strong> {complaint.userId?.name || "N/A"}</p>
          <p><strong>Email:</strong> {complaint.userId?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {complaint.userId?.phone || "N/A"}</p>

          <hr />

          <h3>Assigned Officer</h3>
          <p><strong>Name:</strong> {complaint.assignedAgentId?.name || "Not Assigned"}</p>
          <p><strong>Email:</strong> {complaint.assignedAgentId?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {complaint.assignedAgentId?.phone || "N/A"}</p>

          <hr />

          <h3>Action Notes</h3>

          {!complaint.notes || complaint.notes.length === 0 ? (
            <p>No notes available.</p>
          ) : (
            <div>
              {complaint.notes.map((note, index) => (
                <div className="note-card" key={index}>
                  <p>{note.text}</p>
                  <small>
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleString()
                      : ""}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ComplaintDetails;