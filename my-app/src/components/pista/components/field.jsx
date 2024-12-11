"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import Player from "@/utils/slime.gif"
import Lava from "@/utils/lava.gif"

const Field = ({dimensiones, pista, position, site}) => {
    
    const Jugador = (<Image alt="pikachu" width= {dimensiones.width*0.30*0.4}  height= {dimensiones.height*0.95*0.3} src={Player}></Image>)

    return(
        <>
        {pista?.slice(site.start, site.end).map((P)=>
        ( P.side === "left" ?
          (
              <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "100%", minHeight:"200px", height: `${dimensiones.height*0.95*0.33}px`,}}>
                    <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                        {position === P.slot? (Jugador): P.slot}
                    </div>
                    <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", display:"flex", justifyContent: "center", background: `url(${Lava.src})` , backgroundColor: "rgb(255, 95, 95, 0.5)"}}>{P.slot}</div>
                </div>
        )
        : ( <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "100%", minHeight:"200px", height: `${dimensiones.height*0.95*0.33}px`,}}>

                    <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", display:"flex", justifyContent: "center",background: `url(${Lava.src})`, backgroundColor: "rgb(255, 95, 95, 0.5)"}}>{P.slot}</div>

                    <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                      {position === P.slot? (Jugador): P.slot}
            </div>
        </div>))
        )}
</>
    )
}
export default Field;