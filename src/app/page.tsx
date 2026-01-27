"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {

   const {data: session} = authClient.useSession() 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit =  () => {
    authClient.signUp.email({
      email,
      name,
      password
    },{
      onError: () =>{
        window.alert("Error creating user");
      },
      onSuccess: () =>{
        window.alert("User created successfully");
      }
    });
  }
  const login =  () => {
    authClient.signIn.email({
      email,
      password
    },{
      onError: () =>{
        window.alert("Error creating user");
      },
      onSuccess: () =>{
        window.alert("User login successfully");
      }
    });
  }

  if(session){
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>logged in as {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
  <div>
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create user</Button>
    </div>
    <div className="p-4 flex flex-col gap-y-4">
      
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={login}>login</Button>
    </div>
  </div>  
  );
}
