
import { getServerSession } from "next-auth";
import Logout from "../components/LogoutButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TestButton from "../components/TestButton";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
export default async function Chats() {

  //TODO this sever is not getting the user id need to fix that 
  // for now we will user useSession hoook wherever we need the user id
  const session =await getServerSession(authOptions)
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