"use client";
import { useWebSocket } from "../hooks/useWebSocket";
export default function TestWSComponent() {
  
  const { sendMessage } = useWebSocket()
function handleClick() {
  sendMessage({
    type: "CHAT_MESSAGE",
    message : "hello there from the react component"
  });
}

  return <div className="bg-blue-50">

    <h1 className="text-red-800"> Test componend</h1>

  <button className="bg-blue-400" onClick={handleClick}> send message </button>

  </div>;
}