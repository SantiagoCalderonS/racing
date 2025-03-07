"use client"

import { useEffect, useState } from "react";

import Header from "../header";

import Link from "next/link";


const HomePage = () => {
  
  const [partida, setPartida] = useState("")
  const [contraseña, setContr] = useState("")
  const [nombre, setNombre] = useState("")

  /*
  unirse a partida
  crear partida
  la funcion de "crear" debe ser exclusiva de aqui
  */

  const creacionDePista = async () => {
    try {
      const response = await fetch(`/api/race?partida=${partida}&contraseña=${contraseña}&nombre=${nombre}`, {method: "POST"});

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      sessionStorage.setItem("datos", JSON.stringify(data.jugador))
      window.location.href = `/racetrack/${partida}/${contraseña}`;
    } catch (err) {
      console.log(err)
    }
  };

    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          {/*<Header/>*/}
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
           <div>
           <h1>crear</h1>
            <input onChange={(event)=>{setPartida(event.target.value)}} type="text"/>
            <input onChange={(event)=>{setContr(event.target.value)}} type="text"/>
            <input onChange={(event)=>{setNombre(event.target.value)}} type="text"/>
            </div>
           {/* partida !== "" && contraseña !== "" ?<Link href={`/racetrack/${partida}/${contraseña}`}><button style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>Empezarar carrera</button></Link>: ""*/}
           { partida !== "" && contraseña !== "" && nombre !== "" ?<button onClick={creacionDePista} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>crear</button>: ""}
         
          </div>
          </div>
    )
}
export default HomePage;