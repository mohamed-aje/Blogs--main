import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ logout }) => {
  return (
    <div className="navbar ">
      <Link to="/blogs">Blogs</Link>
      <div className="dropdown">
        <button className="dropbtn">
          Settings
          <IoMdArrowDropdown className="arrow down"></IoMdArrowDropdown>
        </button>
        <div className="dropdown-content">
          <Link to="/user-profile">Profile</Link>
          <Link onClick={(e) => logout(e)}>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
