import React from "react";
import PDFViewer from "./components/PDFViewer";
import FileUpload from "./components/FileUpload";

import { test } from "./constants/testUrls";

import "./styles/App.css";

function App() {
  return (
    <div className="wrapper">
      <h1>Clever Reader</h1>
      <FileUpload />
      {/*<PDFViewer url={test} />*/}
    </div>
  );
}

export default App;
