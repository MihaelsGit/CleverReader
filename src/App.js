import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";
import SummaryModal from "./components/SummaryModal";
import LoadingAnimation from "./components/LoadingAnimation";

import { projectName } from "./constants/strings";
import KnowledgeGraph from "./components/KnowledgeGraph";
import { getSummaryText } from "./utils/axios";

function App() {
  const [summaryText, setSummaryText] = useState("");
  const [modalLoading, setModalLoading] = useState(true);

  const [knowledgeGraphModalShow, setKnowledgeGraphModalShow] = useState(false);
  const [knowledgeGraphData, setKnowledgeGraphData] = useState("");

  const [loading, setLoading] = useState(false);

  const [pdfFile, setPdfFile] = useState(null);

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

  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader
          text={projectName}
          summaryText={summaryText}
          modalLoading={modalLoading}
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
              />
            }
          />
          <Route
            path="/viewFile/"
            element={
              <PDFViewer
                setLoading={setLoading}
                setSummaryText={setSummaryText}
                setKnowledgeGraphData={setKnowledgeGraphData}
                pdfFile={pdfFile}
              />
            }
          />
          <Route exact path="/knowledgeGraph" element={<KnowledgeGraph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
