import { NextResponse } from "next/server";

import { ServidorPusher } from "@/pusher";

import { randomRaceTrack } from "@/hooks/RaceCreator";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

var pistas=[]


export async function GET (req, {params}){//CONECTARSE/ si no hay partida en base redireccionar a home

    try {
        const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");

  const buscar = await prisma.servidor.findFirst({
   where:{name: partida}
  })

  if(buscar){
        return NextResponse.json({msg: ""},{status: 200} )
        }else{
            throw new Error
        }
    } catch (error) {
        return NextResponse.json({msg: "error"},{status: 404} )
    }
}



export async function POST (req, {params}){//CREAR UNA PARTIDA

    //recibe los dos parametros,y crea la instancia en el backend, devuelve los datos de "jugador", al ser el creador recibirá y guardará el id

    try {
        const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");
    const nombre = searchParams.get("nombre");

  console.log(partida, partida)

  const buscar = await prisma.servidor.findFirst({
   where:{name: partida}
  })

  if(!buscar){
    const nuevoServer = await prisma.servidor.create({
    data: {
      name: partida,
      contraseña: contraseña,
      pista: "",
    },})
    
    const jugador = await prisma.player.create({
        data: {
          name: nombre,
          admin : true,
          serverId: nuevoServer.id
        },})
        console.log(jugador)
        return NextResponse.json({jugador},{status: 200} )
}else{
    throw new Error
}


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
            ///ServidorPusher.trigger(`Servidor-${partida}`, "race", {track})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    sendMessage()

return NextResponse.json({msg: "router"},{status: 200} )
}

export async function DELETE (req, {params}){//limitar al borrado del server al creador, si no es creador que solo se borre el usuario y lo redireccione a home


    const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");
    const admin = searchParams.get("admin");
    const serverId = searchParams.get("server");

    const id = Number(admin)
    const perfil = await prisma.player.findFirst({
        where: {id: id},
      })
      const SERVIDOR = await prisma.servidor.findFirst({
        where: {name: partida},
      })
      if(SERVIDOR.id === perfil.serverId && perfil.admin === true){
        const Borrado= await prisma.servidor.delete({
        where: {name:partida},
        include: {jugadores: true}
      })
      console.log("borro todo")
      }else{
        const PerfilBorrado= await prisma.player.delete({
            where: {id:id},
          })
          console.log("borro usuario")
      }

    
     //const Borraado= await prisma.servidor.deleteMany({})
    
    const sendMessage = async () => {//si quien se sale es el creador: borrar el server, los usuarios y redireccionarlos a home por medio de un trigger
        try {//QUE AL CERRAR EL SERVIDOR EL TRIGGER HAGA SALIR A TODOS LOS PARTICIPANTES CON UN REDIRECT, AL MISMO TIEMPO QUE SE BORRA TODO LO RELACIONADO AL SERVER

            //ServidorPusher.trigger(`Servidor-${partida}`, "raceEND", {msg: "end"})
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