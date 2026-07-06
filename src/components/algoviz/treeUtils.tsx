// ponytail: shared recursive SVG layout used by TreeVisualizer and TreeGameArena
export interface BSTNode {
  val: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export function bstInsert(root: BSTNode | null, val: number): BSTNode {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) return { ...root, left: bstInsert(root.left, val) };
  if (val > root.val) return { ...root, right: bstInsert(root.right, val) };
  return root; // duplicate — ignore
}

interface LayoutNode {
  val: number;
  x: number;
  y: number;
  left: LayoutNode | null;
  right: LayoutNode | null;
}

export function layoutTree(
  node: BSTNode | null,
  x = 0,
  y = 0,
  gap = 80
): LayoutNode | null {
  if (!node) return null;
  return {
    val: node.val,
    x,
    y,
    left: layoutTree(node.left, x - gap, y + 70, gap / 1.6),
    right: layoutTree(node.right, x + gap, y + 70, gap / 1.6),
  };
}

interface RenderOptions {
  activeVals?: Set<number>;
  foundVal?: number | null;
  action?: string;
}

// Renders the full tree as SVG elements — shared between visualizer & game arena
export function renderTree(
  node: LayoutNode | null,
  opts: RenderOptions = {}
): React.ReactNode[] {
  if (!node) return [];
  const elements: React.ReactNode[] = [];
  const { activeVals = new Set(), foundVal = null, action = "none" } = opts;

  // Edge to left child
  if (node.left) {
    elements.push(
      <line
        key={`el-${node.val}-${node.left.val}`}
        x1={node.x}
        y1={node.y}
        x2={node.left.x}
        y2={node.left.y}
        stroke="hsl(var(--border))"
        strokeWidth={2}
      />
    );
    elements.push(...renderTree(node.left, opts));
  }
  // Edge to right child
  if (node.right) {
    elements.push(
      <line
        key={`er-${node.val}-${node.right.val}`}
        x1={node.x}
        y1={node.y}
        x2={node.right.x}
        y2={node.right.y}
        stroke="hsl(var(--border))"
        strokeWidth={2}
      />
    );
    elements.push(...renderTree(node.right, opts));
  }

  // Node circle
  const isActive = activeVals.has(node.val);
  const isFound = node.val === foundVal;
  const fill = isFound
    ? "rgba(16, 185, 129, 0.14)"
    : isActive && action === "add"
    ? "rgba(245, 158, 11, 0.14)"
    : isActive
    ? "rgba(59, 130, 246, 0.14)"
    : "hsl(var(--card))";
  const stroke = isFound 
    ? "rgb(16, 185, 129)" 
    : isActive && action === "add"
    ? "rgb(245, 158, 11)" 
    : isActive 
    ? "rgb(59, 130, 246)" 
    : "hsl(var(--border))";

  elements.push(
    <g key={`g-${node.val}-${node.x}-${node.y}`}>
      <circle
        cx={node.x}
        cy={node.y}
        r={22}
        fill={fill}
        stroke={stroke}
        strokeWidth={isActive || isFound ? 2.5 : 1.5}
      />
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="hsl(var(--foreground))"
        fontSize={13}
        fontFamily="monospace"
        fontWeight="bold"
      >
        {node.val}
      </text>
    </g>
  );

  return elements;
}

// Returns {minX, maxX, minY, maxY} for viewBox calculation
export function treeBounds(node: LayoutNode | null): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
} {
  if (!node) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  const l = treeBounds(node.left);
  const r = treeBounds(node.right);
  return {
    minX: Math.min(node.x, l.minX, r.minX),
    maxX: Math.max(node.x, l.maxX, r.maxX),
    minY: Math.min(node.y, l.minY, r.minY),
    maxY: Math.max(node.y, l.maxY, r.maxY),
  };
}
