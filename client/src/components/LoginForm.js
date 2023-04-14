import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import "../styles/loginform.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService
        .login({
          email,
          password,
        })
        .then((data) => localStorage.setItem("token", data.token))
        .then(() => {
          dispatch(authActions.signin());
          toast.success("You are logged in!!", { autoClose: 1500 });
          navigate("/blogs");
        });
    } catch (exception) {
      toast.error("Wrong credentials", { autoClose: 1500 });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <a className="login-link">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button>Login</button>
        </a>
      </form>
    </div>
  );
};
export default LoginForm;
