import React, { useEffect, useState, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

export default function PDFViewer({ url }) {
  const canvasRef = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();
  const [currPage, setCurrPage] = useState(1);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then((page) => {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext("2d"),
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

  return <canvas ref={canvasRef}></canvas>;
}
