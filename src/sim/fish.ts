import {CONFIG} from './config';
import type {Genome} from './genome';

export class Fish {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    wanderAngle: number;
    energy: number;
    age: number;
    lifeSpan: number;
    dead: boolean = false;
    deathCause: 'Starved' | 'Old Age' | null = null;
    genome: Genome;
    maxSpeed: number;
    radius: number;
    sight: number;
    burn: number;
    hue: number;
    

    constructor(id: number, x: number, y: number, angle: number,  lifeSpan: number, genome: Genome) { 
        this.genome = genome;
        this.maxSpeed = CONFIG.speedMin + (CONFIG.speedMax - CONFIG.speedMin) * genome.speed;
        this.radius = CONFIG.sizeMin + (CONFIG.sizeMax - CONFIG.sizeMin) * genome.size;
        this.sight = CONFIG.sightMin + (CONFIG.sightMax - CONFIG.sightMin) * genome.sight;
        this.burn = CONFIG.energyBurn * (0.6 + 0.4 * genome.size) * (0.6 + 0.4 * genome.speed);
        this.hue = CONFIG.colorMin + (CONFIG.colorMax - CONFIG.colorMin) * genome.color;
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * this.maxSpeed * 0.5;
        this.vy = Math.sin(angle) * this.maxSpeed * 0.5;
        this.wanderAngle = angle;
        this.energy = CONFIG.startingEnergy;
        this.age = 0;
        this.lifeSpan = lifeSpan;
    }
}

