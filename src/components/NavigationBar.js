import React from "react";
import "../styles/NavigationBar.css";
import TooltipIconButton from "./TooltipIconButton";

function NavigationBar({ onBackClick, onSummaryClick, onKnowledgeGraphClick, onSearchClick }) {
    return <nav class="navBar">
      <div>
        <div class="navLeft">
          <TooltipIconButton
            id="backButton" 
            tooltipText={"Back"}
            iconPath={require('../styles/back_icon.svg').default} 
            onButtonClick= {onBackClick} 
          />
        </div>
        <div class="navRight">
          <TooltipIconButton
            id="summaryButton" 
            tooltipText={"Summary"}
            iconPath={require('../styles/summary_icon.svg').default} 
            onButtonClick= {onSummaryClick} 
          />
          <TooltipIconButton
            id="knowledgeGraphButton" 
            tooltipText={"Knowledge Graph"}
            iconPath={require('../styles/knowledge_graph_icon.svg').default} 
            onButtonClick= {onKnowledgeGraphClick} 
          />
          <TooltipIconButton
            id="searchButton" 
            tooltipText={"Search"}
            iconPath={require('../styles/search_icon.svg').default} 
            onButtonClick= {onSearchClick} 
          />
        </div>
      </div>
    </nav>;
  }
  
  export default NavigationBar;