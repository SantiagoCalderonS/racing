import { NextResponse } from "next/server";

import { ServidorPusher } from "@/pusher";

var pistas=[]

export async function GET (req, {params}){

    const {circuito} = await params

    
    const sendMessage = async () => {
        try {
            pistas.push({servidor: circuito, carriles: []})
            ServidorPusher.trigger(`home-${circuito}`, "app", {msg: pistas})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}



//un servidor o algo que guarde temporalmente las partidas con las claves especificas y el array de la pista, al terminar la carrera que se borre
/*
servidor string
cariller []
active booleano


*/