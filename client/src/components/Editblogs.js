import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import blogService from "../services/blogs";
import { AiFillDelete, AiTwotoneLike } from "react-icons/ai";
import { cap } from "../hooks/capitalize";
import { dt } from "../hooks/date";
import { Link } from "react-router-dom";

const Editblogs = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    blogService.get(`${id}`).then((res) => {
      setBlog(res);
    });
  }, []);

  console.log(blog);

  return (
    <section className="articles" style={{ marginTop: "2rem" }}>
      <article>
        <div className="article-wrapper">
          <figure>
            <img src={blog.url} alt="" />
          </figure>
          <div className="article-body">
            <div className="blog-header">
              <h2>{blog.title}</h2>
              <div className="blog-icons">
                {" "}
                <Link onClick={() => navigate(-1)}>Go back</Link>
              </div>
            </div>

            <p>{blog.content}</p>
            <p className="author-name">by {blog.author}</p>
            <div className="author-date">
              <p>{dt(blog.createdAt)}</p>
            </div>
          </div>
          <div className="likes"></div>
        </div>
      </article>
    </section>
  );
};

export default Editblogs;
