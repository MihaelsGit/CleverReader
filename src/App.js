import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";
import LoadingAnimation from "./components/LoadingAnimation";

import { projectName } from "./constants/strings";
import { getKnowledgeGraph, getSummaryText } from "./utils/axios";
import KnowledgeGraphModal from "./components/KnowledgeGraphModal";

function App() {
  const [summaryText, setSummaryText] = useState("");
  const [modalLoading, setModalLoading] = useState(true);

  const [references, setReferences] = useState(null);
  const [knowledgeGraphOpen, setKnowledgeGraphOpen] = useState(false);
  const [knowledgeGraphLoading, setKnowledgeGraphLoading] = useState(true);

  const [loading, setLoading] = useState(false);

  const [pdfFile, setPdfFile] = useState(null);
  const [fileId, setFileId] = useState("");

  useEffect(() => {
    (async () => {
      if (pdfFile !== null) {
        const data = new FormData();
        data.append("file", pdfFile);
        let summary = await getSummaryText({ data: data });
        if (summary.data !== null) {
          setSummaryText(summary);
          setModalLoading(false);
        }
      }
    })();
  }, [pdfFile]);

  useEffect(() => {
    let fileID = localStorage.getItem("FILE_ID");
    if (fileID) {
      (async () => {
        let tmp = await getKnowledgeGraph({ pdfId: fileID });
        if (tmp !== null) {
          setReferences(tmp);
        }
      })();
    }
  }, [fileId]);

  useEffect(() => {
    if (knowledgeGraphOpen) {
      setKnowledgeGraphLoading(false);
    } else if (references !== null && knowledgeGraphOpen) {
      setKnowledgeGraphOpen(true);
    }
  }, [knowledgeGraphOpen, references]);

  const closeKnowledgeGraph = () => {
    setKnowledgeGraphOpen(false);
  };

  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader
          text={projectName}
          summaryText={summaryText}
          modalLoading={modalLoading}
          setKnowledgeGraphOpen={setKnowledgeGraphOpen}
          knowledgeGraphLoading={knowledgeGraphLoading}
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
                setLoading={setLoading}
                setPdfFile={setPdfFile}
                setModalLoading={setModalLoading}
                setSummaryText={setSummaryText}
                setKnowledgeGraphLoading={setKnowledgeGraphLoading}
                setReferences={setReferences}
                setFileId={setFileId}
              />
            }
          />
          <Route
            path="/viewFile/"
            element={
              <PDFViewer
                setLoading={setLoading}
                setSummaryText={setSummaryText}
                pdfFile={pdfFile}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <KnowledgeGraphModal
        references={references}
        knowledgeGraphModalShow={knowledgeGraphOpen}
        knowledgeGraphModalHide={closeKnowledgeGraph}
      />
    </div>
  );
}

export default App;
