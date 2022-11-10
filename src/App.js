import React from "react";

import "./styles/App.css";

import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="wrapper">
      <CustomHeader text="CleverReader" />
      <FileUpload />
    </div>
  );
}

export default App;
