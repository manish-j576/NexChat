// ws-server/bridge.ts
import express from "express";
import { userSockets } from "./server";
import { WebSocket } from "ws";

export function startBridgeServer() {
  const app = express();
  app.use(express.json());

  app.post("/notify", (req, res) => {
    const { userId, event } = req.body;

    const ws = userSockets.get(userId);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(event));
    }

    res.json({ ok: true });
  });

  app.listen(8081, () => {
    console.log("Bridge running on http://localhost:8081");
  });
}
