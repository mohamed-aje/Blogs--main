import React from "react";
import "../styles/blogDisplay.css";
import { AiFillDelete, AiTwotoneLike, AiFillEdit } from "react-icons/ai";
import { dt } from "../hooks/date";
import { cap } from "../hooks/capitalize";
import { Link, useParams } from "react-router-dom";
import { truncate } from "../hooks/truncate";
import { useNavigate } from "react-router-dom";
const Blog = ({ blog, addLikes, deleteHandler }) => {
  if (!blog.id) return null;
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <article className="article-recent">
        <div className="article-recent-main">
          <h2 className="article-title">{cap(blog.title)}</h2>
          <p className="article-body">{truncate(blog.content)}</p>
          <div className="button-blog">
            <Link to={`/blogs/${blog.id}`} className="article-read-more">
              Continue Reading ....
            </Link>
            <div className="blog-icons">
              <AiFillDelete size={25} onClick={deleteHandler}></AiFillDelete>
              <AiFillEdit
                onClick={() => {
                  navigate(`/blogs/${blog.id}/edit`);
                }}
                size={25}
              ></AiFillEdit>

              <AiTwotoneLike size={25} onClick={addLikes}></AiTwotoneLike>
            </div>
          </div>
        </div>
        <div className="article-recent-secondary">
          <img src={blog.url} className="article-image" />
          <p className="article-info">
            {cap(blog.author)} | {blog.likes} people like this
            <p>Created {dt(blog.createdAt)}</p>
          </p>
        </div>
      </article>
    </>
  );
};

export default Blog;
