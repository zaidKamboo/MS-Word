import React, { useContext, useEffect } from "react";
import { IoMdHappy } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    let val = isLoggedIn();
    if (!val) {
      navigate("/signup");
    }
  }, [isLoggedIn]);
  return (
    <div className="navbar-container">
      <ul className="navList">
        <li>
          <IoMdHappy className="smileIcon" />
          Welcome to our Collab editor
        </li>
        <li>
          <MdAccountCircle className="userIcon" />
          {user.name}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
