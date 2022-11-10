import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Button.css";

function CustomButton() {
  return (
    <div className="button">
      <button type="submit" className="btn btn-outline-primary">
        UPLOAD
      </button>
    </div>
  );
}

export default CustomButton;
