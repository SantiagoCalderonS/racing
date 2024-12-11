
export function randomRaceTrack (steps){

    var carriles = []
    var sides= ["left", "right"]

    for( var num = 0; num < steps; num++){
        
        carriles.push({slot: num, side: sides[Math.floor(Math.random() * sides.length)]})
    }

    
    
    return carriles
}