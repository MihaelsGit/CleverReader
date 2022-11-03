import React, { useState } from "react";
import PDFViewer from "./components/PDFViewer";
import FileUpload from "./components/FileUpload";

import { BASE_URL, DOWNLOAD_URL } from "./constants/path";

function App() {
  const [url, setUrl] = useState("");

  return (
    <div className="App">
      <h1>Hello there</h1>
      <FileUpload setLink={setUrl} />
      <PDFViewer url={BASE_URL + DOWNLOAD_URL + url} />
    </div>
  );
}

export default App;
