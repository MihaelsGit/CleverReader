import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "../constants/FileDropzone";
import { genericError, dropzoneMsg } from "../constants/strings";

function FileDropzone({ setPDFFile, setError }) {
  const fileType = ["application/pdf"];

  const [dropzoneText, setDropzoneText] = useState(dropzoneMsg);

  const onDrop = useCallback((acceptedFiles) => {
    let selectedFile = acceptedFiles[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (e) => {
        setPDFFile(selectedFile);
        setDropzoneText(selectedFile.name);
      };
    } else {
      setPDFFile(null);
      setDropzoneText(genericError);
    }
    setPDFFile(selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <p>{dropzoneText}</p>
      </div>
    </div>
  );
}

export default FileDropzone;
