import React, { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { Link, useNavigate } from "react-router-dom";

const DocumentList = () => {
  const { setDoc, setAlert, user, documents, setDocs } =
    useContext(UserContext);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    try {
      fetch(`http://localhost:5000/document/deleteDocument/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.success) {
            setAlert(res?.message);
            navigate("/dashboard");
            setDocs(res?.documents);
          } else {
            setAlert(res?.message);
          }
        });
    } catch (error) {
      setAlert(error.message);
    }
  };
  return (
    <div className="documentsContainer">
      {documents.length === 0 ? (
        <>
          <div className="DCheader">
            <h1 className="">
              No docs created.Create documents to view them here.
            </h1>
          </div>
        </>
      ) : (
        <>
          {documents.map((doc) => (
            <div className="card" key={doc?._id}>
              <h1 className="cardTitle">{doc?.title}</h1>
              <hr />
              <p className="cardContent">{doc?.content}</p>
              <div className="btnCons">
                <Link
                  className="edit"
                  to={`/editor/${doc?._id}`}
                  onClick={() => setDoc(doc)}
                  style={{ textDecoration: "none" }}
                >
                  Edit
                </Link>
                <button
                  className="dlt"
                  onClick={() => {
                    handleDelete(doc?._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DocumentList;
