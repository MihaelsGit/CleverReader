import { React, useRef, useCallback, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function KnowledgeGraph({ references }) {
  const fgRef = useRef();
  const [knowledgeGraphLoading, setKnowledgeGraphLoading] = useState(true);
  const [knowledgeGraphData, setKnowledgeGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [, setKnowledgeGraphModalShow] = useState(false);

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

  useEffect(() => {}, []);

  useEffect(() => {
    if (references !== null) {
      setKnowledgeGraphData(references);
      setKnowledgeGraphLoading(false);
    } else {
      setKnowledgeGraphLoading(false);
      setKnowledgeGraphModalShow(true);
    }
  }, [references, knowledgeGraphLoading, knowledgeGraphData]);

  return (
    <>
      {knowledgeGraphLoading &&
      references === null &&
      knowledgeGraphData === null ? (
        <div className="loading">
          <LoadingAnimation />
        </div>
      ) : (
        <ForceGraph3D
          graphData={knowledgeGraphData}
          nodeId="title"
          ref={fgRef}
          height={400}
          width={600}
          onNodeClick={handleClick}
          nodeLabel={(node) =>
            `Title: ${node.title} <br />
            Authors: ${node.author} <br />`
          }
        />
      )}
    </>
  );
}
