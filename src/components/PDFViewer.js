import React, { useEffect, useState, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import pdfViewerStyle from "../styles/pdfViewerStyle.css";

export default function PDFViewer({ url }) {
  const canvasRef = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();
  const [currPage, setCurrPage] = useState(1);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then((page) => {
          const viewport = page.getViewport({ scale: 1.2 });
          const canvas = canvasRef.current;

          var outputScale = window.devicePixelRatio || 1;

          canvas.height = viewport.height + 300;
          canvas.width = viewport.width + 300;

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
  }, [pdfRef, currPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
      },
      (reason) => {
        console.error(reason);
      }
    );
  }, [url]);

  const nextPage = () =>
    pdfRef && currPage < pdfRef.numPages && setCurrPage(currPage + 1);

  const prevPage = () => currPage > 1 && setCurrPage(currPage - 1);

  return (
    <div style={pdfViewerStyle}>
      <button id="prev" onClick={prevPage}>
        Previous
      </button>
      <button id="next" onClick={nextPage}>
        Next
      </button>
      &nbsp; &nbsp;
      <span>
        Page: <span id="page_num"></span> / <span id="page_count"></span>
      </span>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
