import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">
          Monitor users, officers and complaints
        </p>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <h2>{stats.totalUsers || 0}</h2>
          </div>

          <div className="stat-card">
            <h3>Total Officers</h3>
            <h2>{stats.totalAgents || 0}</h2>
          </div>

          <div className="stat-card">
            <h3>Total Complaints</h3>
            <h2>{stats.totalComplaints || 0}</h2>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <h2>{stats.pendingComplaints || 0}</h2>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <h2>{stats.inProgressComplaints || 0}</h2>
          </div>

          <div className="stat-card">
            <h3>Resolved</h3>
            <h2>{stats.resolvedComplaints || 0}</h2>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px",
          }}
        >
          <button
            className="lodge-btn"
            onClick={() => (window.location.href = "/admin/complaints")}
          >
            View All Complaints
          </button>

          <button
            className="lodge-btn"
            onClick={() => (window.location.href = "/admin/officers")}
          >
            Manage Officers
          </button>

          
          <button
            className="lodge-btn"
            onClick={() => (window.location.href = "/admin/feedback")}
          >
            View Feedback
          </button>
          
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;