import React, { useState, useEffect } from "react";
import { uploadFile } from "../utils/axios";

import SubmitButton from "./SubmitButton";
import FileDropzone from "./FileDropzone";

import "../styles/FileUpload.css";
import "../styles/Link.css";
import "../styles/error.css";

import { useNavigate } from "react-router-dom";
export default function FileUpload({ setFileId }) {
  const [pdfFile, setPdf] = useState(null); // Initialize with a value !=NULL pdfFile to render correctly the first time. Can be set to null after the user dop the file
  const [uploadError, setUploadError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const navigate = useNavigate ();
  useEffect(() => {
    setFileId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePdfSubmit = async () => {
    if(firstRender) 
      setFirstRender(false);

    if (pdfFile !== null) {
      navigate("/viewFile");
      
    const data = new FormData();
    data.append("file", pdfFile);
    const res = await uploadFile({ data: data });
    setFileId(res);
    }
  };

  return (
    <div className="dropzone">
      <FileDropzone setPDFFile={setPdf} setError = {setUploadError} />
      { firstRender && <></>}
      { (!firstRender && (!uploadError && pdfFile == null)) &&  <div> <p class = 'error'>No file have been uploaded. Please upload a file</p></div>}
      { (!firstRender && (uploadError && pdfFile == null)) &&  <div>  <p class = 'error'>please upload a pdf file</p></div>}
      {(!firstRender && (!uploadError && pdfFile !== null)) &&  <div> <p class = 'success'>The file have been uploaded successfully! </p></div>}
      <SubmitButton uploadOnClick={handlePdfSubmit} />
     </div>
  )
}