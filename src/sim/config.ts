export const CONFIG = {
    tankWidth: 1600,
    tankHeight: 1000,
    ticksPerSecond: 20,
    seed: 54321, // random seed for reproducible runs, change for different runs


// Fish behavior parameters
    startingFish: 12,
    maxSpeed: 80, // px per second
    turnForce: 135,  //how fast velocity can change, px/s²
    wanderJitter: 0.25,  //max random heading change per tick, radians
    wallMargin: 100,  // start turning away this close to a wall

// Food behavior parameters
    foodPerSecond: 2,
    maxFood: 40,
    foodEnergy: 25, // how much energy a fish gets from a single pellet


};