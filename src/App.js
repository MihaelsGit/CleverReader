import React from "react";
import PDFViewer from "./components/PDFViewer";
import FileUpload from "./components/FileUpload";

import CustomButton from "./components/CustomButton";
import FileDropzone from "./components/FileDropzone";

import { test } from "./constants/testUrls";

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
      {/*<FileUpload />*/}
      {/*<PDFViewer url={test} />*/}
    </div>
  );
}

export default App;
