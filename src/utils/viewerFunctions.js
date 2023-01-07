export const zoomIn = (viewer) => {
  viewer.currentScale *= 1.1;
};

export const zoomOut = (viewer) => {
  viewer.currentScale *= 0.9;
};
