import React from "react";

import "../styles/App.css";

import NavigationBar from "./NavigationBar";
import { useLocation } from "react-router-dom";

function CustomHeader({ text }) {
  const { pathname } = useLocation();

  return (
    pathname !== "/knowledgeGraph" ? (
    <>
      <div className="header">
        {text}
        <NavigationBar />
      </div>
    </>
      ) : null
  );
}

export default CustomHeader;
