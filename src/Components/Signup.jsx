import React, { useContext, useRef } from "react";
import { UserContext } from "../store/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ type }) => {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const { user, setUser, setAlert } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let em = email.current.value;
    let pa = password.current.value;
    try {
      if (type === "Sign up") {
        let nm = name.current.value;
        fetch("http://localhost:5000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: nm, email: em, password: pa }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setAlert(res?.message);
              setUser(res?.user);
              navigate("/dashboard");
            } else {
              setAlert(res?.message);
            }
          });
      } else {
        fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: em, password: pa }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setAlert(res?.message);
              setUser(res.user);
              navigate("/dashboard");
            } else {
              setAlert(res?.message);
            }
          });
      }
    } catch (error) {
      setAlert(error?.message);
    }
  };
  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="formDiv">
        <center>
          <h2>Please {type} to continue...</h2>
        </center>
        {type === "Sign up" && (
          <>
            <label className="labels" htmlFor="name">
              Name
            </label>
            <input
              ref={name}
              required
              className="inputs"
              type="text"
              placeholder="Enter your name "
            />
          </>
        )}
        <label className="labels" htmlFor="email">
          Email
        </label>
        <input
          ref={email}
          required
          className="inputs"
          type="email"
          placeholder="Enter your email "
        />
        <label className="labels" htmlFor="passwords">
          Password
        </label>
        <input
          ref={password}
          required
          className="inputs"
          type="password"
          placeholder="Enter your password "
        />
        <center>
          <input className="btnSub inputs" type="submit" value={type} />
          <Link
            className="btnSub link"
            to={`${type === "Sign up" ? "/login" : "/signup"}`}
          >
            {type === "Sign up" ? "Login " : "Sign up"}
          </Link>
        </center>
      </div>
    </form>
  );
};

export default Signup;
