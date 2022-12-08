import React, { useState, useEffect } from "react";
import { uploadFile } from "../utils/axios";

import SubmitButton from "./SubmitButton";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/Link.css";
import "../styles/error.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload({ setFileId }) {
  const [pdfFile, setPdf] = useState(null);
  const [tryUpload, setTryUpload] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setFileId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      console.log(tryUpload);
    if (tryUpload && pdfFile === null) {
      toast.error("No file have been uploaded. Please upload a file", {
      id: "toast"});
    }

    if (pdfFile !== null && pdfFile.type !== "application/pdf") {
      toast.error("please upload a pdf file", {
      id: "toast"});  
    }

    if (pdfFile !== null && pdfFile.type === "application/pdf") { 
      toast.success("The pdf file have been successfully uploaded!",{
      id: "toast"});
    }
  }, [pdfFile, tryUpload, attempts]);

  const handlePdfSubmit = async () => {
    setAttempts(attempts + 1);
    if (!tryUpload) setTryUpload(true);
    if (pdfFile != null && pdfFile.type === "application/pdf") {
      setTryUpload(false);
      toast.dismiss();
      navigate("/viewFile");
      const data = new FormData();
      data.append("file", pdfFile);
      const res = await uploadFile({ data: data });

      setFileId(res);
    }
  };

  return (
    <div className="dropzone">
      <Toaster />
      <FileDropzone setPDFFile={setPdf} />
      <SubmitButton uploadOnClick={handlePdfSubmit} />
    </div>
  );
}
