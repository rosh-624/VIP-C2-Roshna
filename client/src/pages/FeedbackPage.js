import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function FeedbackPage() {
  const { complaintId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitFeedback = async () => {
    try {
      const res = await API.post("/feedback/submit", {
        complaintId,
        userId: user.id,
        rating,
        comment,
      });

      alert(res.data.message);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Feedback submission failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Submit Feedback</h1>
        <p className="subtitle">
          Share your experience after complaint resolution
        </p>

        <div className="form-card">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>

          <textarea
            placeholder="Write your feedback"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button onClick={submitFeedback}>
            Submit Feedback
          </button>
        </div>
      </div>
    </>
  );
}

export default FeedbackPage;