import React, { useState } from "react";
import PDFViewer from "./components/PDFViewer";
import FileUpload from "./components/FileUpload";

function App() {
  // PDF files for testing, currently working files are test and url
  var test =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
  const pdf =
    "https://pdfhost.io/edit?doc=f2e070d1-2082-45c3-8d3a-249d1b6093fc";
  var url =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  var url2 = "https://www.orimi.com/pdf-test.pdf";
  var url3 = "https://www.clickdimensions.com/links/TestPDFfile.pdf";
  var url4 =
    "https://github.com/MihaelsGit/CleverReader/blob/main/src/test.pdf";

  var local = "/src/test.pdf";

  // Main app
  return (
    <div className="App">
      <h1>Hello there</h1>
      <FileUpload />
      <PDFViewer url={test} />
    </div>
  );
}

export default App;
