import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserBlog from "./components/UserBlog";
import SignupForm from "./components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./store/index";
import Editblogs from "./components/Editblogs";
import EditForm from "./components/EditForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./components/userProfile";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(signin());
    }
  }, [dispatch]);

  // Redirect to the login page if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

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
