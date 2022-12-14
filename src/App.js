import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";
import LoadingAnimation from "./components/LoadingAnimation"

import { projectName } from "./constants/strings";
import KnowledgeGraph from "./components/KnowledgeGraph";

function App() {
  const [fileID, setFileID] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader text={projectName} />
        {loading ? (
          <div className="loading">
            <LoadingAnimation />
          </div>
        ) : null}
        <Routes>
          <Route path="/" element={<FileUpload setFileId={setFileID} setLoading={setLoading} />} />
          <Route path="/viewFile" element={<PDFViewer fileID={fileID} setLoading={setLoading} />} />
          <Route exact path="/knowledgeGraph" element={<KnowledgeGraph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
