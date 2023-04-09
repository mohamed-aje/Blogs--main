import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("token");
    if (loggedUserJSON) {
      blogService.setToken(loggedUserJSON);
    }
  }, []);

  const deleteHandler = (id) => {
    const blog = blogs.find((b) => b.title);

    const confirmed = window.confirm(`remove ${blog.title}`);
    if (confirmed) {
      blogService.remove(id).then((response) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));
      });

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
  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogService.create(blogObject).then((returnedObject) => {
      setBlogs(blogs.concat(returnedObject));

      setTitle("");
      setAuthor("");
      setUrl("");
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
    <div className="container">
      <Togglable buttonLabel="new blog" name="cancel">
        <BlogForm
          handleblog={addBlog}
          title={title}
          author={author}
          url={url}
          titleChange={({ target }) => setTitle(target.value)}
          urlChange={({ target }) => setUrl(target.value)}
          authorChange={({ target }) => setAuthor(target.value)}
        />
      </Togglable>
      {blogForm()}
    </div>
  );
};
export default UserBlog;
