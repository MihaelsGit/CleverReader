import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../styles/NavigationBar.css";
import "../styles/App.css";
import TooltipIconButton from "./TooltipIconButton";
import { useLocation } from "react-router-dom";
import SummaryModal from "./SummaryModal";

function NavigationBar({ onSummaryClick, knowledgeGraphLoading, summaryText }) {
  const { pathname } = useLocation();

  const [summaryModalShow, setSummaryModalShow] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (summaryText !== "" && modalLoading === true) {
      setModalLoading(false);
      setSummaryModalShow(true);
    }
  }, [modalLoading, summaryText]);

  const openModal = () => {
    setModalLoading(true);
    if (summaryText !== "") {
      setModalLoading(false);
      setSummaryModalShow(true);
    }
  };

  const closeModal = () => {
    setSummaryModalShow(false);
    setModalLoading(false);
  };

  return (
    <>
      <nav className="navBar">
        {pathname !== "/" ? (
          <div>
            <div className="navLeft">
              <Link to="/" className="link" replace>
                <TooltipIconButton
                  id="backButton"
                  tooltipText={"Back"}
                  iconPath={require("../styles/back_icon.svg").default}
                />
              </Link>
            </div>

            <div className="navRight">
              {modalLoading ? (
                <Spinner className="spinner" animation="border" role="status" />
              ) : (
                <TooltipIconButton
                  id="summaryButton"
                  tooltipText={"Summary"}
                  iconPath={require("../styles/summary_icon.svg").default}
                  onButtonClick={openModal}
                />
              )}

              <Link to="/knowledgeGraph" target="_blank" className="link">
                {knowledgeGraphLoading ? (
                  <Spinner
                    className="spinner"
                    animation="border"
                    role="status"
                  />
                ) : (
                  <TooltipIconButton
                    id="knowledgeGraphButton"
                    tooltipText={"Knowledge Graph"}
                    iconPath={
                      require("../styles/knowledge_graph_icon.svg").default
                    }
                  />
                )}
              </Link>
            </div>
          </div>
        ) : (
          <div className="navLeftHidden">
            <TooltipIconButton
              id="backButton"
              tooltipText={"Back"}
              iconPath={require("../styles/back_icon.svg").default}
            />
          </div>
        )}
      </nav>
      <SummaryModal
        summaryText={summaryText}
        summaryModalShow={summaryModalShow}
        summaryModalHide={closeModal}
      />
    </>
  );
}

export default NavigationBar;
