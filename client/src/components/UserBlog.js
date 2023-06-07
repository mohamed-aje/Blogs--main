import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import Togglable from "./Togglable";
import MainNav from "./Navbar";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store";
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
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    setLoading(true);
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("token");
    if (loggedUserJSON) {
      blogService.setToken(loggedUserJSON);
    }
  }, []);

  const addBlog = (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
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
        setLoading(false);
      })
      .catch(() => {
        toast.error("Input is empty or too short.", {
          autoClose: 1500,
        });
        setLoading(false);
      });
  };

  const deleteHandler = (id) => {
    setLoading(true);
    const blog = blogs.find((b) => b.title);

    blogService
      .remove(id)
      .then((response) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));
        toast.success("Delete successful", {
          autoClose: 2000,
          toastId: blog.id,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error("You can't perform this action", {
          autoClose: 2000,
          toastId: blog.id,
        });
        setLoading(false);
      });
  };

  const addLikes = (id) => {
    setLoading(true);
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          autoClose: 1500,
          toastId: blog.id,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setLoading(false);
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
      <MainNav logout={handleLogout} />
      <Togglable
        className="user-blogs"
        buttonLabel="Create New Blog"
        name="Cancel"
      >
        <Form addBlog={addBlog} formData={formData} setFormData={setFormData} />
      </Togglable>
      {loading ? <div>Loading...</div> : blogForm()}
    </React.Fragment>
  );
};

export default UserBlog;
