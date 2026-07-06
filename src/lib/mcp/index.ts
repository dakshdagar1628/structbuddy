import { defineMcp } from "@lovable.dev/mcp-js";
import listModulesTool from "./tools/list-modules";
import getModuleTool from "./tools/get-module";

export default defineMcp({
  name: "codebuddy-mcp",
  title: "CodeBuddy MCP",
  version: "0.1.0",
  instructions:
    "Tools for CodeBuddy, an interactive data-structures learning app. Use `list_modules` to see every available module and `get_module` to fetch details about a specific one.",
  tools: [listModulesTool, getModuleTool],
});
