import RaceTrack from "@/components/racetrack/index";

export default async function Home({params}) {

  const {partida, contraseña} = await params

  return (
    <RaceTrack partida={partida} contraseña={contraseña}/>
  );
}
