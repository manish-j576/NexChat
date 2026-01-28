import dotenv from "dotenv"
import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import http from "http";
const PORT = 3001;

dotenv.config()

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
console.log(secret)
    // ---- 2. Verify JWT (NextAuth secret) ----
    const data = await jwt.verify(token, secret);

    // const userId = data.id as string;
    console.log("controlled reached here jwt is verified")
    console.log(data)
    // if (!userId) {
    //   ws.close(1008, "Invalid token");
    //   return;
    // }

    // ---- 3. Store socket ----
    // if (!users.h   `✅ WS connected: ${userId}`);

    // ---- 4. Listen for messages (optional) ----
    ws.on("message", (data) => {

      console.log("what is the message")
      console.log(data.toString())
      try {
        const message = JSON.parse(data.toString());
        console.log("📩 Message:", message);
      } catch {
        console.log("⚠️ Invalid WS message");
      }
    });

    // ---- 5. Cleanup on close ----
    
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
    