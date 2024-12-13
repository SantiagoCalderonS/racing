"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import Player from "@/utils/slime.gif"
import knocked from "@/utils/knocked.gif"
import Lava from "@/utils/lava.gif"
import grass from "@/utils/grass.gif"
import deadTree from "@/utils/deadTree.gif"
import rock from "@/utils/rock.gif"

import uno from "@/utils/uno.png"
import dos from "@/utils/dos.png"
import tres from "@/utils/tres.png"
import cuatro from "@/utils/cuatro.png"
import cinco from "@/utils/cinco.png"
import seis from "@/utils/seis.png"
import siete from "@/utils/siete.png"
import ocho from "@/utils/ocho.png"
import nueve from "@/utils/nueve.png"
import cero from "@/utils/cero.png"

import Numeros from "@/hooks/numeros";


const Field = ({dimensiones, pista, position, site, crash}) => {

    const Jugador = (<Image alt="slime" width= {dimensiones.width*0.30*0.4}  height= {dimensiones.height*0.95*0.3} src={!crash? Player : knocked}></Image>)

     //const Jugador = (<Image style={crash?{position: "absolute", bottom: "9%"}:{position: "absolute", bottom: "14%"}} alt="slime" width= {dimensiones.width*0.30*0.4}  height= {dimensiones.height*0.95*0.3} src={!crash? Player : knocked}></Image>)  
    //const Jugador = (<Image style={crash?{position: "absolute", bottom: "9%"}:{position: "absolute", bottom: "14%"}} alt="slime" width= {dimensiones.width*0.30*0.5}  height= {dimensiones.height*0.95*0.4} src={!crash? Player : knocked}></Image>)  
    

    //poner dimensiones estandar y cambiar el tamaño de la pantalla dependiendo de la ventana, que sea estatico en lugar de cambiar con la pantalla


    return(
        <div style={{ maxHeight:  `${dimensiones.height*0.95}px`, overflow: "hidden", width: `${dimensiones.width*0.30}px`, 
        minWidth: "500px", backgroundColor: "grey", margin: "auto" }} >
        {pista?.slice(site.start, site.end).map((P)=>
        ( P.side === "left" ?
          (
              <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "100%", minHeight:"200px", height: `${dimensiones.height*0.95*0.33}px`,}}>
                    <div className="left" style={{width: "50%", margin: "2px", display:"flex", justifyContent: "center", backgroundImage: `url(${grass.src})`,backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover",}}>{/* backgroundColor: "rgb(95, 255, 134, 0.5)", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)"*/}
                        {position === P.slot? (Jugador): ""}
                    </div>
                    <div className="right" style={{width: "50%", margin: "2px", display:"flex", justifyContent: "center", backgroundImage: `url(${rock.src})` ,backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", }}><Numeros count={P.slot+1}/></div>{/* borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", backgroundColor: "rgb(255, 95, 95, 0.5)"*/}
                </div>
        )
        : ( <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "100%", minHeight:"200px", height: `${dimensiones.height*0.95*0.33}px`,}}>

                    <div className="left" style={{width: "50%",margin: "2px", display:"flex", justifyContent: "center",backgroundImage: `url(${rock.src})`,backgroundRepeat: "no-repeat",  backgroundPosition: "center", backgroundSize: "cover",}}><Numeros count={P.slot+1}/></div>

                    <div className="right" style={{width: "50%", margin: "2px", display:"flex", justifyContent: "center", backgroundImage: `url(${grass.src})`,backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover",}}>
                      {position === P.slot? (Jugador): ""}
            </div>
        </div>))
        )}
</div>
    )
}
export default Field;