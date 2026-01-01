"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useRef, useState, useSyncExternalStore } from "react";
import { set } from "zod";
import SearchedUser from "./SearchedUser";

export default function SearchBar(){
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  type SearchedResponse = {
    message: string;
    status: number;
    body: any;
  };

  async function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }
  async function handleSearch() {
    try{

      console.log("searh button presseed")
      const response = await axios.get<SearchedResponse>(`/api/search?search=${search}`);
      console.log(response.data?.body);
      setUserDetails(response.data?.body);
      setSearch("");
      console.log(search);
    }catch(error : any){
      alert(error.response.data)
    }
  }
    return (
      <div>
        <div className="flex gap-2">
          {/* <Input onChange={} name="Search" type="text" placeholder="Search Friends" required /> */}
          <Input onChange={handleChange} name="Search" type="text" placeholder="Search Friends" required value={search}/>
        <Button onClick={handleSearch}>Search</Button>
        </div>
          <SearchedUser></SearchedUser>
      </div>
    );

}