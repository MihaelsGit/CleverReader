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

  const hideSpinner = () => {
    setLoading(false);
    };

  const loadingStyle = {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
          }

  return (
    <div className="container">
      {loading ? (
        <div style={loadingStyle}>
            <LoadingAnimation />
        </div>
        
      ) : null}
      
    <iframe className="iframe" title="pdfViewer" src={pdfURL} onLoad={hideSpinner} />
    </div>
  );
}

/*style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
          }}*/