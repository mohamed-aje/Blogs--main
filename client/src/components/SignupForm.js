import React, { useState } from "react";
import "../styles/loginform.css";
import signupService from "../services/signup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupService.signup({
        email,
        password,
        firstName,
        lastName,
      });

      toast.success(
        "You've successfully signed up! You will be redirected to the login page!",
        {
          autoClose: 2000,
        }
      );

      navigate("/login");
    } catch (exception) {
      toast.error("Email already exists!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-box">
      <div className="text-container">
        <h2>Blogs Register</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
          />
        </div>
        <div className="user-box">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="user-box">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="signup">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
        <div className="login-link">
          <button type="submit" className="login-button">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
