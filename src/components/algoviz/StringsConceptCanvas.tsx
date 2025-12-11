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
import { KeyRound, User } from "lucide-react";
import TheorySection from "./TheorySection";

// Custom node components
const StartNode = ({ data }: NodeProps) => (
  <div className="px-6 py-3 bg-blue-500/20 border-2 border-blue-500 rounded-full text-blue-400 font-mono text-sm">
    <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    {data.label as string}
  </div>
);

const ProcessNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-emerald-500/50 rounded-lg text-foreground font-mono text-sm min-w-[180px]">
    <Handle type="target" position={Position.Top} className="!bg-emerald-500" />
    <div className="text-center">
      <div className="font-bold text-emerald-400">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-emerald-500" />
  </div>
);

const DecisionNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-purple-500/50 rounded-lg text-foreground font-mono text-sm min-w-[180px] transform rotate-0">
    <Handle type="target" position={Position.Top} className="!bg-purple-500" />
    <div className="text-center">
      <div className="font-bold text-purple-400">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
  </div>
);

const ErrorNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-red-500/50 rounded-lg text-foreground font-mono text-sm min-w-[180px]">
    <Handle type="target" position={Position.Top} className="!bg-red-500" />
    <div className="text-center">
      <div className="font-bold text-red-400">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-red-500" />
  </div>
);

const EndNode = ({ data }: NodeProps) => (
  <div className="px-6 py-3 bg-orange-500/20 border-2 border-orange-500 rounded-full text-orange-400 font-mono text-sm">
    <Handle type="target" position={Position.Top} className="!bg-orange-500" />
    {data.label as string}
  </div>
);

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  error: ErrorNode,
  end: EndNode,
};

const stringConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Create String",
    description: "Allocated as 'H-E-L-L-O'",
  },
  {
    id: "3",
    type: "process" as const,
    label: "Index Check",
    description: "0-Indexed Chars",
  },
  {
    id: "4",
    type: "decision" as const,
    label: "Try Change?",
    description: "str[0] = 'X'?",
  },
  {
    id: "5",
    type: "error" as const,
    label: "Error!",
    description: "Immutable: Cannot Change",
  },
  { id: "6", type: "end" as const, label: "Stop" },
];

const theoryContent = {
  theory: "A chain of letters that cannot be changed.",
  metaphorTitle: "Think of a Printed Book",
  metaphor: "Once the words are printed on the paper, you can't change them. If you want to fix a typo, you have to print a whole new page.",
  examples: [
    {
      icon: KeyRound,
      title: "Passwords",
      description: "Your password is a specific string of characters."
    },
    {
      icon: User,
      title: "Usernames",
      description: "When you type your name, the computer stores it as a fixed string."
    }
  ]
};

const StringsConceptCanvas = () => {
  const initialNodes: Node[] = useMemo(() => {
    return stringConceptNodes.map((node, index) => ({
      id: node.id,
      type: node.type,
      position: { x: 250, y: index * 120 },
      data: { label: node.label, description: node.description },
      draggable: true,
    }));
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    return stringConceptNodes.slice(0, -1).map((node, index) => ({
      id: `e${node.id}-${stringConceptNodes[index + 1].id}`,
      source: node.id,
      target: stringConceptNodes[index + 1].id,
      animated: true,
      style: { stroke: "hsl(160 100% 40%)", strokeDasharray: "5,5" },
    }));
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "hsl(160 100% 40%)", strokeDasharray: "5,5" },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* ReactFlow Diagram */}
      <motion.div
        className="flex-1 min-h-[400px] bg-card/50 border border-border rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-border bg-card/80">
          <h3 className="text-sm font-display text-foreground">
            Strings Concept Flow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Drag nodes to rearrange • Connect nodes by dragging handles
          </p>
        </div>
        <div className="h-[calc(100%-60px)]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
          >
            <Background color="hsl(160 100% 40% / 0.1)" gap={20} />
            <Controls className="!bg-card !border-border" />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "start":
                    return "hsl(210 100% 50%)";
                  case "process":
                    return "hsl(160 100% 40%)";
                  case "decision":
                    return "hsl(280 100% 60%)";
                  case "error":
                    return "hsl(0 100% 50%)";
                  case "end":
                    return "hsl(30 100% 50%)";
                  default:
                    return "hsl(160 100% 40%)";
                }
              }}
              className="!bg-card/80"
            />
          </ReactFlow>
        </div>
      </motion.div>

      {/* Theory Section */}
      <TheorySection
        theory={theoryContent.theory}
        metaphorTitle={theoryContent.metaphorTitle}
        metaphor={theoryContent.metaphor}
        examples={theoryContent.examples}
      />
    </div>
  );
};

export default StringsConceptCanvas;
