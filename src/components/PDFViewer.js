import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";

import { Fab } from "@mui/material";

import { ThemeProvider } from "@mui/material";
import { clippyTheme } from "../styles/Themes.js";
import { FaPlus, FaMinus } from "react-icons/fa";
import { initializeViewer } from "../utils/initializePDF";
import { getKnowledgeGraph, getSummaryText } from "../utils/axios";

export default function PDFViewer({ setLoading, setSummaryText, pdfFile }) {
  const [pdfURL, setPdfURL] = useState("");

  const [pdfId, setPdfId] = useState("");
  /*
  useEffect(() => {
    (async () => {
      if (pdfFile !== null) {
        const data = new FormData();
        data.append("file", pdfFile);
        let summary = await getSummaryText({ data: data });
        if (summary.data !== null) {
          setSummaryText(summary);
        }
      }
    })();

    let fileID = localStorage.getItem("FILE_ID");
    if (fileID !== "") {
      (async () => {
        let references = await getKnowledgeGraph({ pdfId: fileID });
        console.log("reference => ", references);
      })();
    }
  }, []);*/

  useEffect(() => {
    setLoading(true);
    let fileID = localStorage.getItem("FILE_ID");
    setPdfId(fileID);
    if (pdfId !== "") {
      let path = BASE_URL + pdfId;
      setPdfURL(path);
      initializeViewer(pdfURL);
      try {
        setLoading(false);
      } catch (err) {
        console.log("Error showing PDF :( => ", err);
      }
    }
  }, [pdfId, pdfURL, setLoading]);

  return (
    <div className="container">
      <div id="viewerContainer" className="viewerContainer">
        <div id="viewer" className="pdfViewer"></div>
      </div>
      <div className="buttons">
        <ThemeProvider theme={clippyTheme}>
          <Fab id="zoomInBtn" color="primary" aria-label="zoom-in">
            <FaPlus />
          </Fab>
          <Fab id="zoomOutBtn" color="primary" aria-label="zoom-out">
            <FaMinus />
          </Fab>
        </ThemeProvider>
      </div>
    </div>
  );
}
