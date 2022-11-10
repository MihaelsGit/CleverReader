import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "../constants/FileDropzone";

function FileDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("files => ", acceptedFiles);
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
