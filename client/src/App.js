import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserBlog from "./components/UserBlog";
import SignupForm from "./components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./store";
import Editblogs from "./components/Editblogs";
import EditForm from "./components/EditForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./components/userProfile";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(signin());
    }
  }, [dispatch, isLoggedIn, token]);

  useEffect(() => {
    if (!isLoggedIn && !token) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn, token]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={<UserBlog />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route exact path="/user-profile" element={<UserProfile />} />
        <Route exact path="/blogs/:id" element={<Editblogs />} />
        <Route exact path="/blogs/:id/edit" element={<EditForm />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
