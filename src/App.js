import React from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomHeader from "./components/CustomHeader";
import FileUpload from "./components/FileUpload";
import PDFViewer from "./components/PDFViewer"

function App() {
  return (
    
    <div className="wrapper">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomHeader text="CleverReader" />}> {/*The header is added as home page. Thus, it does not change when the file is uploaded and the content is rendered*/}
          <Route index element={ <FileUpload />} />
          <Route path='viewFile' element={<PDFViewer />}/> 
        </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
