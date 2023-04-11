import React from "react";
import Togglable from "./Togglable";
import "../styles/blog.css";
import { IoThumbsUpOutline } from "react-icons/io5";
import { Card, Button } from "react-bootstrap";
import { dt } from "../hooks/date";
const Blog = ({ blog, addLikes, deleteHandler }) => {
  if (!blog.id) return null;

  return (
    <Card className={"card-grid"}>
      <Card.Img className="card-image" variant="top" src={blog.url} />

      <Card.Body>
        <div className="card-title">
          <p className="title-name"> {blog.title}</p>
          <p className="author-name">{blog.author}</p>
        </div>
        <p className="date">created at: {dt(blog.createdAt)}</p>

        <Card.Text>
          <p>{blog.content}</p>
        </Card.Text>
        <Card.Text>
          <p>{blog.likes} people like this blog</p>
        </Card.Text>
      </Card.Body>
      <div className="button-group">
        <Button variant="primary" onClick={deleteHandler}>
          Delete
        </Button>
        <Button variant="primary" onClick={addLikes}>
          Like
        </Button>
      </div>
    </Card>
  );
};

export default Blog;
