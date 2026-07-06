import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const MODULES = [
  { slug: "arrays", title: "Arrays", principle: "The Contiguous Block", path: "/algoviz/arrays" },
  { slug: "strings", title: "Strings", principle: "The Immutable Chain", path: "/algoviz/strings" },
  { slug: "stack", title: "Stack", principle: "LIFO - Last In, First Out", path: "/algoviz/stack" },
  { slug: "queue", title: "Queue", principle: "FIFO - First In, First Out", path: "/algoviz/queue" },
  { slug: "linked-list", title: "Linked List", principle: "The Chain of Nodes", path: "/algoviz/linked-list" },
  { slug: "doubly-linked-list", title: "Doubly Linked List", principle: "The Two-Way Chain", path: "/algoviz/doubly-linked-list" },
  { slug: "trees", title: "Trees", principle: "The Hierarchical Structure", path: "/algoviz/trees" },
];

export default defineTool({
  name: "list_modules",
  title: "List learning modules",
  description: "List every CodeBuddy data-structure learning module with its slug, title, guiding principle, and in-app path.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(MODULES, null, 2) }],
    structuredContent: { modules: MODULES },
  }),
});
