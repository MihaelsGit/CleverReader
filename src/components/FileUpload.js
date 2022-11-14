import React, { useState, useEffect } from "react";
import { uploadFile } from "../utils/axios";

import SubmitButton from "./SubmitButton";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/Link.css";

import { Link } from "react-router-dom";
export default function FileUpload({ setFileId }) {
  const [pdfFile, setPdf] = useState(null);

  useEffect(() => {
    setFileId("");
  }, []);

  const handlePdfSubmit = async () => {
    if (pdfFile !== null) {
      const data = new FormData();
      data.append("file", pdfFile);

      const res = await uploadFile({ data: data });
      setFileId(res);
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
