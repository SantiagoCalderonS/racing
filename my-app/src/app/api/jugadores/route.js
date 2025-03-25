import { NextResponse } from "next/server";

import { ServidorPusher } from "@/pusher";

import { randomRaceTrack } from "@/hooks/RaceCreator";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GET (req, {params}){//CONECTARSE/ si no hay partida en base redireccionar a home
try{
    const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const buscar = await prisma.servidor.findFirst({
       where:{name: partida}
      })
        
      console.log("busca", buscar)
      if(buscar){
            const sendMessage = async () => {//si quien se sale es el creador: borrar el server, los usuarios y redireccionarlos a home por medio de un trigger
           try {//QUE AL CERRAR EL SERVIDOR EL TRIGGER HAGA SALIR A TODOS LOS PARTICIPANTES CON UN REDIRECT, AL MISMO TIEMPO QUE SE BORRA TODO LO RELACIONADO AL SERVER
            ServidorPusher.trigger(`Servidor-${partida}`, "participantes", {data: buscar.avance })
           } catch (error) {
               throw new Error(error.message)
           }
       }
         sendMessage()
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
    const nombre = searchParams.get("nombre");

    const partida = searchParams.get("partida");

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

           const arr = JSON.parse(server.avance)
           arr.push({name: nombre, porcentaje: "0%"})
           const avanceString = JSON.stringify(arr)
           const newProgress = await prisma.servidor.update(
            {
              where:{
                  name: partida//id del torneo
              },
              data: {avance: avanceString},
              
          }
           )
           ServidorPusher.trigger(`Servidor-${partida}`, "participantes", {data: newProgress.avance })
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


export async function DELETE (req, {params}){//TERMINAR CARRERA, PERO DEJAR EL SERVER ACTIVO

try{
    const searchParams = req.nextUrl.searchParams;
    const partida = searchParams.get("partida");
    const contraseña = searchParams.get("contraseña");
    
    const server = await prisma.servidor.findFirst({
        where:{name: partida}
       })
     
       if(server){

           const arr = JSON.parse(server.avance)
           const newArr = arr.map((A) => {
            return {name: A.name, porcentaje: "0%"}
           })
           const avanceString = JSON.stringify(newArr)
           const newProgress = await prisma.servidor.update(
            {
              where:{
                  name: partida
              },
              data: {avance: avanceString},
              
          }
           )
           ServidorPusher.trigger(`Servidor-${partida}`, "participantes", {data: newProgress.avance })
           
           ServidorPusher.trigger(`Servidor-${partida}`, "raceEND", {msg: "end"})//QUE AL CERRAR EL SERVIDOR EL TRIGGER HAGA SALIR A TODOS LOS PARTICIPANTES CON UN REDIRECT, AL MISMO TIEMPO QUE SE BORRA TODO LO RELACIONADO AL SERVER
           return NextResponse.json({msg: "termino"},{status: 200} )
       }else{
    throw new Error
     }
 } catch (error) {
        return NextResponse.json({msg: "error"},{status: 404} )
    }

}


export async function PUT (req, {params}){//
try{

    const searchParams = req.nextUrl.searchParams;
    const nombre = searchParams.get("nombre");
    const porcentaje = searchParams.get("porcentaje");
    const partida = searchParams.get("partida");


    const recorrido = {
        "3" : "30%",
        "2" : "60%",
        "1" : "90%",
        "0" : "0%"
    }
    const server = await prisma.servidor.findFirst({
        where:{name: partida}
       })
     
       if(server){

           const arr = JSON.parse(server.avance)
           const indice = arr.findIndex(A => A.name === nombre);
                    if (indice !== -1) {
                        arr.splice(indice, 1, {name:nombre, porcentaje: recorrido[porcentaje]});
                    }
           const avanceString = JSON.stringify(arr)
           console.log(avanceString)
           const newProgress = await prisma.servidor.update(
            {
              where:{
                  name: partida
              },
              data: {avance: avanceString},
              
          }
           )
           ServidorPusher.trigger(`Servidor-${partida}`, "participantes", {data: newProgress.avance })
           console.log("sexo")
           return NextResponse.json({msg: "actualizado"},{status: 200} )

       }else{
                throw new Error
     }
 } catch (error) {
    console.log("si porfavor")
        return NextResponse.json({msg: "error"},{status: 404} )
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