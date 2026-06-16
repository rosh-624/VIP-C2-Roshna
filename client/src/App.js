import { BrowserRouter, Routes, Route } from "react-router-dom";
import LodgeComplaint from "./pages/LodgeComplaint";
import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import ManageOfficers from "./pages/ManageOfficers";
import ComplaintDetails from "./pages/ComplaintDetails";
import FeedbackPage from "./pages/FeedbackPage";
import AdminFeedback from "./pages/AdminFeedback";

import "./App.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Online Complaint Registration System</h1>
        <p>
          Register complaints, track status, communicate with officers and get
          faster resolutions.
        </p>
      </div>

      <div className="forms-container">
        <Login />
        <Register />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/lodge" element={<LodgeComplaint />} />
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/officers" element={<ManageOfficers />} />
        <Route path="/complaint/:complaintId" element={<ComplaintDetails />} />
        <Route path="/feedback/:complaintId" element={<FeedbackPage />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;