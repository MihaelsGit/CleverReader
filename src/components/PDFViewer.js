import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";

import { initializeViewer } from "../components/PDFInitialize";

export default function PDFViewer({ fileID, setLoading }) {
  const [pdfURL, setPdfURL] = useState("");

  useEffect(() => {
    let path = BASE_URL + fileID;
    setPdfURL(path);
    try {
      initializeViewer(pdfURL);
      setLoading(false);
    } catch (err) {
      console.log("Error showing PDF :( => ", err);
    }
  }, [fileID, pdfURL, setLoading]);

  return (
    <div className="container">
      <div id="viewerContainer" className="viewerContainer">
        <div id="viewer" className="pdfViewer"></div>
      </div>
    </div>
  );
}
