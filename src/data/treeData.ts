import { CodeStep } from "@/components/algoviz/IntegratedCodeLab";

export const bstInsertDisplayCode: string[] = [
  "class Node:",
  "    def __init__(self, val):",
  "        self.val = val",
  "        self.left = None",
  "        self.right = None",
  "",
  "def insert(root, val):",
  "    if root is None:",
  "        return Node(val)",
  "    if val < root.val:",
  "        root.left = insert(root.left, val)",
  "    else:",
  "        root.right = insert(root.right, val)",
  "    return root",
];

// Tree grows: insert 5, then 3, then 7, then 1, then 4
// NodeModel: id, val, next (right child id), prev (left child id)
export const bstInsertCode: CodeStep[] = [
  {
    code: "class Node:",
    lineIndex: 0,
    explanation: "We define a Node class — the building block of our tree. Each node will hold a value and pointers to its left and right children.",
    variables: {},
    visualState: { nodes: [], pointers: [] },
  },
  {
    code: "    def __init__(self, val):",
    lineIndex: 1,
    explanation: "The constructor takes a value. When we create a new node, we pass in the number we want to store.",
    variables: { val: "?" },
    visualState: { nodes: [], pointers: [] },
  },
  {
    code: "        self.val = val",
    lineIndex: 2,
    explanation: "Store the value in the node. This is the data the node holds — the number we'll compare during insertions and searches.",
    variables: { "self.val": "val" },
    visualState: { nodes: [], pointers: [] },
  },
  {
    code: "        self.left = None",
    lineIndex: 3,
    explanation: "Left child starts as None — no smaller child yet. All values smaller than this node will eventually hang off the left.",
    variables: { "self.val": "val", "self.left": "None" },
    visualState: { nodes: [], pointers: [] },
  },
  {
    code: "        self.right = None",
    lineIndex: 4,
    explanation: "Right child starts as None — no larger child yet. The Node class is ready. Now let's build the insert function that uses it.",
    variables: { "self.val": "val", "self.left": "None", "self.right": "None" },
    visualState: { nodes: [], pointers: [] },
  },

  {
    code: "def insert(root, val):",
    lineIndex: 6,
    explanation: "We define insert(root, val). If the tree is empty, create a new node. Otherwise, recurse left if val is smaller, right if larger. This is the heart of BST ordering.",
    variables: { root: "None", val: "5" },
    visualState: { nodes: [], pointers: [] },
  },
  {
    code: "    if root is None:",
    lineIndex: 7,
    explanation: "root is None — the tree is empty. We must create the very first node.",
    variables: { root: "None", val: "5", "root is None": "True ✓" },
    visualState: { nodes: [], pointers: [] },
  },
  {
    code: "        return Node(val)",
    lineIndex: 8,
    explanation: "We create Node(5). This becomes the root of our BST. Every future insertion will be compared against this value.",
    variables: { root: "None", val: "5", "new node": "Node(5)" },
    visualState: {
      nodes: [{ id: "5", val: 5, next: null, prev: null }],
      pointers: [{ label: "root", targetId: "5" }],
    },
  },
  {
    code: "def insert(root, val):",
    lineIndex: 6,
    explanation: "Call insert(root=Node(5), val=3). We want to insert 3 into the tree that currently has just the root node 5.",
    variables: { root: "Node(5)", val: "3" },
    visualState: {
      nodes: [{ id: "5", val: 5, next: null, prev: null }],
      pointers: [{ label: "current", targetId: "5" }],
    },
  },
  {
    code: "    if val < root.val:",
    lineIndex: 9,
    explanation: "Is 3 < 5? Yes! So 3 belongs in the LEFT subtree of 5. We recurse left.",
    variables: { root: "Node(5)", val: "3", "3 < 5": "True ✓ → go LEFT" },
    visualState: {
      nodes: [{ id: "5", val: 5, next: null, prev: null }],
      activeIndices: [],
      action: "read",
      pointers: [{ label: "current", targetId: "5" }],
    },
  },
  {
    code: "        root.left = insert(root.left, val)",
    lineIndex: 10,
    explanation: "root.left is None, so insert(None, 3) creates Node(3) and attaches it as the left child of node 5.",
    variables: { root: "Node(5)", val: "3", "root.left": "Node(3) ← NEW" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: null, prev: "3" },
        { id: "3", val: 3, next: null, prev: null },
      ],
      action: "add",
      pointers: [{ label: "inserted", targetId: "3" }],
    },
  },
  {
    code: "def insert(root, val):",
    lineIndex: 6,
    explanation: "Call insert(root=Node(5), val=7). Insert 7 into the tree. 7 > 5, so it will go to the right.",
    variables: { root: "Node(5)", val: "7" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: null, prev: "3" },
        { id: "3", val: 3, next: null, prev: null },
      ],
      pointers: [{ label: "current", targetId: "5" }],
    },
  },
  {
    code: "    if val < root.val:",
    lineIndex: 9,
    explanation: "Is 7 < 5? No. So 7 belongs in the RIGHT subtree of 5.",
    variables: { root: "Node(5)", val: "7", "7 < 5": "False ✗ → go RIGHT" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: null, prev: "3" },
        { id: "3", val: 3, next: null, prev: null },
      ],
      action: "read",
      pointers: [{ label: "current", targetId: "5" }],
    },
  },
  {
    code: "        root.right = insert(root.right, val)",
    lineIndex: 11,
    explanation: "root.right is None, so insert(None, 7) creates Node(7) and attaches it as the right child of node 5.",
    variables: { root: "Node(5)", val: "7", "root.right": "Node(7) ← NEW" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: null, prev: null },
        { id: "7", val: 7, next: null, prev: null },
      ],
      action: "add",
      pointers: [{ label: "inserted", targetId: "7" }],
    },
  },
  {
    code: "def insert(root, val):",
    lineIndex: 6,
    explanation: "Call insert(root=Node(5), val=1). Insert 1. It will travel left twice: 1 < 5 → left to Node(3), then 1 < 3 → left again.",
    variables: { root: "Node(5)", val: "1" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: null, prev: null },
        { id: "7", val: 7, next: null, prev: null },
      ],
      pointers: [{ label: "current", targetId: "5" }],
    },
  },
  {
    code: "    if val < root.val:",
    lineIndex: 9,
    explanation: "1 < 5? Yes → recurse left to Node(3). Then check: 1 < 3? Yes → recurse left to None. Create Node(1) there.",
    variables: { root: "Node(3)", val: "1", "1 < 3": "True ✓ → go LEFT" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: null, prev: null },
        { id: "7", val: 7, next: null, prev: null },
      ],
      action: "read",
      pointers: [{ label: "current", targetId: "3" }],
    },
  },
  {
    code: "        root.left = insert(root.left, val)",
    lineIndex: 10,
    explanation: "Node(3).left was None. insert(None, 1) returns Node(1). Now Node(1) is the left child of Node(3).",
    variables: { root: "Node(3)", val: "1", "root.left": "Node(1) ← NEW" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: null, prev: "1" },
        { id: "7", val: 7, next: null, prev: null },
        { id: "1", val: 1, next: null, prev: null },
      ],
      action: "add",
      pointers: [{ label: "inserted", targetId: "1" }],
    },
  },
  {
    code: "def insert(root, val):",
    lineIndex: 6,
    explanation: "Final insertion: insert(root=Node(5), val=4). 4 < 5 → go left to Node(3). 4 > 3 → go right. Node(3).right is None → create Node(4).",
    variables: { root: "Node(5)", val: "4" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: null, prev: "1" },
        { id: "7", val: 7, next: null, prev: null },
        { id: "1", val: 1, next: null, prev: null },
      ],
      pointers: [{ label: "current", targetId: "5" }],
    },
  },
  {
    code: "    if val < root.val:",
    lineIndex: 9,
    explanation: "At Node(3): Is 4 < 3? No → go right. Node(3).right is None → insert Node(4) there.",
    variables: { root: "Node(3)", val: "4", "4 < 3": "False ✗ → go RIGHT" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: null, prev: "1" },
        { id: "7", val: 7, next: null, prev: null },
        { id: "1", val: 1, next: null, prev: null },
      ],
      action: "read",
      pointers: [{ label: "current", targetId: "3" }],
    },
  },
  {
    code: "        root.right = insert(root.right, val)",
    lineIndex: 11,
    explanation: "Node(3).right = Node(4). The BST is complete! In-order traversal now gives [1, 3, 4, 5, 7] — perfectly sorted.",
    variables: { root: "Node(3)", val: "4", "root.right": "Node(4) ← NEW" },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: "4", prev: "1" },
        { id: "7", val: 7, next: null, prev: null },
        { id: "1", val: 1, next: null, prev: null },
        { id: "4", val: 4, next: null, prev: null },
      ],
      action: "add",
      pointers: [{ label: "inserted", targetId: "4" }],
    },
  },
  {
    code: "    return root",
    lineIndex: 13,
    explanation: "BST complete! Inserted [5, 3, 7, 1, 4]. In-order traversal: 1 → 3 → 4 → 5 → 7 (sorted!). Left < Parent < Right at every node.",
    variables: {
      "in-order": "[1, 3, 4, 5, 7]",
      height: "2",
      nodes: "5",
    },
    visualState: {
      nodes: [
        { id: "5", val: 5, next: "7", prev: "3" },
        { id: "3", val: 3, next: "4", prev: "1" },
        { id: "7", val: 7, next: null, prev: null },
        { id: "1", val: 1, next: null, prev: null },
        { id: "4", val: 4, next: null, prev: null },
      ],
      action: "none",
      pointers: [],
    },
  },
];
