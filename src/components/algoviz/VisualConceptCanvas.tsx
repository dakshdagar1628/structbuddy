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

interface ConceptNode {
  id: string;
  type: "start" | "process" | "decision" | "end";
  label: string;
  description?: string;
}

interface VisualConceptCanvasProps {
  conceptNodes: ConceptNode[];
  dataStructureType: "stack" | "queue";
}

// Custom node components
const StartNode = ({ data }: NodeProps) => (
  <div className="px-6 py-3 bg-primary/20 border-2 border-primary rounded-full text-primary font-mono text-sm neon-border">
    <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    {data.label as string}
  </div>
);

const ProcessNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-neon-cyan/50 rounded-lg text-foreground font-mono text-sm min-w-[150px]">
    <Handle type="target" position={Position.Top} className="!bg-neon-cyan" />
    <div className="text-center">
      <div className="font-bold text-neon-cyan">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      className="!bg-neon-cyan"
    />
  </div>
);

const DecisionNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 bg-card border-2 border-neon-purple/50 rounded-lg text-foreground font-mono text-sm transform rotate-0">
    <Handle
      type="target"
      position={Position.Top}
      className="!bg-neon-purple"
    />
    <div className="text-center">
      <div className="font-bold text-neon-purple">{data.label as string}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description as string}
        </div>
      )}
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      className="!bg-neon-purple"
    />
  </div>
);

const EndNode = ({ data }: NodeProps) => (
  <div className="px-6 py-3 bg-accent/20 border-2 border-accent rounded-full text-accent font-mono text-sm neon-border-red">
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
}: VisualConceptCanvasProps) => {
  // Generate initial nodes and edges based on conceptNodes
  const initialNodes: Node[] = useMemo(() => {
    return conceptNodes.map((node, index) => ({
      id: node.id,
      type: node.type,
      position: { x: 250, y: index * 120 },
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
    <motion.div
      className="h-full bg-card/50 border border-border rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-border bg-card/80">
        <h3 className="text-sm font-display text-foreground">
          {dataStructureType === "stack" ? "Stack" : "Queue"} Concept Flow
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
          <Background color="hsl(160 100% 50% / 0.1)" gap={20} />
          <Controls className="!bg-card !border-border" />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case "start":
                  return "hsl(160 100% 50%)";
                case "process":
                  return "hsl(180 100% 50%)";
                case "decision":
                  return "hsl(280 100% 60%)";
                case "end":
                  return "hsl(340 100% 55%)";
                default:
                  return "hsl(160 100% 50%)";
              }
            }}
            className="!bg-card/80"
          />
        </ReactFlow>
      </div>
    </motion.div>
  );
};

export default VisualConceptCanvas;
