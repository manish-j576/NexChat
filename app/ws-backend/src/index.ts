import "dotenv/config";
import WebSocket, { WebSocketServer } from "ws";
import { jwtVerify } from "jose";
import { jwtDecrypt } from "jose";
import http from "http";
const PORT = 3001;

/**
 * userId -> multiple sockets (tabs/devices)
 */
const users = new Map<string, Set<WebSocket>>();

const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws, req) => {
  try {
    // ---- 1. Extract JWT from query params ----
    const url = new URL(req.url ?? "", "http://localhost");
    const token = url.searchParams.get("token");
    console.log("token form the ws backend  in the get request")
    console.log(token)
    if (!token) {
      ws.close(1008, "Missing auth token");
      return;
    }

    const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  console.error("❌ NEXTAUTH_SECRET is missing in WS backend");
  ws.close(1011, "Server misconfigured");
  return;
}
const key = Buffer.from(secret, "base64");
    // ---- 2. Verify JWT (NextAuth secret) ----
    const { payload } = await jwtVerify(
      token,
      key
    );

    const userId = payload.id as string;

    if (!userId) {
      ws.close(1008, "Invalid token");
      return;
    }

    // ---- 3. Store socket ----
    if (!users.has(userId)) {
      users.set(userId, new Set());
    }

    users.get(userId)!.add(ws);

    console.log(`✅ WS connected: ${userId}`);

    // ---- 4. Listen for messages (optional) ----
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("📩 Message:", message);
      } catch {
        console.log("⚠️ Invalid WS message");
      }
    });

    // ---- 5. Cleanup on close ----
    ws.on("close", () => {
      users.get(userId)?.delete(ws);

      if (users.get(userId)?.size === 0) {
        users.delete(userId);
      }

      console.log(`❌ WS disconnected: ${userId}`);
    });

    ws.on("error", () => {
      ws.close();
    });
  } catch (error) {
    console.error("WS auth error:", error);
    ws.close(1011, "Authentication failed");
  }
});

// ---- 6. Helper to emit events to a user ----
export function emitToUser(userId: string, payload: unknown) {
  const sockets = users.get(userId);
  if (!sockets) return;

  for (const socket of sockets) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }
}

// ---- 7. Start server ----
server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on ws://localhost:${PORT}`);
});
