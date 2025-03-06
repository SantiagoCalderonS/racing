"use client"

import { use, useEffect, useState } from "react";

import Image from "next/image";

import Track from "../pista";
import Header from "../header";
import { useSearchParams } from "next/navigation";

import { clientPusher } from "@/pusher";

const RaceTrack = ({partida, contraseña}) => {

  useEffect(()=> {
    
    //fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "POST"}).then((response)=> {return response.json()}).then((res)=> {console.log(res)}).catch(()=> {console.log("error")})
    /*async function name(params) {
    try {
      const response = await fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "POST"});

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  };
    
  name()*/

//ES NECESARIO TENER UN ID (QUE COINCIDA CON ALGUNO QUE TENGA RELACIONADO EL SERVER), SI NO SE TIENE SE DEBE CREAR

    clientPusher.subscribe(`Servidor-${partida}`)//EVENTO DE CONEXION AL SERVER
    clientPusher.bind("app", (data)=>{console.log(data)} )


    return (()=> {//EVENTO DE DESUSCRIPCION DE PARTIDA
      clientPusher.unsubscribe(`Servidor-${partida}`)
      fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "DELETE"})
    })
  },[])
    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          {/*<Header/>*/}
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
          <button onClick={()=>{fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "DELETE"})}}>dddddd</button>
          <Track partida={partida} contraseña={contraseña}/>
          </div>
          </div>
    )
}
export default RaceTrack;