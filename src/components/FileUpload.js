import React, { useState } from "react";
import { uploadFile } from "../utils/axios";

export default function FileUpload({ setLink }) {
  const [pdfFile, setPdfFile] = useState(null);

  const fileType = ["application/pdf"];

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(selectedFile);
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
      uploadFile({ data: data }).then(data => setLink(data));
    }
  };

  return (
    <div>
      <form className="form-group" onSubmit={handlePdfSubmit}>
        <input
          type="file"
          className="form-group"
          required
          onChange={handlePdfFileChange}
        />
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  );
}
