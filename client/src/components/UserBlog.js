import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import MainNav from "./Navbar";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import Form from "./Form";
import "../styles/userblog-toggle.css";

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
    blogService.create(blogObject).then((returnedObject) => {
      setBlogs(blogs.concat(returnedObject));
      window.location.reload();

      window.re;
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const deleteHandler = (id) => {
    const blog = blogs.find((b) => b.title);

    const confirmed = window.confirm(`remove ${blog.title}`);
    if (confirmed) {
      blogService
        .remove(id)
        .then((response) => {
          setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));
        })
        .then(() => setMessage("Delete successful"));

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
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
        setMessage("Something went wrong");
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
      <div className="container">
        <p>{message}</p>

        <Togglable
          className="user-blogs"
          buttonLabel="Create New Blog"
          name="Cancel"
        >
          <Form
            addBlog={addBlog}
            formData={formData}
            setFormData={setFormData}
          />
        </Togglable>
        {blogForm()}
      </div>
    </React.Fragment>
  );
};
export default UserBlog;
