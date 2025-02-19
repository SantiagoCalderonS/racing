import RaceTrack from "@/components/racetrack/index";

export default async function Home({params}) {

  const {id} = await params

  return (
    <RaceTrack id={id}/>
  );
}
