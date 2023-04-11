import React from "react";

const Content = ({ formData, setFormData }) => {
  return (
    <div className="content-container">
      <textarea
        type="text"
        placeholder="Content..."
        value={formData.content}
        onChange={(e) => {
          setFormData({ ...formData, content: e.target.value });
        }}
      />
    </div>
  );
};

export default Content;
