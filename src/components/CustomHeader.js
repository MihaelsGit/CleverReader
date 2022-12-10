import React from "react";

import "../styles/App.css";

import NavigationBar from "./NavigationBar";

function CustomHeader({ text, setSummaryModalShow, setKnowledgeGraphShow } ) {
  return (
    <>
      <div className="header">
        {text}
        <NavigationBar 
          onSummaryClick={() => setSummaryModalShow(true)}
          onKnowledgeGraphClick={() => setKnowledgeGraphShow(true)}
        />
      </div>
    </>
  );
}

export default CustomHeader;
