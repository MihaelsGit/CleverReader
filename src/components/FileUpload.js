import React, { useState } from "react";
import { uploadFile } from "../utils/axios";

import CustomButton from "./CustomButton";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";

export default function FileUpload() {
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

      const res = uploadFile({ data: data });
    }
  };

  return (
    <div className="flex-container">
      <FileDropzone />
      {/*<form className="form-group" onSubmit={handlePdfSubmit}>
        <input
          type="file"
          className="form-group"
          required
          onChange={handlePdfFileChange}
        />
  </form>*/}
      <CustomButton />
    </div>
  );
}
