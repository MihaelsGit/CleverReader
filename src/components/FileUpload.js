import React, { useState } from "react";
import { uploadFile } from "../utils/axios";

import SubmitButton from "./SubmitButton";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/Link.css";

import { Link } from "react-router-dom";
export default function FileUpload({ getFileName }) {
  const [pdfFile, setPdf] = useState(null);

  const handlePdfSubmit = () => {
    if (pdfFile !== null) {
      const data = new FormData();
      data.append("file", pdfFile);

      const res = uploadFile({ data: data });
      console.log("prvi response => ", res);
      getFileName(res);
    }
  };

  return (
    <div className="dropzone">
      <FileDropzone setPDFFile={setPdf} />
      <Link to="/viewFile" className="noUnderline">
        <SubmitButton uploadOnClick={handlePdfSubmit} />
      </Link>
    </div>
  );
}
