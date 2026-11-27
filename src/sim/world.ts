import {CONFIG} from './config';
import {Fish} from './fish';
import {Rng} from './rng';
import {Food} from './food';

export class World{
    fish: Fish[] = [];
    food: Food[] = [];
    rng: Rng;
    tick = 0;
    nextId = 1;
    foodTimer = 0;


    constructor(seed: number) {
        this.rng = new Rng(seed);
        for (let i = 0; i < CONFIG.startingFish; i++) {
            const x = this.rng.range(200, CONFIG.tankWidth - 200);
            const y = this.rng.range(200, CONFIG.tankHeight - 200);
            const angle = this.rng.range(0, Math.PI * 2);
            const lifespan = this.rng.range(CONFIG.minLifeSpan, CONFIG.maxLifeSpan);
            this.fish.push(new Fish(this.nextId++, x, y, angle, CONFIG.maxSpeed * 0.5, lifespan));
        }
    }
    
    step(dt: number) {
        this.spawnFood(dt);
        for (const f of this.fish) this.updateFish(f, dt);
        this.tick++;
        this.food = this.food.filter(p => !p.eaten);
        this.fish = this.fish.filter(f => !f.dead);
    }

    private updateFish(f: Fish, dt: number) {
        const { maxSpeed, wallMargin, tankWidth, tankHeight} = CONFIG;


        // Wander: nudge the heading of the fish it wants a little random
        f.wanderAngle += this.rng.range(-1, 1) * CONFIG.wanderJitter;
        let desiredX = Math.cos(f.wanderAngle) * maxSpeed;
        let desiredY = Math.sin(f.wanderAngle) * maxSpeed;


        // Seek: find the closest pellet this fish can see
        let nearest: Food | null = null;
        let nearestDist = CONFIG.sightRange;

        for (const p of this.food) {
           const dx = p.x - f.x;
            const dy = p.y - f.y;
            const d =  Math.hypot(dx, dy);
            if (d < nearestDist) {
                desiredX = (dx / d) * maxSpeed;
                desiredY = (dy / d) * maxSpeed;
                nearest = p;
                nearestDist = d;
            }
        }

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

        // Pellet consumption
        if (nearest && !nearest.eaten){
            const dx = nearest.x - f.x;
            const dy = nearest.y - f.y;
            const d = Math.hypot(dx, dy);
            if (d < CONFIG.eatRadius){
                nearest.eaten = true;
                f.energy = Math.min(f.energy + nearest.energy, CONFIG.maxEnergy);
            }
        }

        // Lifespan: update age and administer the death penelty if lifespan is reached or exceeded
        f.age += dt;
        if (!f.dead && f.age >= f.lifeSpan) {
            f.dead = true;
            f.deathCause = 'Old Age';
            console.log(`Fish ${f.id} died: ${f.deathCause}`)
        }

        // energy and food manegment
        f.energy -= CONFIG.energyBurn * dt;
        if (!f.dead &&f.energy <= 0) {
            f.dead = true;
            f.deathCause = 'Starved';
            console.log(`Fish ${f.id} died: ${f.deathCause}`)
        }
    }

    private spawnFood(dt: number) {
        this.foodTimer += dt;
        const interval = 1 / CONFIG.foodPerSecond;
        while (this.foodTimer >= interval) {
            this.foodTimer -= interval;
            if (this.food.length < CONFIG.maxFood) {
                const x = this.rng.range(110, CONFIG.tankWidth - 110)
                const y = this.rng.range(110, CONFIG.tankHeight - 110)
                this.food.push(new Food(this.nextId++, x, y, CONFIG.foodEnergy));
            }
        }
    }

}