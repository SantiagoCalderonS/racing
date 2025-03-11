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
           },})
           console.log(jugador)
           ServidorPusher.trigger(`Servidor-${partida}`, "participantes", {data: [{name:jugador.name, porcentaje: "0%"}]})
           return NextResponse.json({jugador},{status: 200} )
        }else{
            throw new Error
             }

       }else{
    throw new Error
     }
 } catch (error) {
        return NextResponse.json({msg: "error"},{status: 404} )
    }
    
}


export async function DELETE (req, {params}){//limitar al borrado del server al creador, si no es creador que solo se borre el usuario y lo redireccione a home


    const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");
    
     //const Borraado= await prisma.servidor.deleteMany({})
    
    const sendMessage = async () => {//si quien se sale es el creador: borrar el server, los usuarios y redireccionarlos a home por medio de un trigger
        try {//QUE AL CERRAR EL SERVIDOR EL TRIGGER HAGA SALIR A TODOS LOS PARTICIPANTES CON UN REDIRECT, AL MISMO TIEMPO QUE SE BORRA TODO LO RELACIONADO AL SERVER
            ServidorPusher.trigger(`Servidor-${partida}`, "raceEND", {msg: "end"})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}


export async function PUT (req, {params}){//limitar al borrado del server al creador, si no es creador que solo se borre el usuario y lo redireccione a home


    const searchParams = req.nextUrl.searchParams;
    const nombre = searchParams.get("nombre");
    const porcentaje = searchParams.get("porcentaje");

    const recorrido = {
        1 : "30%",
        2 : "60%",
        3 : "90%"
    }
    
     //const Borraado= await prisma.servidor.deleteMany({})
    
    const sendMessage = async () => {//si quien se sale es el creador: borrar el server, los usuarios y redireccionarlos a home por medio de un trigger
        try {//QUE AL CERRAR EL SERVIDOR EL TRIGGER HAGA SALIR A TODOS LOS PARTICIPANTES CON UN REDIRECT, AL MISMO TIEMPO QUE SE BORRA TODO LO RELACIONADO AL SERVER

            ServidorPusher.trigger(`Servidor-${partida}`, "recorrido", {nombre, porcentaje})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}