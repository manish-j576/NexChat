"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { SearchedUsers } from "./SearchedUsers";
import { SessionProvider} from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";

export default function SearchBar(){
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);

  type user = {
    id : string
    username: string;
    avatarUrl: string;
  };
  type SearchedResponse = {
    message: string;
    status: number;
    data : user[];
  };

  async function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }
  async function handleSearch() {
    try{
      setLoading(true)
      console.log("searh button presseed")
      const response = await axios.get<SearchedResponse>(`/api/friends/get-friend/?username=${search}`);
      console.log(response.data?.data);
      setUserDetails(response.data?.data);
      setSearch("");
      console.log(search);
      setLoading(false)
    }catch(error : any){
      alert(error.response.data)
    }
  }
    return (
      <div>
        <div className="flex gap-2 mb-4">
          <Input
            onChange={handleChange}
            name="Search"
            type="text"
            placeholder="Search Friends"
            required
            value={search}
          />
          <Button onClick={handleSearch}>
            {loading ? <Spinner></Spinner> : "Search"} 
            </Button>
        </div>
        {userDetails.length === 0 && <div className="text-red-500" >No users found</div>}
        {
        userDetails.map((e: user) => (
          <SessionProvider >
            <SearchedUsers
              key={e.id}
              id={e.id}
              name={e.username}
              imageUrl={e.avatarUrl}
            ></SearchedUsers>
          </SessionProvider>
        ))}
      </div>
    );

}