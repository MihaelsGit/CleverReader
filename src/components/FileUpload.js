import React, { useState, useEffect } from "react";
import { uploadFile } from "../utils/axios";

import "../styles/Button.css"
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/error.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload({ setFileId, setLoading }) {
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
        const data = new FormData();
        data.append("file", pdfFile);
        setLoading(true);
        const res = await uploadFile({ data: data });

        if(res == null) {
          toast.error("Error! Couldn't upload the pdf file.", {
            id: "toast"});
          setLoading(false);  
        } else {
          navigate("/viewFile");
          setFileId(res);
        }
      }
    };

    submit();
  }, [pdfFile, navigate, setFileId, setLoading]);

  return (
    <div className="dropzone">
      <Toaster />
      <FileDropzone setPDFFile={setPdf} />
    </div>
  );
}
