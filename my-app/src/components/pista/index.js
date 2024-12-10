"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

const RaceTrack = () => {
    
    const [site, setSite] = useState({start: 0, end: 3})
    const [position, setPosition] = useState(0)

    /*document.addEventListener('keyup', function(event) {
        /*if (event.key === 'Enter') {
          console.log('Se ha presionado la tecla Enter');
          // Aquí puedes agregar tu lógica para cuando se presiona Enter
        }
      });/
      switch(event.key) {
        case 'ArrowLeft':
          handlerPosition();
          break; 
        case 'ArrowRight':
          handlerPosition()
          break;      
      }
    
    })*/


/*
    document.addEventListener('mousedown', function(event) {
        switch(event.button) {
          case 0:
            console.log('Click izquierdo');
            break;
          case 2:
            console.log('Click derecho');
            break;
        }
      })
*/

/*
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowUp':
      console.log('Tecla Arriba presionada');
      break;
    case 'ArrowDown':
      console.log('Tecla Abajo presionada');
      break;  
    case 'ArrowLeft':
      console.log('Tecla Izquierda presionada');
      break; 
    case 'ArrowRight':
      console.log('Tecla Derecha presionada');
      break;      
  }
}); */

/*
document.addEventListener('mousedown', function(event) {
  switch(event.button) {
    case 0:
      console.log('Click izquierdo');
      break;
    case 2:
      console.log('Click derecho');
      break;
  }
}); */

/*
document.addEventListener('mousedown', function(event) {
  switch(event.button) {
    case 0:
      console.log('Click izquierdo');
      break;
    case 2:
      console.log('Click derecho');
      // Aquí puedes agregar lógica específica para el click derecho
      break;
    default:
      console.log(`Botón ${event.button} presionado`);
  }
});
 */

    /*const pista = [
        {slot : 0,
            left: {
                 backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
           }},
        {slot : 1,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
        }},
       {slot : 2,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
        }},
       {slot : 3,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
        }},
       {slot : 4,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
        }},
       {slot : 5,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
       }},
       {slot : 6,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
       }},{slot : 7,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
       }},
       {slot : 8,
            left: {
                backgroundColor: "red"
            },
            rigth: {
                backgroundColor: "green"
       }},
    ]*/
    
       const pista = [
        {slot : 0, side: "right"},
        {slot : 1, side: "left"}, 
        {slot : 2, side: "right"}, 
        {slot : 3, side: "left"}, 
        {slot : 4, side: "right"},
        {slot : 5, side: "left"}, 
        {slot : 6, side: "right"},
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

    return(
        <div style={{ maxHeight: "500px", overflow: "hidden", width: "30%" }} tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
            {pista.map((P)=>
            ( P.side === "left" ?
                (
                    <div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "90%", height:"200px",}}>
                        <div className="left" style={{width: "50%", height:"100%", backgroundColor: "green"}}>
                            {position === P.slot? (<div>X</div>): ""}
                        </div>
                        <div className="right" style={{width: "50%", height:"100%", backgroundColor: "red"}}></div>
                    </div>
            )
            : ( <div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "90%", height:"200px",}}>
                <div className="left" style={{width: "50%", height:"100%", backgroundColor: "red"}}></div>
                <div className="right" style={{width: "50%", height:"100%", backgroundColor: "green"}}>
                    {position === P.slot? (<div>X</div>): ""}
                </div>
            </div>))
            )}
    </div>
    )
    return(
        <div tabIndex={0} className="pista" onKeyDown={(event) => handlerPosition(event)}>
            {pista.map((P)=>
            (<div key={P.slot} style={{display: "flex", margin: "5px", border: "1px solid", width: "400px", height:"200px",}}>
                <div className="left" style={{width: "50%", height:"100%", backgroundColor: P.left.backgroundColor}}>{position === P.slot? (<div>X</div>): ""}</div>
                
                <div className="right" style={{width: "50%", height:"100%", backgroundColor: P.rigth.backgroundColor}}></div>
            </div>)
            )}
    </div>
    )
}
export default RaceTrack;