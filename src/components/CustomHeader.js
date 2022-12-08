import React from "react";

import "../styles/App.css";

import NavigationBar from "./NavigationBar";

function CustomHeader({ text, setSummaryModalShow } ) {
  return (
    <>
      <div className="header">
        {text}
        <NavigationBar onSummaryClick={() => setSummaryModalShow(true)}/>
      </div>
    </>
  );
}

export default CustomHeader;
