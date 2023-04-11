import React from "react";

const Author = ({ formData, setFormData }) => {
  return (
    <div className="author-container">
      <input
        type="text"
        placeholder="Blog Author..."
        value={formData.author}
        onChange={(e) => {
          setFormData({ ...formData, author: e.target.value });
        }}
      />
    </div>
  );
};

export default Author;
