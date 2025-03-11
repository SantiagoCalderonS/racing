"use client"

import { useEffect, useState } from "react";
import { clientPusher } from "@/pusher";

const Visor = () => {
    const [participantes, setParticipantes] = useState([])
    
    clientPusher.bind("recorrido", (data)=>{ //mostrar el avance
        const nuevo = participantes.map(R =>{R.name === data.nombre? R.porcentaje = data.porcentaje : ""} )
        setParticipantes(nuevo)
    })

    clientPusher.bind("participantes", (data)=>{ //setear a los usuarios
        //const nuevo = [...participantes]
        console.log(Array.isArray(data.data))
       
    })

  /*
  unirse a partida
  crear partida
  la funcion de "crear" debe ser exclusiva de aqui
  */

    return(
      <div>
           <div>
            {participantes?.map((P, indez)=>{
                return(
                    <div key={indez}><h1>{P.name}</h1><h1>{P.porcentaje}</h1></div>
                )
            })}
            </div>
          </div>
          
    )
}
export default Visor;