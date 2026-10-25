export const CONFIG = {
    tankWidth: 1600,
    tankHeight: 1000,
    ticksPerSecond: 20,
    seed: 12345,

    startingFish: 12,
    maxSpeed: 80, // px per second
    turnForce: 120,  //how fast velocity can change, px/s²
    wanderJitter: 0.15,  //max random heading change per tick, radians
    wallMargin: 100,  // start turning away this close to a wall
};