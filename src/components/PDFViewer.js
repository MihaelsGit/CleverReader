import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";

import { Fab } from "@mui/material";

import { FaPlus, FaMinus } from "react-icons/fa";

import { initializeViewer } from "../utils/initializePDF";
import { zoomIn, zoomOut } from "../utils/viewerFunctions";

export default function PDFViewer({ fileID, setLoading }) {
  const [pdfURL, setPdfURL] = useState("");
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (fileID !== "") {
      let path = BASE_URL + fileID;
      setPdfURL(path);
      try {
        setViewer(initializeViewer(pdfURL));
        setLoading(false);
      } catch (err) {
        console.log("Error showing PDF :( => ", err);
      }
    }
  }, [fileID, pdfURL, setLoading]);

  return (
    <div className="container">
      <div id="viewerContainer" className="viewerContainer">
        <div id="viewer" className="pdfViewer"></div>
      </div>
      <div className="buttons">
        <Fab
          color="primary"
          aria-label="zoom-in"
          onClick={() => zoomIn(viewer)}
        >
          <FaPlus />
        </Fab>
        <Fab
          color="primary"
          aria-label="zoom-out"
          onClick={() => zoomOut(viewer)}
        >
          <FaMinus />
        </Fab>
      </div>
    </div>
  );
}
