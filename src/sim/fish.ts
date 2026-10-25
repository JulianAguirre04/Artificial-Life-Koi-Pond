export class Fish {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    wanderAngle: number;

    constructor(id: number, x: number, y: number, angle: number, speed: number) { 
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.wanderAngle = angle;
    }
}