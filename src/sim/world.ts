import {CONFIG} from './config';
import {Fish} from './fish';
import {Rng} from './rng';

export class World{
    fish: Fish[] = [];
    rng: Rng;
    tick = 0;
    nextId = 1;


    constructor(seed: number) {
        this.rng = new Rng(seed);
        for (let i = 0; i < CONFIG.startingFish; i++) {
            const x = this.rng.range(200, CONFIG.tankWidth - 200);
            const y = this.rng.range(200, CONFIG.tankHeight - 200);
            const angle = this.rng.range(0, Math.PI * 2);
            this.fish.push(new Fish(this.nextId++, x, y, angle, CONFIG.maxSpeed * 0.5));
        }
    }
    
    step(dt: number) {
        for (const f of this.fish) this.updateFish(f, dt);
        this.tick++;
    }

    private updateFish(f: Fish, dt: number) {
        const { maxSpeed, wallMargin, tankWidth, tankHeight } = CONFIG;


        // Wander: nudge the heading of the fish it wants a little random
        f.wanderAngle += this.rng.range(-1, 1) * CONFIG.wanderJitter;
        let desiredX = Math.cos(f.wanderAngle) * maxSpeed;
        let desiredY = Math.sin(f.wanderAngle) * maxSpeed;

        // Walls: near an edge, makes them want to swim back toward center
        let nearWall = false;
        if (f.x < wallMargin) { desiredX = maxSpeed; nearWall = true; }
        if (f.x > tankWidth - wallMargin) { desiredX = -maxSpeed; nearWall = true; }
        if (f.y < wallMargin) { desiredY = maxSpeed; nearWall = true; }
        if (f.y > tankHeight - wallMargin) { desiredY = -maxSpeed; nearWall = true; }
        if (nearWall) f.wanderAngle = Math.atan2(desiredY, desiredX);

        // Steer: turn velocity what it wants, limited by turnforce
        let sx = desiredX - f.vx;
        let sy = desiredY - f.vy;
        const len = Math.hypot(sx, sy);
        const maxChange = CONFIG.turnForce * dt;
        if (len > maxChange) {
            sx = (sx / len) * maxChange;
            sy = (sy / len) * maxChange;
    }
        f.vx += sx;
        f.vy += sy;
 
        // Move, and never leave the tank.
        f.x = Math.min(Math.max(f.x + f.vx * dt, 0), tankWidth);
        f.y = Math.min(Math.max(f.y + f.vy * dt, 0), tankHeight);
    }

}