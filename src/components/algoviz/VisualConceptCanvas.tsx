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
import TheorySection from "./TheorySection";
import { LucideIcon } from "lucide-react";

interface ConceptNode {
  id: string;
  type: "start" | "process" | "decision" | "end";
  label: string;
  description?: string;
}

interface RealWorldExample {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TheoryContent {
  theory: string;
  metaphorTitle: string;
  metaphor: string;
  examples: RealWorldExample[];
}

interface VisualConceptCanvasProps {
  conceptNodes: ConceptNode[];
  dataStructureType: "stack" | "queue" | "linked-list";
  theoryContent?: TheoryContent;
}

// Custom node components
const StartNode = ({ data }: NodeProps) => (
  <div className="px-5 py-2.5 bg-primary/10 border-2 border-primary rounded-full text-primary font-mono text-xs sm:text-sm font-bold shadow-sm">
    <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    {data.label as string}
  </div>
);

const ProcessNode = ({ data }: NodeProps) => (
  <div className="px-5 py-3.5 bg-card border-2 border-primary/60 rounded-xl text-foreground font-mono text-xs sm:text-sm min-w-[140px] max-w-[220px] shadow-md">
    <Handle type="target" position={Position.Top} className="!bg-primary" />
    <div className="text-center">
      <div className="font-bold text-primary">{data.label as string}</div>
      {data.description && (
        <div className="text-[11px] text-muted-foreground mt-1 leading-snug">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      className="!bg-primary"
    />
  </div>
);

const DecisionNode = ({ data }: NodeProps) => (
  <div className="px-5 py-3.5 bg-card border-2 border-accent rounded-xl text-foreground font-mono text-xs sm:text-sm min-w-[140px] max-w-[220px] shadow-md">
    <Handle
      type="target"
      position={Position.Top}
      className="!bg-accent"
    />
    <div className="text-center">
      <div className="font-bold text-accent">{data.label as string}</div>
      {data.description && (
        <div className="text-[11px] text-muted-foreground mt-1 leading-snug">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      className="!bg-accent"
    />
  </div>
);

const EndNode = ({ data }: NodeProps) => (
  <div className="px-5 py-2.5 bg-accent/10 border-2 border-accent rounded-full text-accent font-mono text-xs sm:text-sm font-bold shadow-sm">
    <Handle type="target" position={Position.Top} className="!bg-accent" />
    {data.label as string}
  </div>
);

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  end: EndNode,
};

const VisualConceptCanvas = ({
  conceptNodes,
  dataStructureType,
  theoryContent,
}: VisualConceptCanvasProps) => {
  // Generate initial nodes and edges based on conceptNodes
  const initialNodes: Node[] = useMemo(() => {
    return conceptNodes.map((node, index) => ({
      id: node.id,
      type: node.type,
      position: { x: 150, y: index * 110 },
      data: { label: node.label, description: node.description },
      draggable: true,
    }));
  }, [conceptNodes]);

  const initialEdges: Edge[] = useMemo(() => {
    return conceptNodes.slice(0, -1).map((node, index) => ({
      id: `e${node.id}-${conceptNodes[index + 1].id}`,
      source: node.id,
      target: conceptNodes[index + 1].id,
      animated: true,
      style: { stroke: "hsl(160 100% 50%)" },
    }));
  }, [conceptNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "hsl(160 100% 50%)" },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <motion.div
        className="w-full h-[420px] sm:h-[520px] bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-border bg-card shrink-0">
          <h3 className="text-sm font-display font-bold text-foreground">
            {dataStructureType === "stack" 
              ? "Stack" 
              : dataStructureType === "queue" 
              ? "Queue" 
              : "Linked List"} Concept Flow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Drag nodes to rearrange • Connect nodes by dragging handles
          </p>
        </div>
        <div className="flex-1 w-full relative min-h-[320px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="bg-card/50"
          >
            <Background color="hsl(var(--primary) / 0.15)" gap={20} />
            <Controls className="!bg-card !border-border !shadow-md" />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "start":
                    return "hsl(var(--primary))";
                  case "process":
                    return "hsl(210, 80%, 55%)";
                  case "decision":
                    return "hsl(280, 80%, 60%)";
                  case "end":
                    return "hsl(340, 80%, 55%)";
                  default:
                    return "hsl(var(--primary))";
                }
              }}
              className="!bg-card !border-border hidden sm:block"
            />
          </ReactFlow>
        </div>
      </motion.div>

      {/* Theory Section */}
      {theoryContent && (
        <TheorySection
          theory={theoryContent.theory}
          metaphorTitle={theoryContent.metaphorTitle}
          metaphor={theoryContent.metaphor}
          examples={theoryContent.examples}
        />
      )}
    </div>
  );
};

export default VisualConceptCanvas;
