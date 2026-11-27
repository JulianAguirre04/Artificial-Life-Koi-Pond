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

// Energy Behavior parameters
    startingEnergy: 60, 
    maxEnergy: 100, 
    energyBurn: 2, // how much energy a fish burns per second
    sightRange: 250, // how far a fish can see food
    eatRadius: 12, // how close a fish has to be to eat food

// Life Span parameters
    minLifeSpan: 60,
    maxLifeSpan: 90,

// Genome parameters
    speedMin: 50,
    speedMax: 100,
    sizeMin: 5,
    sizeMax: 12,
    sightMin: 150,
    sightMax: 350,
    colorMin: 0,
    colorMax: 360,
};