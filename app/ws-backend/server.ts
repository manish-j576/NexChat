// ws-server/server.ts
import { WebSocketServer, WebSocket } from "ws";

export const userSockets = new Map<string, WebSocket>();

export function startWSServer() {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url!, "http://localhost");
    const userId = url.searchParams.get("userId");

    if (!userId) {
      ws.close();
      return;
    }

    userSockets.set(userId, ws);
    ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });})
    ws.on("close", () => {
      userSockets.delete(userId);
    });
  });

  console.log("WS running on ws://localhost:8080");
}
