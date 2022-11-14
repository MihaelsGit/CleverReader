import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";

import { projectName } from "./constants/strings";

function App() {
  const [fileID, setFileID] = useState("");
  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader text={projectName} />
        <Routes>
          <Route path="/" element={<FileUpload setFileId={setFileID} />} />
          <Route path="/viewFile" element={<PDFViewer fileID={fileID} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
