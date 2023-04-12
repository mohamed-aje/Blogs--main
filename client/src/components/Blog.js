import React from "react";
import Togglable from "./Togglable";
import "../styles/blog.css";
import { AiFillDelete, AiTwotoneLike } from "react-icons/ai";
import { dt } from "../hooks/date";
import { cap } from "../hooks/capitalize";
const Blog = ({ blog, addLikes, deleteHandler }) => {
  if (!blog.id) return null;

  return (
    <section className="articles">
      <article>
        <div className="article-wrapper">
          <figure>
            <img src={blog.url} alt="" />
          </figure>
          <div className="article-body">
            <div className="blog-header">
              <h2>{blog.title}</h2>
              <div className="blog-icons">
                <AiFillDelete size={28} onClick={deleteHandler}></AiFillDelete>
                <AiTwotoneLike size={28} onClick={addLikes}></AiTwotoneLike>
              </div>
            </div>

            <p>{blog.content}</p>
            <div className="link-author">
              <a href="#" className="read-more">
                Read more{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <p className="author-name">by {cap(blog.author)}</p>
            </div>
            <div className="author-date">
              <p>{dt(blog.createdAt)}</p>
            </div>
          </div>
        </div>
      </article>
      <div className="likes">
        <p>{blog.likes} people like this.</p>
      </div>
    </section>
  );
};

export default Blog;
