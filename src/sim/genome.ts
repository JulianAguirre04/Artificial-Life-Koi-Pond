import type { Rng } from "./rng";

export interface Genome {
    speed: number;
    size: number;
    sight: number;
    color: number;
}

export function randomGenome(rng: Rng): Genome {
    return {
        speed: rng.next(),
        size: rng.next(),
        sight: rng.next(),
        color: rng.next(),
    };
}