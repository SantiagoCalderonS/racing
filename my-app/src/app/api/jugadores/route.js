import { NextResponse } from "next/server";

import { ServidorPusher } from "@/pusher";

import { randomRaceTrack } from "@/hooks/RaceCreator";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function POST (req, {params}){//CREAR UNA PARTIDA

    //recibe los dos parametros,y crea la instancia en el backend, devuelve los datos de "jugador", al ser el creador recibirá y guardará el id

    try {
        const searchParams = req.nextUrl.searchParams;
    const nombre = searchParams.get("nombre");

    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");

    const server = await prisma.servidor.findFirst({
        where:{name: partida}
       })
     
       if(server){
         const buscar = await prisma.player.findFirst({
          where:{name: nombre}
         })
       
         if(!buscar){
           const jugador = await prisma.player.create({
           data: {
             name: nombre,
             admin : false,
             serverId: server.id
           },
        }
    )}
console.log(jugador)
return NextResponse.json({jugador: jugador},{status: 200} )

}else{
    throw new Error
}


    } catch (error) {
        return NextResponse.json({msg: "error"},{status: 404} )
    }
    
}
