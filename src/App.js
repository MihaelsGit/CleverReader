import React from "react";
import PDFViewer from "./components/PDFViewer";
import FileUpload from "./components/FileUpload";

import { test } from "./constants/testUrls";

function App() {
  return (
    <div className="App">
      <h1>Hello there</h1>
      <FileUpload />
      <PDFViewer url={test} />
    </div>
  );
}

export default App;
