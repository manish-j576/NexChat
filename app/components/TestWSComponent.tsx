"use client";
import { useWebSocket } from "../hooks/useWebSocket";

export default function TestWSComponent() {
    const Websocket = useWebSocket()
    console.log("Websocket")
    console.log(Websocket)
  return <div>TestWSComponent</div>;
}