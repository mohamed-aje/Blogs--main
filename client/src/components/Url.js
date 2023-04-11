import React from "react";

const Url = ({ formData, setFormData }) => {
  return (
    <div className="url-container">
      <input
        type="text"
        placeholder="Blog URL..."
        value={formData.url}
        onChange={(event) =>
          setFormData({ ...formData, url: event.target.value })
        }
      />
      <input
        type="text"
        placeholder=" Blog Title..."
        value={formData.title}
        onChange={(event) =>
          setFormData({ ...formData, title: event.target.value })
        }
      />
    </div>
  );
};

export default Url;
