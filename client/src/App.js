import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserBlog from "./components/UserBlog";
import SignupForm from "./components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
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
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <ToastContainer />
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
        <Route exact path="/user-profile" element={<UserProfile />} />
        <Route exact path="/blogs/:id" element={<Editblogs />} />
        <Route exact path="/blogs/:id/edit" element={<EditForm />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
