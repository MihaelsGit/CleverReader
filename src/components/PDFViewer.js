import React, { useEffect, useState, useRef, useCallback } from "react";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { BASE_URL } from "../constants/path";

export default function PDFViewer({ fileID }) {
  const canvasRef = useRef(null);
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();

  const renderPaper = useCallback (
    (pdf = pdfRef) => {
      /*

      var container = document.getElementById("container");

      for(var i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(function(page) {

        var viewport = page.getViewport({ scale: 2 });
        var div = document.createElement("div");

        div.setAttribute("id", "page-" + (page.pageNum + 1));
        div.setAttribute("style", "position: relative");
        container.appendChild(div);

        var canvas = document.createElement("canvas");
        div.appendChild(canvas);

        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderContext);
        });
      }*/
    },
    [pdfRef]
  );

function renderRecursively(pdf, currentPageNumber) {
  if(currentPageNumber <= pdf.numPages) {
    pdf.getPage(currentPageNumber).then(function(page) {
      var container = document.getElementById("container");
  
      var viewport = page.getViewport({ scale: 2 });
      var div = document.createElement("div");
  
      div.setAttribute("id", "page-" + (page.pageNum + 1));
      div.setAttribute("style", "position: relative");
      container.appendChild(div);
  
      var canvas = document.createElement("canvas");
      div.appendChild(canvas);
  
      var outputScale = window.devicePixelRatio || 1;
  
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";
  
      var transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
  
      var renderContext = {
        canvasContext: canvas.getContext("2d"),
        transform: transform,
        viewport: viewport
      };
  
      page.render(renderContext);
      renderRecursively(pdf, currentPageNumber + 1);
    });
  }
}

  /*useEffect(() => {
    renderPaper(pdfRef);
  }, [pdfRef, renderPaper, fileID]);*/

  // The method useEffect gets called twice!
  var counter = 0;

  useEffect(() => {
    if (fileID !== null) {
      let path = BASE_URL + fileID;
      const loadingTask = pdfjsLib.getDocument("https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf");
      loadingTask.promise.then(
        (loadedPdf) => {
          counter++;
          if(counter == 1 ) return;
          //setPdfRef(loadedPdf);
          renderRecursively(loadedPdf, 1);
        },
        (reason) => {
          console.error(reason);
        }
      );
    }
  }, [fileID]);

  return (
    <div id="container">
    </div>
  );
}
