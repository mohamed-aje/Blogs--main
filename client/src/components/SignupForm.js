import React, { useState } from "react";
import "../styles/loginform.css";
import signupService from "../services/signup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signupService
        .signup({
          email,
          password,
          firstName,
          lastName,
        })
        .then(() => {
          setMessage("You've Successfully signed up!");
        });
      navigate("/login");
    } catch (exception) {
      setMessage("wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="login-box">
      <p style={{ color: "white" }}>{message}</p>
      <div className="text-container">
        <h2>Blogs Register</h2>
      </div>{" "}
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="firstname"
            required=""
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label>First Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="lastName"
            required=""
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <label>Last Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="email"
            required=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="user-box">
          <input
            type="password"
            name="password"
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className="signup">
          <p className="signup-text">
            Already Have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
        <a className="login-link">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button>Sign up</button>
        </a>
      </form>
    </div>
  );
};
export default SignupForm;
