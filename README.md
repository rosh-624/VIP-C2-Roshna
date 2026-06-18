# Online Complaint Registration & Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to streamline complaint registration, tracking, and resolution. The system provides a centralized platform where users can submit complaints, officers can manage assigned complaints, and administrators can monitor and control the overall workflow.

---

## Project Overview

The Online Complaint Registration & Management System enables organizations to efficiently handle complaints through a structured digital workflow. It reduces manual processes, improves transparency, and helps track complaint resolution status in real time.

---

## Key Features

### User Module
- User Registration and Login
- Secure JWT Authentication
- Submit Complaints
- Upload Supporting Attachments
- Track Complaint Status
- Reopen Resolved Complaints
- Submit Feedback and Ratings

### Officer Module
- View Assigned Complaints
- Update Complaint Status
- Add Complaint Notes
- Manage Complaint Resolution Activities

### Admin Module
- Dashboard Overview
- View Complaint Statistics
- Approve Officers/Agents
- Assign Complaints to Officers
- Monitor System Activities

---

## Technology Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Security
- JWT (JSON Web Token)
- bcryptjs Password Hashing

### Development Tools
- Visual Studio Code
- Git & GitHub
- MongoDB Compass
- Postman

---

## Project Architecture

```text
User / Officer / Admin
           │
           ▼
      React Frontend
           │
           ▼
   Node.js + Express API
           │
           ▼
         MongoDB
```

---

## Folder Structure

```text
Complaint-Registration
│
├── client
│   ├── public
│   ├── src
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Complaints

| Method | Endpoint |
|----------|----------|
| POST | /api/complaints/create |
| GET | /api/complaints/user/:userId |
| PUT | /api/complaints/status/:complaintId |
| PUT | /api/complaints/assign/:complaintId |
| GET | /api/complaints/agent/:agentId |
| POST | /api/complaints/note/:complaintId |
| GET | /api/complaints/all |
| GET | /api/complaints/:complaintId |
| PUT | /api/complaints/reopen/:complaintId |

### Feedback

| Method | Endpoint |
|----------|----------|
| POST | /api/feedback/submit |
| GET | /api/feedback/all |

### Admin

| Method | Endpoint |
|----------|----------|
| GET | /api/admin/dashboard |
| PUT | /api/admin/approve/:agentId |
| GET | /api/admin/agents |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/rosh-624/VIP-C2-Roshna.git
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Future Enhancements

- Advanced Analytics Dashboard
- Automated Complaint Assignment
- Enhanced Search & Filtering
- Mobile Optimization
- Cloud Deployment
- Role-Based Activity Logs
- Complaint Priority Management

---

## Project Outcome

This project successfully demonstrates the implementation of a complete MERN Stack complaint management solution with authentication, complaint tracking, officer management, feedback collection, and administrative control.

---

## Author

**Roshna Geekuri**

B.Tech – Computer Science Engineering

MERN Stack Developer | AI & Software Development Enthusiast
