import React from "react";

import "../styles/App.css";

import NavigationBar from "./NavigationBar";

function CustomHeader({ text }) {
  return (
    <>
      <div className="header">
        {text}
        <NavigationBar />
      </div>
    </>
  );
}

export default CustomHeader;
