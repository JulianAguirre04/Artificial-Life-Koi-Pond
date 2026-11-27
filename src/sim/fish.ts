import {CONFIG} from './config';
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

    constructor(id: number, x: number, y: number, angle: number, speed: number, lifeSpan: number) { 
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.wanderAngle = angle;
        this.energy = CONFIG.startingEnergy;
        this.age = 0;
        this.lifeSpan = lifeSpan;
    }
}