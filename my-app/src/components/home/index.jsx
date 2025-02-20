"use client"

import { useEffect, useState } from "react";

import Header from "../header";

import Link from "next/link";


const HomePage = () => {
  
  const [partida, setPartida] = useState("")

  /*
  unirse a partida
  crear partida
  */
    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          {/*<Header/>*/}
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
           <div>
           <h1>crear</h1>
            <input onChange={(event)=>{setPartida(event.target.value)}} type="text"/>
            </div>
           { partida !== ""?<Link href={`/racetrack/${partida}`}><button style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>Empezarar carrera</button></Link>: ""}
         
          </div>
          </div>
    )
}
export default HomePage;