import React, { useEffect, useState, useCallback } from "react";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { BASE_URL } from "../constants/path";

export default function PDFViewer({ fileID }) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();

  const renderPaper = useCallback(
    (pdf = pdfRef, currentPageNumber) => {
      if (pdf == null) return;
      if (currentPageNumber <= pdf.numPages) {
        pdf.getPage(currentPageNumber).then(function (page) {
          const container = document.getElementById("container");

          const viewport = page.getViewport({ scale: 2 });
          const div = document.createElement("div");

          div.setAttribute("id", "page-" + (page.pageNum + 1));
          div.setAttribute("style", "position: relative");
          container.appendChild(div);

          const canvas = document.createElement("canvas");
          div.appendChild(canvas);

          const outputScale = window.devicePixelRatio || 1;

          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = Math.floor(viewport.width) + "px";
          canvas.style.height = Math.floor(viewport.height) + "px";

          const transform =
            outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

          const renderContext = {
            canvasContext: canvas.getContext("2d"),
            transform: transform,
            viewport: viewport,
          };

          page.render(renderContext);

          page.getTextContent().then((text) => {
            var textLayer = document.querySelector(".textLayer");

            textLayer.style.left = canvas.offsetLeft + "px";
            textLayer.style.top = canvas.offsetTop + "px";
            textLayer.style.height = canvas.offsetHeight + "px";
            textLayer.style.width = canvas.offsetWidth + "px";

            // Pass the data to the method for rendering of text over the pdf canvas.
            pdfjsLib.renderTextLayer({
              textContent: text,
              container: textLayer,
              viewport: viewport,
              textDivs: [],
            });
          });

          renderPaper(pdf, currentPageNumber + 1);
        });
      }
    },
    [pdfRef]
  );

  useEffect(() => {
    renderPaper(pdfRef, 1);
  }, [pdfRef, renderPaper, fileID]);

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

  return (
    <div>
      <div id="container"></div>
      <div className="textLayer"></div>
    </div>
  );
}
