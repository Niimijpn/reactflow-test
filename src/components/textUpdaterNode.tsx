import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import "@/styles/text-updater-node.css";

interface TextUpdaterNodeProps {
  data: any;
  isConnectable: boolean;
}

export default function TextUpdaterNode({
  data,
  isConnectable,
}: TextUpdaterNodeProps) {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
