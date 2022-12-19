export const zoomIn = (viewer) => {
  let scale = viewer.currentScale * 1.1;
  viewer.currentScale = scale;
};

export const zoomOut = (viewer) => {
  let scale = viewer.currentScale * 0.9;
  viewer.currentScale = scale;
};
