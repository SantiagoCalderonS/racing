"use client"

import { useEffect, useState } from "react";

import Header from "../header";

import Link from "next/link";


const Entrada = ({partida, contraseña}) => {
  //tomar los params para obtener partida y contraseña
  const [nombre, setNombre] = useState("")
console.log(partida, contraseña)
  /*
  se crea tu jugador para la partida especificada y retorna la info para tener acceso
  */
  const creacionDeUsuarios= async () => {
    try {
      const response = await fetch(`/api/jugadores?nombre=${nombre}&partida=${partida}&contraseña=${contraseña}`, {method: "POST"});

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
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
           <h1>Poner Nombre</h1>
            <input onChange={(event)=>{setNombre(event.target.value)}} type="text"/>
            </div>
           {/* partida !== "" && contraseña !== "" ?<Link href={`/racetrack/${partida}/${contraseña}`}><button style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>Empezarar carrera</button></Link>: ""*/}
           { nombre !== "" ?<button onClick={creacionDeUsuarios} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>Entrar</button>: ""}
         
          </div>
          </div>
    )
}
export default Entrada;