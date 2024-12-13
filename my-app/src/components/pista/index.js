"use client"

import { useRef, useEffect, useState } from "react";

import Image from "next/image";

import Player from "@/utils/slime.gif"

import { randomRaceTrack } from "../../hooks/RaceCreator";

import useScreenSize from "@/hooks/windowSize"

import Field from "./components/field";

import Numeros from "@/hooks/numeros";

import corazon from "@/utils/corazon.png"
import roto from "@/utils/roto.png"

const Track = () => {//pasar id del server, numero de casillas
  
  //redux

  /*{func, ready} useEffect(() => {
    func(true);
  }, [func]); */
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

const [health, setHealth] = useState(0)

const [heat, setHeah] = useState(3)


const init = ()=>{
 setHeah(283)
  setHealth(3)
  const track = randomRaceTrack(length)
  setPosition(track.length-1)
  setPista(track)
  setSite({start: track.length - 3, end: track.length}) 
  console.log("init")
}

useEffect(()=>{ 
 crash ? setTimeout(()=>{setCrash(false)},1000) : ""
},[crash])

useEffect(()=>{ 
  if(health===0 && Active){
    console.log("muerto")
    setPosition(pista.length-1)
    setSite({start: pista.length - 3, end: pista.length});
    setHealth(3)
  }
 },
 [health])

const handlerPosition = (event) => {
  console.log(event.key, position)//poner un modal que pida hundir los botones para asegurar que la persona se podra mover   
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

              let heart = health
              setHealth(heart-1)
              setCrash(true)
              /*setPosition(pista.length-1)
              setSite({start: pista.length - 3, end: pista.length})*/
              //aqui choca
           }
            return
        } else if(event.key === 'ArrowRight'){
          if(position > 0 && pista[position-1].side === "right"){
            !site.start? "" : setSite({start:site.start-1, end: site.end-1})//si ya esta al final no seguir avanzando
            setPosition(position-1)
          }else{
            let heart = health
              setHealth(heart-1)
            setCrash(true)
            /*setPosition(pista.length-1)
            setSite({start: pista.length - 3, end: pista.length})*/
            //aqui choca
         }
          return
            
        }
    
        //deadTree quitara vida, la roca te aturde, la vida al llegar a 0 te manda al inicio 

}

const dimensiones= useScreenSize()

useEffect(()=>{
  
  Active? init(): ""
},[Active])

const handlerStart = (event) => {
  console.log("activate")
  setTimeout(() =>{
    length? setAct(true): ""
  }, 1000)

}
  

const handlerLength = (event) => {
  setLength(event.target.value)
  }

  /*useEffect(() => { //esto se queda desactualizado con relacion a los estados locales
    const handleKeyDown = (event) => {
      if (!crash) {
        console.log(heat)//en otra funcion este estado se setea, pero el cambio no es visible aquí
        //handlerPosition(event);
      }
    };
  
     document.addEventListener('keydown', handleKeyDown)
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);*/

  //PONER UN POP-UP PARA QUE SE MANTENGA INICIADO
  
  const containerRef = useRef(null);

  useEffect(() => {
    const handleBlur = () => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    };
  
    document.addEventListener('blur', handleBlur, true);
    return () => document.removeEventListener('blur', handleBlur, true);
  }, []);

  const focusElement = () => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  useEffect(() => {
    focusElement()
  },[])

  /*
  const [showPopup, setShowPopup] = useState(true);

return (
  <div>
    {showPopup && (
      <div>
        <h2>Presione Enter para comenzar</h2>
        <button onClick={() => setShowPopup(false)}>Comenzar</button>
      </div>
    )}
    {!showPopup && (
      <div>
        {/* Tu contenido principal /}
        </div>
      )}
    </div>
  );
  5. Automatizar el inicio
  Para automatizar el inicio sin necesidad de interacción manual, puedes usar un timeout:
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
      if (componentRef.current) {
        componentRef.current.focus();
      }
    }, 3000); // Espera 3 segundos antes de comenzar automáticamente
  
    return () => clearTimeout(timer);
  }, []);
  */
  
  //poner un pop-up que pida interaccion o encontrar la forma de hacer que sea automatico 

  //ARREGLAR ESTILOS Y LOGICA DE MOVIMIENTO "HandlerPosition"
return(
  <div style={{ display: "flex", justifyContent: "center", minHeight:  `${dimensiones.height}px`, overflow: "hidden",
    minWidth: `100%`, backgroundColor: "white" }} ref={containerRef} tabIndex={0} 
   onKeyDown={(event) => !crash ? setTimeout(() =>{handlerPosition(event)}, 100): ""}>
  
  { !Active ?(
    <div>
      <select value={length} onChange={(event)=>{handlerLength(event)}}>
      <option value={20}>Paseo</option>
      <option value={50}>persecusion</option>
      <option value={70}>maratón</option>
    </select>
  <button onClick={handlerStart} style={{ width: "200px", height: "100px", backgroundColor: "white", border : "solid 2px black", borderRadius:"5px"}}>comenzar</button>
  </div>
  ): (
    <div 
    
    className="pista"
    
   >
      <div style={{ position: "absolute",display: "flex"}}><Image alt={"corazon"} src={!crash?corazon.src : roto.src} width={50} height={50}/><Numeros count={health}/></div>
  <Field crash={crash} dimensiones={dimensiones} pista={pista} position={position} site={site}/>
  </div>
)}
  </div>
  
  
)
}

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