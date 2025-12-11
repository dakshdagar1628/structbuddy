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
import { Trophy, DoorOpen } from "lucide-react";
import TheorySection from "./TheorySection";

// Custom node components
const StartNode = ({ data }: NodeProps) => (
  <div className="px-6 py-3 bg-blue-500/20 border-2 border-blue-500 rounded-full text-blue-400 font-mono text-sm">
    <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    {data.label as string}
  </div>
);

const ProcessNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-orange-500/50 rounded-lg text-foreground font-mono text-sm min-w-[180px]">
    <Handle type="target" position={Position.Top} className="!bg-orange-500" />
    <div className="text-center">
      <div className="font-bold text-orange-400">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-orange-500" />
  </div>
);

const ActionNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-green-500/50 rounded-lg text-foreground font-mono text-sm min-w-[180px] transform rotate-0">
    <Handle type="target" position={Position.Top} className="!bg-green-500" />
    <div className="text-center">
      <div className="font-bold text-green-400">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-green-500" />
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
  action: ActionNode,
  end: EndNode,
};

const arrayConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Declare Array",
    description: "Reserve contiguous block",
  },
  {
    id: "3",
    type: "process" as const,
    label: "Index 0",
    description: "First Element (Head)",
  },
  {
    id: "4",
    type: "process" as const,
    label: "Index N-1",
    description: "Last Element (Tail)",
  },
  {
    id: "5",
    type: "action" as const,
    label: "Access[i]",
    description: "Jump to Memory Address",
  },
  { id: "6", type: "end" as const, label: "Stop" },
];

const theoryContent = {
  theory: "A fixed row of seats. You can find any seat instantly, but you can't add more seats easily.",
  metaphorTitle: "Think of an Egg Carton",
  metaphor: "It has exactly 12 spots. You can grab the egg in spot #5 instantly because you know exactly where it is. But you can't magically stretch the carton to hold 13 eggs.",
  examples: [
    {
      icon: Trophy,
      title: "Scoreboards",
      description: "A 'Top 10' list has a fixed number of spots."
    },
    {
      icon: DoorOpen,
      title: "Lockers",
      description: "Numbered lockers in a school hallway are fixed in place."
    }
  ]
};

const ArraysConceptCanvas = () => {
  const initialNodes: Node[] = useMemo(() => {
    return arrayConceptNodes.map((node, index) => ({
      id: node.id,
      type: node.type,
      position: { x: 250, y: index * 120 },
      data: { label: node.label, description: node.description },
      draggable: true,
    }));
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    return arrayConceptNodes.slice(0, -1).map((node, index) => ({
      id: `e${node.id}-${arrayConceptNodes[index + 1].id}`,
      source: node.id,
      target: arrayConceptNodes[index + 1].id,
      animated: true,
      style: { stroke: "hsl(30 100% 50%)", strokeDasharray: "5,5" },
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
            style: { stroke: "hsl(30 100% 50%)", strokeDasharray: "5,5" },
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
            Arrays Concept Flow
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
            <Background color="hsl(30 100% 50% / 0.1)" gap={20} />
            <Controls className="!bg-card !border-border" />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "start":
                    return "hsl(210 100% 50%)";
                  case "process":
                    return "hsl(30 100% 50%)";
                  case "action":
                    return "hsl(140 100% 40%)";
                  case "end":
                    return "hsl(30 100% 50%)";
                  default:
                    return "hsl(30 100% 50%)";
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

export default ArraysConceptCanvas;
