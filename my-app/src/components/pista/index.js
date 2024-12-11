"use client"

import { use, useEffect, useState } from "react";

import Image from "next/image";

import Player from "@/utils/slime.gif"

import { randomRaceTrack } from "./components/RaceCreator";

import useScreenSize from "@/hooks/windowSize"
/*const RaceTrack = () => {
    
  const [pista, setP ]= useState([
        {slot : 0, side: "right"},
        {slot : 1, side: "left"}, 
        {slot : 2, side: "right"}, 
        {slot : 3, side: "left"}, 
        {slot : 4, side: "right"},
        {slot : 5, side: "left"}, 
        {slot : 6, side: "right"},
    ])
    const [site, setSite] = useState({start: 0, end: 3})
    const [position, setPosition] = useState(pista.length-1)


    useEffect(()=>{
setPosition(position-1)
    },[pista])

    const handlerPosition = (event) => {
      let list = [...pista]

     if (pista.length === 1){
      const list = [
        {slot : 0, side: "right"},
        {slot : 1, side: "left"}, 
        {slot : 2, side: "right"}, 
        {slot : 3, side: "left"}, 
        {slot : 4, side: "right"},
        {slot : 5, side: "left"}, 
        {slot : 6, side: "right"},
      ]
      setP(list)
    
    setPosition(list.length-1)
    return

}
      if(event.key === 'ArrowLeft'){ //pop ultimo
        

        list.pop() 
        console.log(pista) 
                0 < pista.length && pista[position].side === "left" ? setP(list) : ""
                return
            }else{
              

        list.pop()
        console.log(pista) 
              0 < pista.length && pista[position].side === "right" ? setP(list) : ""
                return
            }
        
    }


    const Jugador = (<Image alt="pikachu" width= {200}  height= {200} src={Player}></Image>)
    

    return(
        <div style={{ maxHeight: "500px", width: "30%" }} tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
            {pista.map((P)=>
            ( P.side === "left" ?
                (
                    <div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "90%", height:"200px",}}>
                        <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: "green"}}>
                            {P.slot === position ?Jugador: ""}
                        </div>
                        <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: "red"}}></div>
                    </div>
            )
            : ( <div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "90%", height:"200px",}}>
                <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: "red"}}></div>
                <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: "green"}}>
                    {P.slot === position ?Jugador: ""}
                </div>
            </div>))
            )}
    </div>
    )
    return(
        <div tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
            {pista.map((P)=>
            (<div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "400px", height:"200px",}}>
                <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: P.left.backgroundColor}}>{position === P.slot? (<div>X</div>): ""}</div>
                
                <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: P.rigth.backgroundColor}}></div>
            </div>)
            )}
    </div>
    )
}*/

import Field from "./components/field";

const Track = () => {//pasar id del server, numero de casillas
  
  //estado de Active, que hace referencia a que la "carrera" esta activa
  //una funcion que active el estado y un boton

 /* const pista = [
    {slot : 0, side: "right"},
    {slot : 1, side: "right"}, 
    {slot : 2, side: "left"}, 
    {slot : 3, side: "left"}, 
    {slot : 4, side: "left"}, 
    {slot : 5, side: "right"},
    {slot : 6, side: "left"},
]*/

const [Active, setAct] = useState(false)

const [pista, setPista] = useState([])

const [site, setSite] = useState({start: 0, end: 0 }) //esta en undefined por lo que no se renderiza
const [position, setPosition] = useState(0)

const [length, setLength] = useState(0)

const [crash, setCrash]= useState(false)

const init = ()=>{
  const track = randomRaceTrack(length)
  setPista(track)
  setSite({start: track.length - 3, end: track.length})
  setPosition(track.length-1)
}

useEffect(()=>{
 crash ? setTimeout(()=>{setCrash(false)},700) : ""
},[crash])
const handlerPosition = (event) => {
  
  if( position === 0){
    setAct(false)
    setPista([])
     //setPosition(pista.length-1)
     //setSite({start: pista.length - 3, end: pista.length})
  } else if(event.key === 'ArrowLeft'){
            if(position > 0 && pista[position-1].side === "left"){
              !site.start? "" : setSite({start:site.start-1, end: site.end-1})//si ya esta al final no seguir avanzando
              setPosition(position-1)
            }else{
              setCrash(true)
              /*setPosition(pista.length-1)
              setSite({start: pista.length - 3, end: pista.length})*/
              //aqui choca
           }
            return
        }else{
          if(position > 0 && pista[position-1].side === "right"){
            !site.start? "" : setSite({start:site.start-1, end: site.end-1})//si ya esta al final no seguir avanzando
            setPosition(position-1)
          }else{
            setCrash(true)
            /*setPosition(pista.length-1)
            setSite({start: pista.length - 3, end: pista.length})*/
            //aqui choca
         }
          return
            
        }
    
}

const dimensiones= useScreenSize()

useEffect(()=>{
  init()
},[Active])

const handlerStart = (event) => {
  setTimeout(() =>{
    length? setAct(true): ""
  }, 3000)

}



const handlerLength = (event) => {
  console.log(event.target.value)
  setLength(event.target.value)
  }

return(
  <>
  
  { !Active ?(
    <div>
      <select value={length} onChange={(event)=>{handlerLength(event)}}>
      <option value={2}>trote</option>
      <option value={5}>persecusion</option>
      <option value={7}>maratón</option>
    </select>
  <button onClick={handlerStart} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>comenzar</button>
  </div>
  ): (
    <div style={{ minHeight:  `${dimensiones.height*0.95}px`, overflow: "hidden", width: `${dimensiones.width*0.30}px`, 
    minWidth: "500px", backgroundColor: "white" }} tabIndex={0} className="pista" 
    onKeyDown={(event) => !crash ? setTimeout(() =>{handlerPosition(event)}, 100): ""}>
  <Field dimensiones={dimensiones} pista={pista} position={position} site={site}/>
  </div>
)}
  </>
  
  
)
}
/*<div style={{ minHeight:  `${dimensiones.height*0.95}px`, overflow: "hidden", width: `${dimensiones.width*0.30}px`, minWidth: "500px", backgroundColor: "white" }} tabIndex={0} className="pista" onKeyDown={(event) => setTimeout(() =>{handlerPosition(event)}, 100)}>
        {pista?.slice(site.start, site.end).map((P)=>
        ( P.side === "left" ?
          (
              <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "100%", minHeight:"200px", height: `${dimensiones.height*0.95*0.33}px`,}}>
                    <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                        {position === P.slot? (Jugador): P.slot}
                    </div>
                    <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(255, 95, 95, 0.5)"}}>{P.slot}</div>
                </div>
        )
        : ( <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "100%", minHeight:"200px", height: `${dimensiones.height*0.95*0.33}px`,}}>

                    <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", display:"flex", justifyContent: "center",backgroundColor: "rgb(255, 95, 95, 0.5)"}}>{P.slot}</div>

                    <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                      {position === P.slot? (Jugador): P.slot}
            </div>
        </div>))
        )}
</div>*/
/*
 const [site, setSite] = useState({start: 0, end: 3})
    const [position, setPosition] = useState(0)
    
       const pista = [
        {slot : 0, side: "right"},
        {slot : 1, side: "right"}, 
        {slot : 2, side: "left"}, 
        {slot : 3, side: "left"}, 
        {slot : 4, side: "left"}, 
        {slot : 5, side: "right"},
        {slot : 6, side: "left"},
    ]



    useEffect(()=>{

    },[])

    const handlerPosition = (event) => {
      
      if( position === pista.length-1){
        return setPosition(0)
      } else if(event.key === 'ArrowLeft'){
                position < pista.length-1 && pista[position+1].side === "left" ? setPosition(position+1) : ""
                return
            }else{
                position < pista.length-1 && pista[position+1].side === "right" ? setPosition(position+1) : ""
                return
            }
        
    }


    const Jugador = (<Image alt="pikachu" width= {200}  height= {200} src={Player}></Image>)

    return(
      <div style={{ maxHeight: "820px", overflow: "hidden", width: "30%" }} tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
          {pista.map((P)=>
          ( P.side === "left" ?
            (
                <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "90%", height:"200px",}}>
                      <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                          {position === P.slot? (Jugador): ""}
                      </div>
                      <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(255, 95, 95, 0.5)"}}></div>
                  </div>
          )
          : ( <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "90%", height:"200px",}}>

                      <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", display:"flex", justifyContent: "center",backgroundColor: "rgb(255, 95, 95, 0.5)"}}></div>

                      <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", display:"flex", justifyContent: "center", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                        {position === P.slot? (Jugador): ""}
              </div>
          </div>))
          )}
  </div>
  )
 
*/

/*
 return(
        <div tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
            {pista.map((P)=>
            (<div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "400px", height:"200px",}}>
                <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: P.left.backgroundColor}}>{position === P.slot? (<div>X</div>): ""}</div>
                
                <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 3px rgb(240, 240, 240)", backgroundColor: P.rigth.backgroundColor}}></div>
            </div>)
            )}
    </div>
    )
    */
   
    /*
   */
export default Track;