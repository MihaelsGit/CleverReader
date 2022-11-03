import React, { useState, useRef } from "react";
import PDFViewer from "./pdfViewer";
import axios from "axios";

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const fileType = ["application/pdf"];

  const handlePdfFileChange = (e) => {
    console.log("AAAA", e.target.files[0]);
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
      }
    } else {
      setPdfFile(null);
    }
  };

  const handlePdfSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      const data = new FormData();
      data.append("file", pdfFile);
      axios
        .post("http://localhost:8000/api/v1/file/upload", data, {})
        .then((res) => {
          console.log("response ", res);
        });
    }
  };

  const styles = {
    border: "2px solid rgba(0, 0, 0, 0.5)",
  };

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
      <form className="form-group" onSubmit={handlePdfSubmit}>
        <input
          type="file"
          className="form-group"
          required
          onChange={handlePdfFileChange}
        />
        <button type="submit">UPLOAD</button>
      </form>
      <div style={styles}>
        {/*PDF viewer, code in pdfViewer.js*/}
        <PDFViewer url={url} />
      </div>
    </div>
  );
}

export default App;
