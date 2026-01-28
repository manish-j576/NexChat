"use client";

import axios from "axios";
import { useEffect, useRef } from "react";

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function connect() {
      try {
        console.log("Connecting to WS...");

        const res = await axios.get("/api/ws-token");
        if (!res.data?.token || !isMounted) return;

        const ws = new WebSocket(
          `ws://localhost:3001?token=${encodeURIComponent(res.data.token)}`,
        );

        ws.onopen = () => {
          console.log("✅ WS connected");
        };

        ws.onclose = () => {
          console.log("❌ WS disconnected");
        };

        ws.onerror = (err) => {
          console.error("WS error", err);
        };

        wsRef.current = ws;
      } catch (err) {
        console.error("WS connection failed", err);
      }
    }

    connect();

    return () => {
      isMounted = false;
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  // ✅ expose controlled API
  function sendMessage(data: unknown) {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WS not connected");
    }
  }

  return {
    socket: wsRef,
    sendMessage,
  };
}
