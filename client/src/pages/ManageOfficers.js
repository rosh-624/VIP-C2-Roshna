import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ManageOfficers() {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const res = await API.get("/admin/agents");
      setAgents(res.data.agents);
    } catch (error) {
      console.log(error);
    }
  };

  const approveAgent = async (agentId) => {
    try {
      await API.put(`/admin/approve/${agentId}`, {});
      alert("Officer approved successfully");
      fetchAgents();
    } catch (error) {
      alert("Approval failed");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Manage Officers</h1>
        <p className="subtitle">
          Verify and approve officer accounts
        </p>

        <div className="table-card">
          <h2>Officer List</h2>

          {agents.length === 0 ? (
            <p>No officers found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Approval Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {agents.map((agent) => (
                  <tr key={agent._id}>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>
                      <span className="badge">
                        {agent.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td>
                      {agent.isApproved ? (
                        <span>Already Approved</span>
                      ) : (
                        <button
                          className="small-btn"
                          onClick={() => approveAgent(agent._id)}
                        >
                          Approve
                        </button>
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

export default ManageOfficers;