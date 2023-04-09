import React, { useEffect } from "react";
import AddUser from "./AddUser";
import UserDisplay from "./UserDispaly";
const UserProfile = () => {
  useEffect(() => {});
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-md-8">
            <AddUser />
          </div>
          <div className="col-md-4">
            <UserDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
