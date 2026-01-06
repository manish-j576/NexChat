"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Session } from "inspector/promises";
import { useSession } from "next-auth/react";
import axios from "axios";

type UserCardProps = {
    id : string
  name: string;
  imageUrl: string;
};

export  function SearchedUsers(props: UserCardProps) {
  const {data : Session} = useSession()
  console.log(Session)
  async function handleSend() {
    console.log("send button pressed");
    console.log(props);
    console.log(Session)
    const response = await axios.post(`/api/friends/send-request`, {
      userId : Session?.user?.id,
      friendId : props.id
    });
    console.log(response);
  }
  return (
    <Card className="w-full max-w-md p-0 mb-2">
      <CardContent className="flex items-center justify-between p-1 ">
        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-1">
          <Avatar className="h-9 w-9">
            <AvatarImage src={props.imageUrl} />
          </Avatar>
          <span className="text-md font-medium pl-2">{props.name}</span>
        </div>

        {/* Right: Send Button */}
        <Button size="sm" onClick={handleSend}>
          Send
        </Button>
      </CardContent>
    </Card>
  );
}
