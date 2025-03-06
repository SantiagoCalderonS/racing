import Entrada from "@/components/entrada";

export default async function Registro ({params}) {

  const {partida, contraseña} = await params

  return (
    <Entrada partida={partida} contraseña={contraseña}/>
  );
}
