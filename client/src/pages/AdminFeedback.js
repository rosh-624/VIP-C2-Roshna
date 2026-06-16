import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get("/feedback/all");
      setFeedbacks(res.data.feedbacks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const averageRating =
    feedbacks.length === 0
      ? 0
      : (
          feedbacks.reduce((sum, item) => sum + Number(item.rating), 0) /
          feedbacks.length
        ).toFixed(1);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Feedback Monitoring</h1>
        <p className="subtitle">View user ratings and complaint feedback</p>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Feedback</h3>
            <h2>{feedbacks.length}</h2>
          </div>

          <div className="stat-card">
            <h3>Average Rating</h3>
            <h2>{averageRating}</h2>
          </div>
        </div>

        <div className="table-card">
          <h2>Feedback List</h2>

          {feedbacks.length === 0 ? (
            <p>No feedback submitted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Complaint</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.userId?.name || "Unknown"}</td>
                    <td>{feedback.complaintId?.title || "N/A"}</td>
                    <td>{feedback.rating}</td>
                    <td>{feedback.comment}</td>
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

export default AdminFeedback;