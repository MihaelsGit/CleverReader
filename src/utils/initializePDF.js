import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "../../node_modules/pdfjs-dist/web/pdf_viewer.css";
import { onReferenceHover } from "./renderPopup";
import { zoomIn, zoomOut } from "./viewerFunctions";

export const initializeViewer = async (url) => {
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
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");

  zoomInBtn.addEventListener("click", () => {
    zoomIn(pdfViewer);
  });

  zoomOutBtn.addEventListener("click", () => {
    zoomOut(pdfViewer);
  });

  const eventBus = new pdfjsViewer.EventBus();

  const pdfLinkService = new pdfjsViewer.PDFLinkService({
    eventBus,
  });

  let loadingTask;
  let pdfDocument;
  try {
    loadingTask = pdfjsLib.getDocument({
      url: url,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
      enableXfa: ENABLE_XFA,
    });
    pdfDocument = await loadingTask.promise;
  } catch (error) {
    console.log("error getting pdf document: ", error);
  }

  const pdfViewer = new pdfjsViewer.PDFViewer({
    container,
    eventBus,
    linkService: pdfLinkService,
  });

  pdfLinkService.setViewer(pdfViewer);

  eventBus.on("pagesinit", function () {
    pdfViewer.currentScaleValue = "auto";
    pdfLinkService._ignoreDestinationZoom = true;
  });

  // Code for preview popup
  eventBus.on("annotationlayerrendered", (e) => {
    const page = e.source;
    const annotationSections = page.annotationLayer.div.children;
    Array.from(annotationSections).forEach((el) => {
      el.addEventListener("mouseover", (e) => {
        onReferenceHover(e, pdfDocument, pdfLinkService);
      });
    });
  });

  pdfViewer.setDocument(pdfDocument);
  pdfLinkService.setDocument(pdfDocument, null);
};
