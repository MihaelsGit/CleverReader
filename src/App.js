import React from "react";

import CustomButton from "./components/CustomButton";
import FileDropzone from "./components/FileDropzone";

import "./styles/App.css";
import CustomHeader from "./components/CustomHeader";

function App() {
  return (
    <div className="wrapper">
      <CustomHeader text="CleverReader" />
      <div className="dropzone">
        <FileDropzone />
        <CustomButton />
      </div>
    </div>
  );
}

export default App;
