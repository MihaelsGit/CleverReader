import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "../constants/FileDropzone";

function FileDropzone({ setPDFFile }) {
  const fileType = ["application/pdf"];

  const onDrop = useCallback((acceptedFiles) => {
    let selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPDFFile(selectedFile);
        };
      }
    } else {
      setPDFFile(null);
    }
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

export default FileDropzone;
