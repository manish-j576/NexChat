"use client"
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TestButton(){
  console.log("this is inside the test button")
  // const session = useSession()
  // console.log(session)
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