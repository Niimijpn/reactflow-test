import { Edge, Node, Position } from "reactflow";

import Flow from "@/components/Flow";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

function fetchData() {
  return {
    nodes: initialNodes,
    edges: initialEdges,
  };
}

// Client components cannot be async functions.
// https://nextjs.org/docs/messages/no-async-client-component

export default function App() {
  const { nodes, edges } = fetchData();

  return (
    <main>
      <div>
        <h1>Flow</h1>
      </div>
      <Flow nodes={nodes} edges={edges} />
    </main>
  );
}
