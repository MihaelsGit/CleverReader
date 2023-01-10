import "../styles/App.css";
import { Toaster } from "react-hot-toast";
import NavigationBar from "./NavigationBar";
import { useLocation } from "react-router-dom";

function CustomHeader({
  text,
  setSummaryModalShow,
  summaryText,
  modalLoading,
  setKnowledgeGraphOpen,
  knowledgeGraphLoading,
  references,
}) {
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
          setKnowledgeGraphOpen={setKnowledgeGraphOpen}
          knowledgeGraphLoading={knowledgeGraphLoading}
        />
      </div>
    </>
  ) : null;
}

export default CustomHeader;
