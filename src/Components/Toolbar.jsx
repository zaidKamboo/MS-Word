import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

const Toolbar = () => {
  const { document, user, setDoc, setAlert } = useContext(UserContext);
  const [editorValue, setEditorValue] = useState(document?.content);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleSave = () => {
    let titleu = title;
    if (title === "") {
      titleu = document?.title;
    }
    let content = stripHtmlTags(editorValue);
    try {
      fetch(`http://localhost:5000/document/edit/${document?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleu,
          id: user.id,
          content,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setAlert(res?.message);
            setDoc(res?.document);
            navigate(`/dashboard`);
          } else {
            setAlert(res?.message);
          }
        });
    } catch (error) {
      setAlert(error?.message);
    }
  };
  return (
    <div className="toolbar-container">
      <div className="titleDiv">
        <label htmlFor="title" className="titleLabel">
          {document?.title}
        </label>
        <input
          className="titleInput"
          type="text"
          minLength={3}
          maxLength={8}
          placeholder="Enter here new document title value to edit document title : "
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <ReactQuill
        className="toolbar-editor"
        value={editorValue}
        onChange={setEditorValue}
      />
      <div className="buttonContainer">
        <button className="submitButton" onClick={handleSave}>
          Save Document
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
