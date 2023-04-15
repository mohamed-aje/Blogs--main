import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditForm = () => {
  const navigate = useNavigate();

  return (
    <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
      <h2>Edit will be available soon</h2>
      <Link onClick={() => navigate(-1)}>Go back to blogs</Link>
    </div>
  );
};

export default EditForm;
