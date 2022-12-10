import React, { useState, useEffect } from "react";
import { uploadFile } from "../utils/axios";

import SubmitButton from "./SubmitButton"; //eslint-disable-line
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/Link.css";
import "../styles/error.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload({ setFileId }) {
  const [pdfFile, setPdf] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setFileId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pdfFile !== null && pdfFile.type !== "application/pdf") {
      toast.error("please upload a pdf file", {
      id: "toast"});  
    }
  }, [pdfFile]);

  useEffect(() => {
    const submit = async () => {
      if (pdfFile != null && pdfFile.type === "application/pdf") {        
        toast.dismiss();
        navigate("/viewFile");
        const data = new FormData();
        data.append("file", pdfFile);
        const res = await uploadFile({ data: data });

        setFileId(res);
      }
    };

    submit();
  }, [pdfFile, navigate, setFileId]);

  return (
    <div className="dropzone">
      <Toaster />
      <FileDropzone setPDFFile={setPdf} />
    </div>
  );
}
