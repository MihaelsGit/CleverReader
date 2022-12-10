import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";
import SummaryModal from "./components/SummaryModal";
import KnowledgeGraphModal from "./components/KnowledgeGraphModal";
import { projectName } from "./constants/strings";

function App() {
  const [fileID, setFileID] = useState("");
  const [summaryModalShow, setSummaryModalShow] = useState(false);
  const [knowledgeGraphModalShow, setKnowledgeGraphModalShow] = useState(false);   


  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader 
          text={projectName} 
          setSummaryModalShow={setSummaryModalShow}
          setKnowledgeGraphShow={setKnowledgeGraphModalShow}
        />
        <Routes>
          <Route path="/" element={<FileUpload setFileId={setFileID} />} />
          <Route path="/viewFile" element={<PDFViewer fileID={fileID} />} />
        </Routes>
        <SummaryModal 
          summaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." 
          summaryModalShow={summaryModalShow} 
          summaryModalHide={() => setSummaryModalShow(false)}
        />
        <KnowledgeGraphModal
          knowledgeGraphModalShow={knowledgeGraphModalShow} 
          knowledgeGraphModalHide={() => setKnowledgeGraphModalShow(false)}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
