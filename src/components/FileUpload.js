import React, { useState, useEffect } from "react";
import { uploadFile } from "../utils/axios";

import "../styles/Button.css";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/error.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload({
  setLoading,
  setPdfFile,
  setSummaryText,
  setModalLoading,
  setKnowledgeGraphLoading,
  setReferences,
}) {
  const [pdfFile, setPdf] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    setModalLoading(true);
    setSummaryText("");
    setKnowledgeGraphLoading(false);
    setReferences(null);
  }, [
    setKnowledgeGraphLoading,
    setLoading,
    setModalLoading,
    setReferences,
    setSummaryText,
  ]);

  useEffect(() => {
    if (pdfFile !== null && pdfFile.type !== "application/pdf") {
      toast.error("please upload a pdf file", {
        id: "toast",
      });
    }
  }, [pdfFile]);

  useEffect(() => {
    (async () => {
      if (pdfFile != null && pdfFile.type === "application/pdf") {
        toast.dismiss();

        setPdfFile(pdfFile);
        const data = new FormData();
        data.append("file", pdfFile);
        setLoading(true);

        const id = await uploadFile({ data: data });

        if (id == null) {
          toast.error("Error! Couldn't upload the pdf file.", {
            id: "toast",
          });
          setLoading(false);
        } else {
          localStorage.setItem("FILE_ID", id);
          navigate("/viewFile", { replace: true });
        }
      }
    })();
  }, [pdfFile, navigate, setLoading, setPdfFile]);

  return (
    <div className="dropzone">
      <Toaster />
      <FileDropzone setPDFFile={setPdf} />
    </div>
  );
}
