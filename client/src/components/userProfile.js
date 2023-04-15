import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import UserDisplay from "./UserDispaly";
const UserProfile = () => {
  useEffect(() => {});
  const navigate = useNavigate();

  return (
    <div>
      {/* <div className="container ">
        <div className="row">
          <div className="col-md-8">
            <AddUser />
          </div>
          <div className="col-md-4">
            <UserDisplay />
          </div>
        </div>
      </div> */}
      <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
        <h2>User profile will be available soon</h2>
        <Link style={{ color: "#fff" }} onClick={() => navigate(-1)}>
          Go back to blogs
        </Link>
      </div>
    </div>
  );
};
export default UserProfile;
