import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const DETAILS: Record<string, { title: string; principle: string; summary: string; path: string }> = {
  arrays: {
    title: "Arrays",
    principle: "The Contiguous Block",
    summary: "Fixed-order collection stored contiguously; O(1) index access, O(n) insert/delete in the middle.",
    path: "/algoviz/arrays",
  },
  strings: {
    title: "Strings",
    principle: "The Immutable Chain",
    summary: "Immutable ordered sequence of characters. Common ops: reverse, palindrome check, slicing.",
    path: "/algoviz/strings",
  },
  stack: {
    title: "Stack",
    principle: "LIFO - Last In, First Out",
    summary: "Push/pop from the top. Powers undo, browser back button, function call stacks.",
    path: "/algoviz/stack",
  },
  queue: {
    title: "Queue",
    principle: "FIFO - First In, First Out",
    summary: "Enqueue at the back, dequeue from the front. Powers print queues, task scheduling.",
    path: "/algoviz/queue",
  },
  "linked-list": {
    title: "Linked List",
    principle: "The Chain of Nodes",
    summary: "Nodes linked by pointers. O(1) insert/delete at head, O(n) traversal.",
    path: "/algoviz/linked-list",
  },
  "doubly-linked-list": {
    title: "Doubly Linked List",
    principle: "The Two-Way Chain",
    summary: "Each node points to both neighbors, enabling bidirectional traversal.",
    path: "/algoviz/doubly-linked-list",
  },
  trees: {
    title: "Trees",
    principle: "The Hierarchical Structure",
    summary: "Hierarchical nodes with parent-child links. BSTs give O(log n) search/insert on average.",
    path: "/algoviz/trees",
  },
};

export default defineTool({
  name: "get_module",
  title: "Get module details",
  description: "Fetch the title, guiding principle, plain-language summary, and in-app path for a CodeBuddy module.",
  inputSchema: {
    slug: z
      .enum([
        "arrays",
        "strings",
        "stack",
        "queue",
        "linked-list",
        "doubly-linked-list",
        "trees",
      ])
      .describe("Module slug, e.g. 'arrays' or 'linked-list'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const module = DETAILS[slug];
    if (!module) {
      return { content: [{ type: "text", text: `Unknown module: ${slug}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(module, null, 2) }],
      structuredContent: module,
    };
  },
});
