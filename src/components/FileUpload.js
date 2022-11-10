import React, { useState } from "react";
import { uploadFile } from "../utils/axios";

import CustomButton from "./SubmitButton";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";

export default function FileUpload() {
  const [pdfFile, setPdf] = useState(null);

  const handlePdfSubmit = () => {
    if (pdfFile !== null) {
      const data = new FormData();
      data.append("file", pdfFile);

      const res = uploadFile({ data: data });
    }
  };

  return (
    <div className="dropzone">
      <FileDropzone setPDFFile={setPdf} />
      <CustomButton uploadOnClick={handlePdfSubmit} />
    </div>
  );
}
