import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MainNav from "./components/Navbar";
import UserBlog from "./components/UserBlog";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/userProfile";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { Navbar } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginForm /> : <Navigate to="/blogs" />}
          />
          <Route
            path="/blogs"
            element={isLoggedIn ? <UserBlog /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignupForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
