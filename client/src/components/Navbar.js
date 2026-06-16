import React from "react";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>Complaint Portal</h2>

      <div>
        <button onClick={() => window.location.href = "/dashboard"}>
          User
        </button>

        <button onClick={() => window.location.href = "/officer"}>
          Officer
        </button>

        <button onClick={() => window.location.href = "/admin"}>
          Admin
        </button>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;