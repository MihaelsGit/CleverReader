import React, { useState, useRef } from "react";
import PDFViewer from "./pdfViewer";

function App() {
  const pdf = "/src/test.pdf";
  var url =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  var url2 = "https://www.orimi.com/pdf-test.pdf";
  var url3 = "https://www.clickdimensions.com/links/TestPDFfile.pdf";

  return (
    <div className="App">
      <h1>Hello there</h1>
      <PDFViewer url={url3} />
    </div>
  );
}

export default App;
