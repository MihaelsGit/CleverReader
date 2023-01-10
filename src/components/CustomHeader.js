import React, { useState } from "react";

import "../styles/App.css";
import { getSummaryText, getKnowledgeGraph } from "../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import NavigationBar from "./NavigationBar";
import { useLocation } from "react-router-dom";
import { summaryError, knowledgeGraphError } from "../constants/strings";

function CustomHeader({
  text,
  setSummaryModalShow,
  summaryText,
  modalLoading,
}) {
  const [knowledgeGraphLoading, setKnowledgeGraphLoading] = useState(false);

  const { pathname } = useLocation();

  return pathname !== "/knowledgeGraph" ? (
    <>
      <Toaster />
      <div className="header">
        {text}
        <NavigationBar
          modalLoading={modalLoading}
          setSummaryModalShow={setSummaryModalShow}
          summaryText={summaryText}
          knowledgeGraphLoading={knowledgeGraphLoading}
          onKnowledgeGraphClick={() => {}}
        />
      </div>
    </>
  ) : null;
}

export default CustomHeader;
