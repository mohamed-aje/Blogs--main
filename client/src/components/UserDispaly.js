import React, { useState } from "react";
import service from "../services/blogs";
const UserDisplay = ({ getAllUsers }) => {
  const [numberofUsers, setNumberofuses] = useState(0);
  const getAll = () => {
    service.getAll("/api/users").then((res) => setNumberofuses(res.length));
  };
  return (
    <div className="display-board">
      <h4 style={{ color: "white" }}>Users Created</h4>
      <div className="number">{numberofUsers}</div>
      <div className="btn">
        <button
          type="button"
          onClick={(e) => getAll()}
          className="btn btn-warning"
        >
          Get all Users
        </button>
      </div>
    </div>
  );
};
export default UserDisplay;
