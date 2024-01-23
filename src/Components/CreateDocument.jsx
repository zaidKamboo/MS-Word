import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

const CreateDocument = () => {
  const { user, setDoc, setAlert } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreateDocument = async () => {
    try {
      // Send a request to the backend to create a new document
      fetch("http://localhost:5000/document/createDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, id: user.id }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            setDoc(res.document);
            navigate(`/editor/${res.document._id}`);
            setAlert(res?.message);
          } else {
            setAlert(res?.message);
          }
        });

      // Redirect to the newly created document
      // history.push(`/documents/${response.data._id}`);
    } catch (error) {
      console.error("Error creating document:", error.message);
    }
  };

  return (
    <div className="createDocCont">
      <div className="elementsF">
        <h2 className="titleH">Create a New Document</h2>
        <label className="titleL" htmlFor="title">
          Document Title:
        </label>
        <input
          className="titleI"
          type="text"
          id="title"
          required
          value={title}
          placeholder="Enter title"
          onChange={handleTitleChange}
        />
        <center>
          <button className="titleS" onClick={handleCreateDocument}>
            Create Document
          </button>
        </center>
      </div>
    </div>
  );
};

export default CreateDocument;
