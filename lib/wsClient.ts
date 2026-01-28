// lib/wsClient.ts
import WebSocket from "ws";
import { createServiceToken } from "./serviceToken";

let ws: WebSocket | null = null;

export function getWsClient() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    return ws;
  }

  const token = createServiceToken();

  ws = new WebSocket(`ws://localhost:3001?token=${encodeURIComponent(token)}`);

  ws.on("open", () => {
    console.log("✅ API → WS authenticated");
  });

  ws.on("close", () => {
    ws = null;
  });

  ws.on("error", console.error);

  return ws;
}
