import React, { useEffect, useState } from "react";
import "../styles/error.css";
import { BASE_URL } from "../constants/path";
import "../styles/Viewer.css";

import * as pdfjsLib from "../../node_modules/pdfjs-dist/build/pdf";
import * as pdfjsViewer from "../../node_modules/pdfjs-dist/web/pdf_viewer";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "../../node_modules/pdfjs-dist/web/pdf_viewer.css";

export default function PDFViewer({ fileID, setLoading }) {
  const [pdfURL, setPdfURL] = useState("");

  useEffect(() => {
    let path = BASE_URL + fileID;
    setPdfURL(path);
    try {
      if (!pdfjsLib.getDocument || !pdfjsViewer.PDFViewer) {
        // eslint-disable-next-line no-alert
        console.log(
          "Please build the pdfjs-dist library using\n  `gulp dist-install`"
        );
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

      const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
      const CMAP_PACKED = true;

      const ENABLE_XFA = true;

      const container = document.getElementById("viewerContainer");

      const eventBus = new pdfjsViewer.EventBus();

      const pdfLinkService = new pdfjsViewer.PDFLinkService({
        eventBus,
      });

      const pdfViewer = new pdfjsViewer.PDFViewer({
        container,
        eventBus,
        linkService: pdfLinkService,
      });
      pdfLinkService.setViewer(pdfViewer);

      eventBus.on("pagesinit", function () {
        pdfViewer.currentScaleValue = "page-width";
      });
      const loadingTask = pdfjsLib.getDocument({
        url: pdfURL,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
        enableXfa: ENABLE_XFA,
      });
      (async function () {
        const pdfDocument = await loadingTask.promise;

        pdfViewer.setDocument(pdfDocument);

        pdfLinkService.setDocument(pdfDocument, null);
      })();

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
