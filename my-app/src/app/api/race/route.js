import { NextResponse } from "next/server";

import { ServidorPusher } from "@/pusher";

import { randomRaceTrack } from "@/hooks/RaceCreator";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

var pistas=[]


export async function GET (req, {params}){//CONECTARSE

    const {partida} = await params

    const searchParams = req.nextUrl.searchParams;

return NextResponse.json({msg: "router"},{status: 200} )
}



export async function POST (req, {params}){//CREAR UNA PARTIDA

    //recibe los dos parametros,y crea la instancia en el backend, devuelve los datos de "jugador", al ser el creador recibirá y guardará el id

    try {
        const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");

  console.log(partida, partida)

  const buscar = await prisma.servidor.findFirst({
   where:{name: partida}
  })

  if(!buscar){
    await prisma.servidor.create({
    data: {
      name: partida,
      contraseña: contraseña,
      pista: "",
    },
}
)
}else{
    throw new Error
}

return NextResponse.json({msg: "router"},{status: 200} )
    } catch (error) {
        return NextResponse.json({msg: "error"},{status: 404} )
    }
    
}


export async function PUT (req, {params}){ //INICIAR

    const searchParams = req.nextUrl.searchParams;
    
    const length = searchParams.get("length");
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");

    const track = randomRaceTrack(length)
    
    const sendMessage = async () => {
        try {
            pistas.map((P)=> P.servidor == partida ? P.carriles = track: "")
            ServidorPusher.trigger(`Servidor-${partida}`, "race", {track})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}

export async function DELETE (req, {params}){


    const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");

    const Borrado= await prisma.servidor.delete({
        where: {name:partida},
        include: {jugadores: true}
      })
     
      console.log(Borrado)
    
    const sendMessage = async () => {
        try {//QUE AL CERRAR EL SERVIDOR EL TRIGGER HAGA SALIR A TODOS LOS PARTICIPANTES CON UN REDIRECT, AL MISMO TIEMPO QUE SE BORRA TODO LO RELACIONADO AL SERVER
           // pistas.map((P)=> P.servidor == partida ? P.carriles = track: "")
            ServidorPusher.trigger(`Servidor-${partida}`, "raceEND", {msg: "end"})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}



//un servidor o algo que guarde temporalmente las partidas con las claves especificas y el array de la pista, al terminar la carrera que se borre
/*
servidor string
cariller []
active booleano


*/