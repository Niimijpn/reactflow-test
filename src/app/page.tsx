import { Edge, Node, Position } from "reactflow";

import Flow from "@/components/Flow";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 5 },
    data: { label: "Hello" },
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
  {
    id: "3",
    position: { x: 400, y: 100 },
    data: { value: 123 },
    type: "textupdater",
    style: { color: "black" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: false,
  },
];

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
