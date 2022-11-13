import React from "react";

import "../styles/App.css";
import { Outlet } from "react-router-dom";

import NavigationBar from "./NavigationBar";

function CustomHeader({ text }) {
  return (
    <>
      <div className="header">
        {text}
        <NavigationBar />
      </div>
      <Outlet />{" "}
      {/*This tag is added in order to render the route children of the component*/}
    </>
  );
}

export default CustomHeader;
