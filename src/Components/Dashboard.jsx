import React, { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import DocumentList from "./DocumentList";

const Dashboard = () => {
  const { isLoggedIn, setDocs, setAlert, user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/signup");
    }
    try {
      fetch(`http://localhost:5000/document/getDocuments/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.success) {
            setAlert(res?.message);
            setDocs(res?.documents);
          } else {
            setAlert(res?.message);
          }
        });
    } catch (error) {
      setAlert(error.message);
    }
  }, []);
  return (
    <div className="dashboard-container">
      <DocumentList />
    </div>
  );
};

export default Dashboard;
