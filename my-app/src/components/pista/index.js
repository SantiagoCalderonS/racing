"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

import Player from "@/utils/pica.png"

import { randomRaceTrack } from "./components/RaceCreator";


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

const RaceTrack = () => {
    
 /* const pista = [
    {slot : 0, side: "right"},
    {slot : 1, side: "right"}, 
    {slot : 2, side: "left"}, 
    {slot : 3, side: "left"}, 
    {slot : 4, side: "left"}, 
    {slot : 5, side: "right"},
    {slot : 6, side: "left"},
]*/

const [pista, setPista] = useState([])

const [site, setSite] = useState({start: 0, end: 0 }) //esta en undefined por lo que no se renderiza
const [position, setPosition] = useState(0)

useEffect(()=>{
  const track = randomRaceTrack()
  console.log(track)
  setPista(track)
  setSite({start: track.length - 3, end: track.length})
  setPosition(track.length-1)
},[])

const handlerPosition = (event) => {
  
  if( position === 1){
    return setPosition(pista.length-1)
  } else if(event.key === 'ArrowLeft'){

    setSite({start: !site.start? site.start : site.start-1, end: site.end-1})
           setPosition(position-1) 
            position < pista.length-1 && pista[position-1].side === "left" ? setPosition(position-1) : ""
            return
        }else{
          setSite({start: !site.start? site.start : site.start-1, end: site.end-1})
            setPosition(position-1)
             position < pista.length-1 && pista[position-1].side === "right" ? setPosition(position-1) : ""
            return
        }
    
}


const Jugador = (<Image alt="pikachu" width= {200}  height= {200} src={Player}></Image>)


return(
    <div style={{ maxHeight: "820px", overflow: "hidden", width: "30%" }} tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
        {pista?.slice(site.start, site.end).map((P)=>
        ( P.side === "left" ?
          (
              <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "90%", height:"200px",}}>
                    <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                        {position === P.slot? (Jugador): ""}
                    </div>
                    <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", backgroundColor: "rgb(255, 95, 95, 0.5)"}}></div>
                </div>
        )
        : ( <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "90%", height:"200px",}}>

                    <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px",backgroundColor: "rgb(255, 95, 95, 0.5)"}}></div>

                    <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                      {position === P.slot? (Jugador): ""}
            </div>
        </div>))
        )}
</div>
)
}

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
                      <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
                          {position === P.slot? (Jugador): ""}
                      </div>
                      <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px", backgroundColor: "rgb(255, 95, 95, 0.5)"}}></div>
                  </div>
          )
          : ( <div key={P.slot} style={{display: "flex", marginBottom: "5px", marginTop: "5px", width: "90%", height:"200px",}}>

                      <div className="left" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(170, 0, 0 )", margin: "2px",backgroundColor: "rgb(255, 95, 95, 0.5)"}}></div>

                      <div className="right" style={{width: "50%", borderRadius: "5px", border: "solid 2px rgb(0, 170, 41)", margin: "2px", backgroundColor: "rgb(95, 255, 134, 0.5)"}}>
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
export default RaceTrack;