import React from "react";
import "../styles/NavigationBar.css";
import IconButton from "./IconButton";

function NavigationBar({ onBackClick, onSummaryClick, onKnowledgeGraphClick, onSearchClick }) {
    return <nav class="navBar">
      <div>
        <div class="navLeft">
          <IconButton 
            id="backButton" 
            iconPath={require('../styles/back_icon.svg').default} 
            onButtonClick= {onBackClick}s 
          />
        </div>
        <div class="navRight">
          <IconButton 
            id = "summaryButton" 
            iconPath={require('../styles/summary_icon.svg').default} 
            onButtonClick={onSummaryClick}
          />
          <IconButton 
            id= "knowledgeGraphButton" 
            iconPath={require('../styles/knowledge_graph_icon.svg').default} 
            onButtonClick={onKnowledgeGraphClick} 
          />
          <IconButton 
            id = "searchButton" 
            iconPath={require('../styles/search_icon.svg').default} 
            onButtonClick={onSearchClick} 
          />
        </div>
      </div>
    </nav>;
  }
  
  export default NavigationBar;