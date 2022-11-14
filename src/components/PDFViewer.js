import React, { useEffect, useState, useRef, useCallback } from "react";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { BASE_URL } from "../constants/path";

export default function PDFViewer({ fileID }) {
  const canvasRef = useRef(null);
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();
  const [currPage, setCurrPage] = useState(1);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then((page) => {
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.getElementById("pdf");

          var outputScale = window.devicePixelRatio || 1;

          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = Math.floor(viewport.width) + "px";
          canvas.style.height = Math.floor(viewport.height) + "px";

          var transform =
            outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

          const renderContext = {
            canvasContext: canvas.getContext("2d"),
            transform: transform,
            viewport: viewport,
          };
          page.render(renderContext);
        });
    },
    [pdfRef]
  );

  useEffect(() => {
    renderPage(currPage, pdfRef);
  }, [pdfRef, currPage, renderPage, fileID]);

  useEffect(() => {
    if (fileID !== null) {
      let path = BASE_URL + fileID;
      const loadingTask = pdfjsLib.getDocument(path);
      loadingTask.promise.then(
        (loadedPdf) => {
          setPdfRef(loadedPdf);
        },
        (reason) => {
          console.error(reason);
        }
      );
    }
  }, [fileID]);

  const nextPage = () =>
    pdfRef && currPage < pdfRef.numPages && setCurrPage(currPage + 1);

  const prevPage = () => currPage > 1 && setCurrPage(currPage - 1);

  return (
    <div>
      <canvas id="pdf" ref={canvasRef} />
      <div>
        <button id="prev" onClick={prevPage}>
          Previous
        </button>
        <button id="next" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
