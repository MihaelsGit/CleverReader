import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Button.css";

function SubmitButton({ uploadOnClick }) {
  return (
    <div className="button">
      <button
        type="submit"
        className="btn btn-outline-primary"
        onClick={uploadOnClick}
      >
        UPLOAD
      </button>
    </div>
  );
}

export default SubmitButton;
