import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import blogService from "../services/blogs";
import { AiFillDelete, AiTwotoneLike } from "react-icons/ai";
import { cap } from "../hooks/capitalize";
import { dt } from "../hooks/date";
import { Link } from "react-router-dom";
import "../styles/blog.css";

const Editblogs = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    blogService.get(`${id}`).then((res) => {
      setBlog(res);
    });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <div className="article-wrapper">
        <figure>
          <img src={blog.url} alt="" />
        </figure>
        <div className="article__body">
          <div className="blog-header">
            <h2>{blog.title}</h2>
            <div className="blog-icons">
              {" "}
              <Link className="back-button" onClick={() => navigate(-1)}>
                Go back to blogs
              </Link>
            </div>
          </div>

          <p>{blog.content}</p>
          <div className="author-date">
            <p className="author-name">by {blog.author}</p>

            <p>{dt(blog.createdAt)}</p>
          </div>
        </div>
        <div className="likes"></div>
      </div>
    </article>
  );
};

export default Editblogs;
