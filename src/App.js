import React from "react";

import "./styles/App.css";

import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";

import { projectName } from "./constants/strings";

function App() {
  return (
    <div className="wrapper">
      <CustomHeader text={projectName} />
      <FileUpload />
    </div>
  );
}

export default App;
