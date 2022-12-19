import { React, useRef, useCallback } from "react";
import ForceGraph3D from "react-force-graph-3d";

import { mockData } from "../constants/knowledgeGraphData";

export default function KnowledgeGraph() {
  const fgRef = useRef();

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

  return (
    <ForceGraph3D
      graphData={mockData}
      linkWidth={2}
      nodeId="name"
      ref={fgRef}
      onNodeClick={handleClick}
      nodeLabel={(node) =>
        `name: ${node.name} <br />
        surname: ${node.surname} <br />
        age: ${node.age} <br />`
      }
    />
  );
}
