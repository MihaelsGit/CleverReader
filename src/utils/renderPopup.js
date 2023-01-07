export const onReferenceHover = async (e, pdfDoc, pdfLinkServ) => {
  const el = e.target;
  const parent = el.parentElement;
  const hash = el.hash;

  const destinations = await pdfDoc.getDestinations();

  if (el.className === "internalLink") {
    const box = el.getBoundingClientRect();
    const halfWidth = (box.left + box.right) / 2;

    const preview = document.createElement("canvas");
    const previewStyle = preview.style;
    previewStyle.border = "0.5px solid grey";
    previewStyle.borderRadius = "8px";
    previewStyle.direction = "ltr";
    previewStyle.position = "fixed";
    previewStyle.zIndex = "99";
    previewStyle.top = `${e.clientY + 4}px`;
    previewStyle.boxShadow = "-5px 6px 9px 0px rgba(135,135,135,0.71)";

    const namedDest = decodeURIComponent(hash.substring(1));
    const explicitDest =
      namedDest in destinations
        ? destinations[namedDest]
        : JSON.parse(namedDest);
    const pageNumber = pdfLinkServ._cachedPageNumber(explicitDest[0]);

    pdfDoc.getPage(pageNumber).then((page) => {
      const curr_scale = pdfLinkServ.pdfViewer._currentScale;
      const tempViewport = page.getViewport(1);
      const height = Math.floor(tempViewport.height * curr_scale * 1);
      const width = Math.floor(tempViewport.width * curr_scale * 1);
      const leftOffset = e.clientX > halfWidth ? (2 * width) / 3 : width / 3;
      previewStyle.height = `${height}px`;
      previewStyle.width = `${width}px`;
      previewStyle.left = `${e.clientX - leftOffset - 4}px`;

      let offsetY;
      switch (explicitDest[1].name) {
        case "XYZ":
          offsetY = explicitDest[3];
          break;
        case "FitH":
        case "FitBH":
        case "FitV":
        case "FitBV":
          offsetY = explicitDest[2];
          break;
        default:
          offsetY = 0;
          console.log(`Oops, link ${explicitDest[1].name} is not supported.`);
      }

      const previewScale = curr_scale * 0.75;
      const viewport = page.getViewport({
        scale: previewScale,
      });

      preview.height = 300;
      preview.width = viewport.width;

      var transform =
        previewScale !== 1 ? [previewScale, 0, 0, previewScale, 0, 0] : null;

      const renderContext = {
        canvasContext: preview.getContext("2d"),
        transform: transform,
        viewport: viewport,
        offsetY: offsetY,
      };
      page.render(renderContext);
    });

    el.prepend(preview);

    parent.after(preview);
    parent.addEventListener("mouseleave", (e) => {
      preview.remove();
    });
  }
};
