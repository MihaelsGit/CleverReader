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

  const navigate = useNavigate();
  useEffect(() => {
    setFileId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tryUpload && pdfFile == null) {
      toast.error("No file have been uploaded. Please upload a file");
    }

    if (pdfFile !== null && pdfFile.type !== "application/pdf") {
      toast.error("please upload a pdf file");
    }

    if (pdfFile !== null && pdfFile.type === "application/pdf") {
      toast.success("The pdf file have been successfully uploaded!");
    }
  }, []);

  const handlePdfSubmit = async () => {
    if (!tryUpload) setTryUpload(true);
    toast.error("No file have been uploaded. Please upload a file");
    if (pdfFile != null && pdfFile.type === "application/pdf") {
      navigate("/viewFile");
      const data = new FormData();
      data.append("file", pdfFile);
      const res = await uploadFile({ data: data });

      setFileId(res);

      toast.promise(res, {
        loading: "Loading ...",
        success: (data) => {
          console.log(data);
          if (data.status !== 200) throw new Error("server error");
          return "Pdf file uploaded successfully, preview available!";
        },
        error: "Sorry, something went wrong...",
      });
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
