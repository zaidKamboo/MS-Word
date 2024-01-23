import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const { logout, setAlert } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    setAlert("Logged out successfully.");
  };
  // setAlert("Hello");
  return (
    <div className="side-bar-container">
      <div className="sideListContainer">
        <Link
          className={`sideLinks ${active === "dashboard" ? "active" : ""}`}
          to="/dashboard"
          onClick={() => setActive("dashboard")}
        >
          Dashboard &#x2197;
        </Link>
        <Link
          className={`sideLinks ${
            active === "create-document" ? "active" : ""
          }`}
          to="/create-document"
          onClick={() => setActive("create-document")}
        >
          Create Document &#x2197;
        </Link>
        <Link className="sideLinks" to="/login" onClick={() => handleLogout()}>
          Logout &#x2197;
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
