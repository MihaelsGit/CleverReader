import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";
import LoadingAnimation from "./LoadingAnimation"

export default function PDFViewer({ fileID }) {
  const [pdfURL, setPdfURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let path = BASE_URL + fileID;
    setPdfURL(path);
  }, [fileID]);

  const hideLoadingAnimation = () => {
    setLoading(false);
    };

  return (
    <div className="container">
      {loading ? (
        <div className = "loading">
            <LoadingAnimation />
        </div>
        
      ) : null}
      
    <iframe className="iframe" title="pdfViewer" src={pdfURL} onLoad={hideLoadingAnimation} />
    </div>
  );
}
