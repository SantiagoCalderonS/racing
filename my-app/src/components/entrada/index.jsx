"use client"

import { useEffect, useState } from "react";

import Header from "../header";

import Link from "next/link";


const Entrada = ({partida, contraseña}) => {
  //tomar los params para obtener partida y contraseña
  const [nombre, setNombre] = useState("")
  const [error, setError]= useState({
    status: false,
    type: ""
  })

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
      sessionStorage.setItem("datos", JSON.stringify(data.jugador))
      console.log(data)
      window.location.href = `/racetrack/${partida}/${contraseña}`;
    } catch (err) {
      setError({status: true, type: "nombre"})
    }
  };


  useEffect(() => {
    const Exist= async () => {
      try {
        const response = await fetch(`/api/race?partida=${partida}&contraseña=${contraseña}`, {method: "GET"});
          if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        window.location.href = `/`;
        setError({status: true, type: "server"})
      }
    };
    Exist()
  },[])

    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          {/*<Header/>*/}
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
           {!error.status?
            (<div>
           <h1>Poner Nombre</h1>
            <input onChange={(event)=>{setNombre(event.target.value)}} type="text"/>
           
           { nombre !== "" ?<button onClick={creacionDeUsuarios} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>Entrar</button>: ""}
            </div>)
            :(<>
                {error.type === "server"? (
                  <div>
                    <h1>No existe la partida</h1>
                    <Link href={"/"}> <button onClick={creacionDeUsuarios} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>volver</button></Link>
                  </div>
                ):(
                  <div>
                    <h1>nombre ya existente</h1>
                        <h1>Poner Nombre</h1>
                          <input onChange={(event)=>{setNombre(event.target.value)}} type="text"/>
                        { nombre !== "" ?<button onClick={creacionDeUsuarios} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>Entrar</button>: ""}
                        </div>
                        )
                }
            
              </>
            )}
         
          </div>
          </div>
    )
}
export default Entrada;