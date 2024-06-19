"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Controls,
  Background,
  SelectionMode,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

import CustomCSVNode from "./CustomCSVNode";
import { loadCSV, extractData } from "../libs/csvUtils";

const rfStyle = {
  backgroundColor: "#f0f0f0",
};

const nodeTypes = {
  customNode: CustomCSVNode,
};

export default function App({
  nodes: initNodes,
  edges: initEdges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const [nodes, setNodes] = useState<Node[]>(initNodes);
  const [edges, setEdges] = useState<Edge[]>(initEdges);
  const [csvData, setcsvData] = useState<any[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      setNodes((nds) => applyNodeChanges(chs, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (chs) => {
      setEdges((eds) => applyEdgeChanges(chs, eds));
    },
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadCSV(file, setcsvData);
    }
  };

  const handleExtractData = () => {
    console.log("Nodes:", nodes); // ノードデータをコンソールに出力して確認
    extractData(nodes, csvData);
  };

  const handleAddNode = (type: string): void => {
    const newText: string | null = prompt(`Enter ${type} for the new node:`);
    if (newText) {
      const newNode: Node = {
        id: (nodes.length + 1).toString(),
        data: { label: newText, type },
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        type: "customNode",
      };
      setNodes([...nodes, newNode]);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-5">
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
        <button onClick={() => handleAddNode("row")}>Add Row Node</button>
        <button onClick={() => handleAddNode("col")}>Add Column Node</button>
        <button onClick={handleExtractData}>Extract Data</button>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={rfStyle}
          nodeTypes={nodeTypes}
          panOnScroll={true}
          selectNodesOnDrag={true}
          panOnDrag={true}
          selectionMode={SelectionMode.Partial}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
