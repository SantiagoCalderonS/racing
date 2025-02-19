import { NextResponse } from "next/server";

import { ServidorPusher } from "@/pusher";

import { randomRaceTrack } from "@/hooks/RaceCreator";

var pistas=[]

export async function GET (req, {params}){

    const {circuito} = await params

    
    const sendMessage = async () => {
        try {
            const bool = pistas.some((P) => P.servidor == circuito)
             console.log(bool)
            !bool? pistas.push({servidor: circuito, carriles: []}) : ""
            ServidorPusher.trigger(`home-${circuito}`, "app", {msg: pistas})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}


export async function PUT (req, {params}){

    const {circuito} = await params

    const searchParams = req.nextUrl.searchParams;
    
    const length = searchParams.get("length");

    const track = randomRaceTrack(length)
    
    const sendMessage = async () => {
        try {
            pistas.map((P)=> P.servidor == circuito ? P.carriles = track: "")
            ServidorPusher.trigger(`home-${circuito}`, "race", {track})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}

export async function POST (req, {params}){

    const {circuito} = await params

    const searchParams = req.nextUrl.searchParams;
    
    
    const sendMessage = async () => {
        try {
           // pistas.map((P)=> P.servidor == circuito ? P.carriles = track: "")
            ServidorPusher.trigger(`home-${circuito}`, "raceEND", {msg: "end"})
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