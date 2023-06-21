import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../store"; // Update the import statement
import { toast } from "react-toastify";
import "../styles/loginform.css";
import loginService from "../services/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService.login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);
      dispatch(signin());
      toast.success("You are logged in!", { autoClose: 1500 });
      navigate("/blogs");
    } catch (error) {
      toast.error("Wrong credentials", { autoClose: 1500 });
      setPassword(""); // Clear the password field
    }
  };

  return (
    <div className="login-box">
      <p style={{ color: "white" }}>{message}</p>
      <div className="text-container">
        <h2>Blogs Login</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="user-box">
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup">
          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <button type="submit" className="login-link">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
