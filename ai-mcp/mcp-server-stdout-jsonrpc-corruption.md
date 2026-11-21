# Why `console.log()` Corrupts `stdio` MCP Servers

> Date: 2026-11-17

Model Context Protocol (MCP) servers running over `StdioServerTransport` exchange newline-delimited JSON-RPC 2.0 frames over `process.stdout`. Calling `console.log("Loaded config")` anywhere in your server (or a noisy dependency) writes non-JSON text directly onto `stdout`, immediately crashing the host client's JSON-RPC parser.

```ts
// src/mcp.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Redirect accidental console.log calls to stderr before importing noisy modules
console.log = (...args: unknown[]) => {
  process.stderr.write(`${args.map(String).join(" ")}\n`);
};

const server = new McpServer({ name: "my-mcp", version: "1.0.0" });
await server.connect(new StdioServerTransport());
```

### Takeaway

Treat `stdout` strictly as a binary wire protocol in CLI/MCP servers; send all logs, progress spinners, and warnings to `console.error()` / `process.stderr`.
