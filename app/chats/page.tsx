
import { getServerSession } from "next-auth";
import Logout from "../components/LogoutButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TestButton from "../components/TestButton";
export default async function Chats() {
  const session =await getServerSession()
  console.log("session have the following")
  console.log(session)
  
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black w-full flex-col h-full">
      <div className="bg-blue-400">
      <SidebarTrigger className="size-10"/>
      </div>
      <div className="h-full bg-red-200">
        <TestButton></TestButton>
        <Logout></Logout>
        <div className="w-full bg-amber-400 h-15">Chat header</div>
        <div className="w-full bg-blue-400 h-[80%]">Main chats section</div>
        <div className="w-full bg-amber-800 h-15">sned input box and send icon</div>
      </div>
    </div>
  );
}