import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer";
import SummaryModal from "./components/SummaryModal";

import { projectName } from "./constants/strings";

function App() {
  const [fileID, setFileID] = useState("");
  const [summaryModalShow, setSummaryModalShow] = useState(false);
    
  return (
    <div className="wrapper">
      <BrowserRouter>
        <CustomHeader text={projectName} setSummaryModalShow={setSummaryModalShow} />
        <Routes>
          <Route path="/" element={<FileUpload setFileId={setFileID} />} />
          <Route path="/viewFile" element={<PDFViewer fileID={fileID} />} />
        </Routes>
      </BrowserRouter>
      <SummaryModal summaryText=" sdkfsdkfh sdgkfshdgkhskdgh sdkgh" summaryModalShow={summaryModalShow} summaryModalHide={() => setSummaryModalShow(false)}/>
    </div>
  );
}

export default App;
