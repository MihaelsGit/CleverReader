import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";

export default function PDFViewer({ fileID, setLoading }) {
  const [pdfURL, setPdfURL] = useState("");

  useEffect(() => {
    let path = BASE_URL + fileID;
    setPdfURL(path);
  }, [fileID]);

  return (
    <div className="container">
    <iframe className="iframe" title="pdfViewer" src={pdfURL} onLoad={setLoading(false)} />
    </div>
  );
}
