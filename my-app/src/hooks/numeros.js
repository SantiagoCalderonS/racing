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

import Image from "next/image"

function Numeros (count){

    var digitos = count.count.toString().split("")

    return(
        <div style={{display: "flex", maxHeight: "50px", maxWidth: "50px"}}>
        {digitos?.map((D, index)=>{
            switch (D){
                case "0": return (<Image key={index} alt="numero" width= {50}  height= {50} src={cero}></Image>)
                 ;
                case "1": return (<Image key={index} alt="numero" width= {50}  height= {50} src={uno}></Image>)
                ;
                 case "2": return (<Image key={index} alt="numero" width= {50}  height= {50} src={dos}></Image>)
                ;
                 case "3": return (<Image key={index} alt="numero" width= {50}  height= {50} src={tres}></Image>)
                ;
                 case "4": return (<Image key={index} alt="numero" width= {50}  height= {50} src={cuatro}></Image>)
                ;
                 case "5": return (<Image key={index} alt="numero" width= {50}  height= {50} src={cinco}></Image>)
                ;
                 case "6": return (<Image key={index} alt="numero" width= {50}  height= {50} src={seis}></Image>)
                ;
                 case "7": return (<Image key={index} alt="numero" width= {50}  height= {50} src={siete}></Image>)
                ;
                 case "8": return (<Image key={index} alt="numero" width= {50}  height= {50} src={ocho}></Image>)
                ;
                 case "9": return (<Image key={index} alt="numero" width= {50}  height= {50} src={nueve}></Image>)
                ;
                 default:
            }
            //returnreturn (<Image key={index} alt="numero" width= {50}  height= {50} src={}></Image>)    
        })}
        </div>
    )
    
}

export default Numeros