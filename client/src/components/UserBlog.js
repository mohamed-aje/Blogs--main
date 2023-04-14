import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import Togglable from "./Togglable";
import MainNav from "./Navbar";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import Form from "./Form";
import "../styles/userblog-toggle.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    content: "",
  });

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(authActions.logout());
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("token");
    if (loggedUserJSON) {
      blogService.setToken(loggedUserJSON);
    }
  }, []);
  const addBlog = (e) => {
    const blogObject = {
      title: formData.title,
      author: formData.author,
      url: formData.url,
      content: formData.content,
    };
    blogService
      .create(blogObject)
      .then((returnedObject) => {
        setBlogs(blogs.concat(returnedObject));
        navigate(`/blogs/${returnedObject.id}`);
      })
      .catch(() => {
        toast.error("Input is empty or too short.", {
          autoClose: 1500,
        });
      });
  };

  const deleteHandler = (id) => {
    const blog = blogs.find((b) => b.title);

    blogService
      .remove(id)
      .then((response) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));
      })
      .then(() =>
        toast.success("Delete successful", {
          autoClose: 2000,
          toastId: blog.id,
        })
      )
      .catch((err) => {
        toast.error("You can't perform this action", {
          autoClose: 2000,
          toastId: blog.id,
        });
      });
  };

  const addLikes = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          autoClose: 1500,
          toastId: blog.id,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const blogForm = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={(id) => addLikes(blog.id)}
          deleteHandler={(id) => deleteHandler(blog.id)}
        />
      ));

  return (
    <React.Fragment>
      <MainNav logout={logout} />
      <Togglable
        className="user-blogs"
        buttonLabel="Create New Blog"
        name="Cancel"
      >
        <Form addBlog={addBlog} formData={formData} setFormData={setFormData} />
      </Togglable>
      {blogForm()}
    </React.Fragment>
  );
};
export default UserBlog;
