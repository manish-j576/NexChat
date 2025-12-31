"use client"
import axios from "axios";

export default function TestButton(){

    async function handleReq() {
        const response = await axios.get("/api/friends")
        console.log(response)
    }

    return (
      <button onClick={handleReq} className="bg-red-400 p-4 border-3">
        Send request
      </button>
    );
}