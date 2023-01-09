import { React, useRef, useCallback, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { getKnowledgeGraph } from "../utils/axios";
import { useState } from "react";
import KnowledgeGraphModal from "./KnowledgeGraphModal";
import LoadingAnimation from "./LoadingAnimation";

export default function KnowledgeGraph() {
  const fgRef = useRef();
  const [knowledgeGraphLoading, setKnowledgeGraphLoading] = useState(true);
  const [knowledgeGraphData, setKnowledgeGraphData] = useState({nodes: [], links: [],});
  const [knowledgeGraphModalShow, setKnowledgeGraphModalShow] = useState(false);

  const handleClick = useCallback(
    (node) => {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
        node,
        3000
      );
    },
    [fgRef]
  );

useEffect( () => {
  const knowledgeGraphResponse = async () => {
    await getKnowledgeGraph({ pdfId: "" })
      .then((result)=> { 
        if (result != null) {
            const res =  JSON.parse(result);
            setKnowledgeGraphData(res);
            setKnowledgeGraphLoading(false);
        } else {
            setKnowledgeGraphLoading(false);
            setKnowledgeGraphModalShow(true);
        }
     });
  }
  
knowledgeGraphResponse ()
}, [knowledgeGraphLoading]);

const handleRetry = () => {
  setKnowledgeGraphLoading(true);
  setKnowledgeGraphModalShow(false);
}
  return (
    <>
    {knowledgeGraphLoading ? (
      <div className="loading">
        <LoadingAnimation />
      </div>
    ) : ( 
      knowledgeGraphModalShow ? (
        <KnowledgeGraphModal
          onButtonClick={handleRetry}
          knowledgeGraph={""}
          knowledgeGraphModalShow={knowledgeGraphModalShow}
          knowledgeGraphModalHide={() => setKnowledgeGraphModalShow(false)}
        />) : (
        <ForceGraph3D
          graphData={knowledgeGraphData}
          linkWidth={2}
          nodeId="id"
          ref={fgRef}
          onNodeClick={handleClick}
          nodeLabel={(node) =>
            `Title: ${node.title} <br />
            Authors: ${node.authors} <br />
            Year: ${node.year} <br />`
          }
        />
      )
    )
  }
  </>
  );
}
