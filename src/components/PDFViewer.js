import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";

import { Fab } from "@mui/material";

import { ThemeProvider } from "@mui/material";
import { clippyTheme } from "../styles/Themes.js";
import { FaPlus, FaMinus } from "react-icons/fa";
import { initializeViewer } from "../utils/initializePDF";

export default function PDFViewer({ setLoading }) {
  const [pdfURL, setPdfURL] = useState("");

  useEffect(() => {
    setLoading(true);
    let fileID = localStorage.getItem("FILE_ID");
    if (fileID !== "") {
      let path = BASE_URL + fileID;
      setPdfURL(path);
      initializeViewer(pdfURL);
      try {
        setLoading(false);
      } catch (err) {
        console.log("Error showing PDF :( => ", err);
      }
    }
  }, [pdfURL, setLoading]);

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
