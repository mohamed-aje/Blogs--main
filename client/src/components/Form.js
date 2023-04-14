import React, { useState } from "react";
import Author from "./Author";
import Content from "./Content";
import Url from "./Url";
import "../styles/form.css";
import { useNavigate } from "react-router";

const Form = ({ formData, addBlog, setFormData }) => {
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const FormTitles = ["Blog Author", "Url & Title", "Blog Content"];
  const PageDisplay = () => {
    if (page === 0) {
      return <Author formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Url formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <Content formData={formData} setFormData={setFormData} />;
    }
  };
  return (
    <div className="form" onSubmit={addBlog}>
      <div className="progress-bar">
        <div
          style={{
            width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%",
          }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            type="submit"
            onClick={() => {
              if (page === FormTitles.length - 1) {
                addBlog();
                navigate("/blogs");
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
