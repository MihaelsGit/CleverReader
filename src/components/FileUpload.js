import React, { useState, useEffect } from "react";
import { uploadFile, getSummaryText, getKnowledgeGraph } from "../utils/axios";

import "../styles/Button.css"
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/error.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload({ setFileId, setLoading, setSummaryText, setKnowledgeGraph  }) {
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
          const summaryRes = await getSummaryText({pdfId: res});
          setSummaryText(summaryRes);

          const knowledgeGraphRes = await getKnowledgeGraph({pdfId: res});
          setKnowledgeGraph(knowledgeGraphRes);
          
          navigate("/viewFile");
          setFileId(res);
        }
      }
    };

    submit();
  }, [pdfFile, navigate, setFileId, setLoading, setSummaryText, setKnowledgeGraph]);

  return (
    <div className="dropzone">
      <Toaster />
      <FileDropzone setPDFFile={setPdf} />
    </div>
  );
}
