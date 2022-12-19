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
  setSummaryText,
  setKnowledgeGraphShow,
}) {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [knowledgeGraphLoading, setKnowledgeGraphLoading] = useState(false);

  const getSummary = async () => {
    setSummaryLoading(true);

    const summaryResponse = await getSummaryText({ pdfId: "" });

    setSummaryLoading(false);

    if (summaryResponse != null) {
      setSummaryText(summaryResponse);
      setSummaryModalShow(true);
    } else {
      toast.error(summaryError, {
        id: "toast",
      });
    }
  };

  const getKnowledgeGraphData = async () => {
    setKnowledgeGraphLoading(true);

    const knowledgeGraphResponse = await getKnowledgeGraph({ pdfId: "" });

    setKnowledgeGraphLoading(false);

    if (knowledgeGraphResponse != null) {
      //setKnowledgeGraph(knowledgeGraphResponse);
      setKnowledgeGraphShow(true);
    } else {
      toast.error(knowledgeGraphError, {
        id: "toast",
      });
    }
  };

  const { pathname } = useLocation();

  return pathname !== "/knowledgeGraph" ? (
    <>
      <Toaster />
      <div className="header">
        {text}
        <NavigationBar
          summaryLoading={summaryLoading}
          onSummaryClick={() => getSummary()}
          knowledgeGraphLoading={knowledgeGraphLoading}
          onKnowledgeGraphClick={() => getKnowledgeGraphData()}
        />
      </div>
    </>
  ) : null;
}

export default CustomHeader;
