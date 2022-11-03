import React, { useState } from "react";
import PDFViewer from "./components/PDFViewer";
import FileUpload from "./components/FileUpload";

import { test } from "./constants/testUrls";

function App() {
  const [url, setUrl] = useState("");

  return (
    <div className="App">
      <h1>Hello there</h1>
      <FileUpload setLink={setUrl} />
      <PDFViewer
        url={"http://localhost:8000/api/v1/file/download?name=" + url}
      />
    </div>
  );
}

export default App;
