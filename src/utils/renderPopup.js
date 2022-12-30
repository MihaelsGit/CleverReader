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
    previewStyle.border = "1px solid black";
    previewStyle.direction = "ltr";
    previewStyle.position = "fixed";
    previewStyle.zIndex = "99";
    previewStyle.top = `${e.clientY + 4}px`;
    previewStyle.boxShadow = "5px 5px 5px black, -5px 5px 5px black";

    const namedDest = decodeURIComponent(hash.substring(1));
    const explicitDest =
      namedDest in destinations
        ? destinations[namedDest]
        : JSON.parse(namedDest);
    const pageNumber = pdfLinkServ._cachedPageNumber(explicitDest[0]);

    pdfDoc.getPage(pageNumber).then((page) => {
      const curr_scale = pdfLinkServ.pdfViewer._currentScale;
      const tempViewport = page.getViewport(curr_scale);
      const height = tempViewport.height * 1.2 * curr_scale;
      const width = tempViewport.width * 1.2 * curr_scale;
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
          console.log(`Oops, link ${explicitDest[1].name} is not supported.`);
      }

      const scale = curr_scale / 4;
      const viewport = page.getViewport({
        scale,
        offsetY: (offsetY - tempViewport.height) * scale,
      });

      preview.height = viewport.height;
      preview.width = viewport.width;

      const renderContext = {
        canvasContext: preview.getContext("2d"),
        viewport: viewport,
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
