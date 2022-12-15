import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";
import SummaryModal from "./components/SummaryModal";
import KnowledgeGraphModal from "./components/KnowledgeGraphModal";
import LoadingAnimation from "./components/LoadingAnimation"

import { projectName } from "./constants/strings";

function App() {
  const [fileID, setFileID] = useState("");

  const [summaryModalShow, setSummaryModalShow] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  
  const [knowledgeGraphModalShow, setKnowledgeGraphModalShow] = useState(false);   
  const [knowledgeGraph, setKnowledgeGraph] = useState("");
  
  const [loading, setLoading] = useState(false);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader 
          text={projectName} 
          setSummaryModalShow={setSummaryModalShow}
          setKnowledgeGraphShow={setKnowledgeGraphModalShow}
        />
        {loading ? (
          <div className="loading">
            <LoadingAnimation />
          </div>
        ) : null}
        <Routes>
          <Route 
            path="/" 
            element={
              <FileUpload 
                setFileId={setFileID} 
                setSummaryText={setSummaryText}
                setKnowledgeGraph={setKnowledgeGraph}
                setLoading={setLoading}
              />
            } 
          />
          <Route
            path="/viewFile"
            element={
              <PDFViewer 
                fileID={fileID} 
                setLoading={setLoading} 
              />
            }
          />
        <CustomHeader text={projectName} />
        {loading ? (
          <div className="loading">
            <LoadingAnimation />
          </div>
        ) : null}
        </Routes>
        <SummaryModal 
          summaryText={summaryText}
          summaryModalShow={summaryModalShow} 
          summaryModalHide={() => setSummaryModalShow(false)}
        />
        <KnowledgeGraphModal
          knowledgeGraph={knowledgeGraph}
          knowledgeGraphModalShow={knowledgeGraphModalShow} 
          knowledgeGraphModalHide={() => setKnowledgeGraphModalShow(false)}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
