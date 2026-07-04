import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VisualState, NodeModel } from "./IntegratedCodeLab";
import { layoutTree, renderTree, treeBounds } from "./treeUtils";

interface TreeVisualizerProps {
  visualState: VisualState;
}

// Converts flat NodeModel[] (BST step data) to a real tree structure for rendering.
// NodeModel reuse: id=val, prev=leftChildId, next=rightChildId
function buildTree(
  nodes: NodeModel[],
  id: string | null
): { val: number; left: ReturnType<typeof buildTree>; right: ReturnType<typeof buildTree> } | null {
  if (!id) return null;
  const n = nodes.find((x) => x.id === id);
  if (!n) return null;
  return {
    val: Number(n.val),
    left: buildTree(nodes, n.prev ?? null),
    right: buildTree(nodes, n.next ?? null),
  };
}

function findRoot(nodes: NodeModel[]): string | null {
  const childIds = new Set(
    nodes.flatMap((n) => [n.next, n.prev].filter(Boolean) as string[])
  );
  return nodes.find((n) => !childIds.has(n.id))?.id ?? null;
}

const TreeVisualizer = ({ visualState }: TreeVisualizerProps) => {
  const { nodes = [], pointers = [], action = "none" } = visualState;

  const activeVals = useMemo(
    () => new Set(pointers.map((p) => Number(p.targetId))),
    [pointers]
  );

  const svgTree = useMemo(() => {
    if (!nodes.length) return null;
    const rootId = findRoot(nodes);
    const tree = buildTree(nodes, rootId);
    return layoutTree(tree);
  }, [nodes]);

  const bounds = useMemo(() => treeBounds(svgTree), [svgTree]);
  const pad = 35;
  const vbW = Math.max(bounds.maxX - bounds.minX + pad * 2, 120);
  const vbH = Math.max(bounds.maxY - bounds.minY + pad * 2, 80);
  const vbX = bounds.minX - pad;
  const vbY = bounds.minY - pad;

  if (!nodes.length) {
    return (
      <div className="relative flex items-center justify-center min-h-[260px] w-full bg-transparent">
        <span className="text-muted-foreground/60 font-mono text-sm animate-pulse">Empty Tree</span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[260px] w-full bg-transparent p-4">
      <div className="absolute top-4 left-4">
        <span className="text-muted-foreground/40 font-mono text-[10px] font-bold uppercase tracking-wider">Tree Stage</span>
      </div>

      {/* Pointer labels */}
      <AnimatePresence>
        {pointers.map((p) => (
          <motion.span
            key={p.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-4 right-4 text-xs font-mono font-bold px-2 py-1 rounded ${
              action === "add" ? "bg-amber-500/30 text-amber-300" : "bg-blue-500/30 text-blue-300"
            }`}
          >
            {p.label}: {p.targetId}
          </motion.span>
        ))}
      </AnimatePresence>

      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        className="w-full max-h-[280px]"
        style={{ overflow: "visible" }}
      >
        {renderTree(svgTree, { activeVals, action })}
      </svg>
    </div>
  );
};

export default TreeVisualizer;
