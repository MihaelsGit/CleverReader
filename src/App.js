import React from "react";

import "./styles/App.css";

import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="wrapper">
      <CustomHeader text="CleverReader" />
      <NavigationBar />
      <FileUpload />
    </div>
  );
}

export default App;
