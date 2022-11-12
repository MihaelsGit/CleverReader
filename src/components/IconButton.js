import React from "react";
import "../styles/Button.css";

function IconButton({ iconPath, onButtonClick }) {
  return (
      <button
        type="submit"
          class="iconButton"
          onClick={onButtonClick}
      >
        <img src={iconPath} alt='iconButton' />
      </button>
  );    
}

export default IconButton;