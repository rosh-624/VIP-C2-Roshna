import React, { useState } from "react";
import API from "../services/api";

function LodgeComplaint() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    urgency: "Medium",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitComplaint = async () => {
    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("location", form.location);
      data.append("urgency", form.urgency);
      data.append("userId", user.id);

      const res = await API.post("/complaints/create", data);

      alert(res.data.message);
    } catch (error) {
      alert("Complaint submission failed");
    }
  };

  return (
    <div className="dashboard">
      <h1>Lodge New Complaint</h1>
      <p className="subtitle">Submit your issue to the concerned department</p>

      <div className="form-card">
        <input name="title" placeholder="Complaint Title" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Describe your complaint"
          onChange={handleChange}
        ></textarea>

        <select name="category" onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="Municipality">Municipality</option>
          <option value="Electricity">Electricity</option>
          <option value="Police">Police</option>
          <option value="Water Department">Water Department</option>
        </select>

        <input name="location" placeholder="Location" onChange={handleChange} />

        <select name="urgency" onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={submitComplaint}>Submit Complaint</button>
      </div>
    </div>
  );
}

export default LodgeComplaint;