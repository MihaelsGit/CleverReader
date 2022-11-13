import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";

import { projectName } from "./constants/strings";

function App() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="wrapper">
      <CustomHeader text={projectName} />
      <BrowserRouter>
        <Routes>
          <Route index element={<FileUpload getFileName={setFileName} />} />
          <Route path="viewFile" element={<PDFViewer name={fileName} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
