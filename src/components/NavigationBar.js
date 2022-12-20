import React from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../styles/NavigationBar.css";
import TooltipIconButton from "./TooltipIconButton";
import { useLocation } from "react-router-dom";

function NavigationBar({
  summaryLoading,
  onSummaryClick,
  knowledgeGraphLoading,
}) {
  const { pathname } = useLocation();

  return (
    <nav className="navBar">
      {pathname !== "/" ? (
        <div>
            <div className="navLeft">
              <Link to="/" className="link">
                <TooltipIconButton
                  id="backButton"
                  tooltipText={"Back"}
                  iconPath={require("../styles/back_icon.svg").default}
                />
              </Link>
            </div>

          <div className="navRight">
            {summaryLoading ? (
              <Spinner className="spinner" animation="border" role="status" />
            ) : (
              <TooltipIconButton
                id="summaryButton"
                tooltipText={"Summary"}
                iconPath={require("../styles/summary_icon.svg").default}
                onButtonClick={onSummaryClick}
              />
            )}
            <Link to="/knowledgeGraph" target="_blank" className="link">
              {knowledgeGraphLoading ? (
                <Spinner className="spinner" animation="border" role="status" />
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
  );
}

export default NavigationBar;
