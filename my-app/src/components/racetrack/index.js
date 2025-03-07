"use client"

import { use, useEffect, useState } from "react";

import Image from "next/image";

import Track from "../pista";
import Header from "../header";
import { useSearchParams } from "next/navigation";

import { clientPusher } from "@/pusher";

const RaceTrack = ({partida, contraseña}) => {

  useEffect(()=> {
    const revisarSession = () => {
      const admin = sessionStorage.getItem("datos")
      admin? "" :window.location.href = `/racetrack/${partida}/${contraseña}/entrada`
    }
    revisarSession()
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
console.log("entrar")
    //clientPusher.subscribe(`Servidor-${partida}`)//EVENTO DE CONEXION AL SERVER
    //clientPusher.bind("app", (data)=>{console.log(data)} )


    const salir_Y_O_CerrarServer = () => {//funcion para cerrar el perfil del
      // Tu código aquí
      //clientPusher.unsubscribe(`Servidor-${partida}`)
      async function name() {
        //
        const admin = JSON.parse(sessionStorage.getItem("datos"))
        console.log(admin.id)
        await fetch(`/api/race?partida=${partida}&contraseña=${contraseña}&admin=${admin.id}&server=${admin.serverId}`, {method: "DELETE"})
      }
      name()
      sessionStorage.removeItem("datos")
    };

    // Añadir el event listener
    window.addEventListener('beforeunload', salir_Y_O_CerrarServer);/*Esta solución utiliza el evento beforeunload que se dispara tanto en navegación normal como en recarga de página. El cleanup function es crucial para evitar memory leaks al remover el event listener cuando el componente se desmonta. */

    // Cleanup function que se ejecuta al desmontar
    return () => {
      window.removeEventListener('beforeunload', salir_Y_O_CerrarServer);
    };
    /*return ()=> {//EVENTO DE DESUSCRIPCION DE PARTIDA
      console.log("saliste")
      clientPusher.unsubscribe(`Servidor-${partida}`)
      async function name() {
        fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "DELETE"})
      }
      name()
    }*/
  },[])


    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          {/*<Header/>*/}
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
          {/*<button onClick={()=>{fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "DELETE"})}}>dddddd</button>*/}
          <Track partida={partida} contraseña={contraseña}/>
          </div>
          </div>
    )
}
export default RaceTrack;