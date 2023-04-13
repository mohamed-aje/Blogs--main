import React from "react";
import TooltipCom from "./Tooltip";
const Url = ({ formData, setFormData }) => {
  return (
    <div className="url-container">
      <div className="url-container__with-icon">
        <input
          type="text"
          placeholder="Image URL..."
          value={formData.url}
          onChange={(event) =>
            setFormData({ ...formData, url: event.target.value })
          }
        />
        <TooltipCom text="You need to copy image url here!" />
      </div>
      <div>
        <input
          type="text"
          placeholder=" Blog Title..."
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Url;
