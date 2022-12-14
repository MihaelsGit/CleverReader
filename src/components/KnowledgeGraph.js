import  {React, useRef, useCallback }  from "react";
import ForceGraph3D from 'react-force-graph-3d';



export default function KnowledgeGraph() {
  const fgRef = useRef();
  
  const handleClick = useCallback(node => {
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, 
      node, 
      3000  
    );
  }, [fgRef]);

  const data = {nodes: [
  {name: "Ivan", surname: "Juričić", age: "23"}, 
  {name: "Mihael", surname: "Kampić", age: 24}, 
  {name: "Leon", surname: "Kranjčević", age: 23},
  {name: "Jaime", surname: "Baquerizo", age: 20},
  {name: "Patrick", surname: "Niantcho", age: 23},
  {name: "Santiago", surname: "Pérez Roldán", age: 22},
  {name: "Giancarlo", surname: "Sorrentino", age: 25}], 
  
  links: [
    {source:"Ivan", target:"Patrick"},
    {source:"Patrick", target:"Mihael"},
    {source:"Mihael", target:"Ivan"},
    {source:"Santiago", target:"Jaime"},
    {source:"Jaime", target:"Leon"},
    {source:"Leon", target:"Santiago"},
    {source:"Leon", target:"Ivan"}] }
  return (
  <ForceGraph3D 
      graphData={data} 
      linkWidth={2}
      nodeId = "name"
      ref={fgRef}
      onNodeClick={handleClick}
      nodeLabel={
        node => 
        `name: ${node.name} <br />
        surname: ${node.surname} <br />
        age: ${node.age} <br />`}
  />
  )
}

