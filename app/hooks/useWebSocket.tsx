"use client";

import axios from "axios";
import { useEffect } from "react";

export function useWebSocket() {
  useEffect(() => {
    let ws: WebSocket;

    async function connect() {
      console.log("connecting to ws")
      
      const res = await axios.get("/api/ws-token");
      console.log(res)
      if (!res.data) return;

      const token = await res.data;
      console.log(token.token)
      ws = new WebSocket(
        `ws://localhost:3001?token=${encodeURIComponent(res.data.token)}`
      );
      console.log("ws")
      console.log(ws)
      ws.onopen = () => {
        console.log("✅ WS connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "FRIEND_REQUEST") {
          console.log("📩 Friend request:", data.payload);
          // update state / show notification
        }
      };

      ws.onclose = () => {
        console.log("❌ WS disconnected");
      };
    }

    connect();

    return () => ws?.close();
  }, []);
}
