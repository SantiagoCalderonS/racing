"use client"

import { use, useEffect, useState } from "react";

import Image from "next/image";

import Track from "../pista";
import Header from "../header";

import { clientPusher } from "@/pusher";

const RaceTrack = ({id}) => {

  

  useEffect(()=> {
    fetch(`/api/race/${id}`).then((response)=> {return response.json()}).then((res)=> {console.log(res)})
    
    clientPusher.subscribe(`home-${id}`)

    clientPusher.bind("app", (data)=>{console.log(data)} )

    return (()=> {
      clientPusher.unsubscribe(`home-${id}`)
    })
  },[])
  
/*const [ready, isReady]= useState(false)

const func = (value) => {//redux
  isReady(value)
}

useEffect(() => {
ready? console.log("ready"):""
},[ready])*/

    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          <Header/>
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
          <Track/>
          </div>
          </div>
    )
}
export default RaceTrack;