import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Handle,
  Position,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { FolderTree, Search } from "lucide-react";
import TheorySection from "./TheorySection";

// ponytail: reusing exact same node shape pattern from ArraysConceptCanvas
const RootNode = ({ data }: NodeProps) => (
  <div className="px-6 py-3 bg-green-500/10 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/60 rounded-full text-emerald-800 dark:text-green-400 font-mono text-sm text-center shadow-soft-sm">
    <Handle type="source" position={Position.Bottom} className="!bg-green-500" />
    {data.label as string}
  </div>
);

const BranchNode = ({ data }: NodeProps) => (
  <div className="px-5 py-4 bg-card border border-emerald-500/30 dark:border-emerald-500/50 rounded-lg font-mono text-sm min-w-[160px] shadow-soft-sm">
    <Handle type="target" position={Position.Top} className="!bg-emerald-500" />
    <div className="text-center">
      <div className="font-bold text-emerald-800 dark:text-emerald-450">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">{data.description as string}</div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-emerald-500" />
  </div>
);

const LeafNode = ({ data }: NodeProps) => (
  <div className="px-5 py-4 bg-card border border-teal-500/30 dark:border-teal-500/50 rounded-lg font-mono text-sm min-w-[160px] shadow-soft-sm">
    <Handle type="target" position={Position.Top} className="!bg-teal-500" />
    <div className="text-center">
      <div className="font-bold text-teal-700 dark:text-teal-400">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">{data.description as string}</div>
      )}
    </div>
  </div>
);

const nodeTypes = { root: RootNode, branch: BranchNode, leaf: LeafNode };

const initialNodes: Node[] = [
  { id: "1", type: "root",   position: { x: 200, y: 0   }, data: { label: "Root Node (5)" } },
  { id: "2", type: "branch", position: { x: 40,  y: 120 }, data: { label: "Left Child (3)",  description: "val < parent → go left"  } },
  { id: "3", type: "branch", position: { x: 340, y: 120 }, data: { label: "Right Child (7)", description: "val > parent → go right" } },
  { id: "4", type: "leaf",   position: { x: 0,   y: 250 }, data: { label: "Leaf (1)",        description: "No children" } },
  { id: "5", type: "leaf",   position: { x: 160, y: 250 }, data: { label: "Leaf (4)",        description: "No children" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, label: "< root",  style: { stroke: "#22c55e" }, labelStyle: { fill: "#22c55e", fontSize: 11 } },
  { id: "e1-3", source: "1", target: "3", animated: true, label: "> root",  style: { stroke: "#22c55e" }, labelStyle: { fill: "#22c55e", fontSize: 11 } },
  { id: "e2-4", source: "2", target: "4", animated: true, label: "< 3",    style: { stroke: "#14b8a6" }, labelStyle: { fill: "#14b8a6", fontSize: 11 } },
  { id: "e2-5", source: "2", target: "5", animated: true, label: "> 3",    style: { stroke: "#14b8a6" }, labelStyle: { fill: "#14b8a6", fontSize: 11 } },
];

const theoryContent = {
  theory: "A hierarchical structure where each node has at most two children. Left subtree always holds smaller values, right holds larger — enabling O(log n) search.",
  metaphorTitle: "Think of a Library Catalogue",
  metaphor: "Books before 500 go left, books after 500 go right. At each shelf you make one decision. In a balanced library you find any book in just a few steps — never scanning the whole collection.",
  examples: [
    { icon: FolderTree, title: "File Systems", description: "Folders branch into sub-folders just like a tree." },
    { icon: Search,     title: "Autocomplete", description: "Search engines store words in BST-like tries for fast prefix lookup." },
  ],
};

const TreeConceptCanvas = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // ponytail: same onConnect pattern as ArraysConceptCanvas — no abstraction needed
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#22c55e" } }, eds)
      ),
    [setEdges]
  );

  const edgeOptions = useMemo(() => ({ stroke: "#22c55e", strokeDasharray: "5,5" }), []);

  return (
    <div className="w-full flex flex-col gap-6">
      <motion.div
        className="w-full h-[420px] sm:h-[520px] bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-border bg-card shrink-0">
          <h3 className="text-sm font-display font-bold text-foreground">Binary Search Tree Concept Flow</h3>
          <p className="text-xs text-muted-foreground mt-1">Drag nodes to rearrange • Edges show BST routing rules</p>
        </div>
        <div className="flex-1 w-full relative min-h-[320px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ style: edgeOptions }}
            fitView
            className="bg-card/50"
          >
            <Background color="hsl(var(--primary) / 0.15)" gap={20} />
            <Controls className="!bg-card !border-border !shadow-md" />
            <MiniMap
              nodeColor={(n) =>
                n.type === "root" ? "#22c55e" : n.type === "branch" ? "#10b981" : "#14b8a6"
              }
              className="!bg-card !border-border hidden sm:block"
            />
          </ReactFlow>
        </div>
      </motion.div>

      <TheorySection
        theory={theoryContent.theory}
        metaphorTitle={theoryContent.metaphorTitle}
        metaphor={theoryContent.metaphor}
        examples={theoryContent.examples}
      />
    </div>
  );
};

export default TreeConceptCanvas;
