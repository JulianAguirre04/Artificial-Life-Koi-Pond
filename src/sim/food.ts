export class Food {
    id: number;
    x: number;
    y: number;
    energy: number;
    eaten: boolean = false;

    constructor(id: number, x: number, y: number, energy: number){
        this.id = id;
        this.x = x;
        this.y = y;
        this.energy = energy;
    }
}