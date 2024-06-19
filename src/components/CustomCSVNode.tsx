import React from "react";
import { Handle, Position } from "reactflow";

interface CustomNodeProps {
  data: any; // or specify a more specific type for 'data'
}

const CustomCSVNode = ({ data }: CustomNodeProps) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid black",
        borderRadius: 5,
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div>{data.type}</div>
      <Handle
        type="target"
        position={Position.Top}
        style={{ borderRadius: 0 }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default CustomCSVNode;
