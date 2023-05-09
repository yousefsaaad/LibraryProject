import React from "react";
import "../style/navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          {" "}
          <Link to={"/userhomepage"}>Home</Link>{" "}
        </li>
        <li>About</li>
        <li>
          <Link to={"/contact"}>contact</Link>
        </li>
        <li>Show a list of borrowed book</li>
      </ul>
    </div>
  );
}

export default NavBar;
