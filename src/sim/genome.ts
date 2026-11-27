import type { Rng } from "./rng";
import { CONFIG } from "./config";

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

export function geneCrossover(parentA: Genome, parentB: Genome, rng: Rng): Genome {
    const child = { ...parentA };
    for (const key of Object.keys(parentA) as (keyof Genome)[]) {
        child[key] = rng.next() < 0.5 ? parentA[key] : parentB[key];
    }
    return child;
}

function mutateGene(value: number, rng: Rng): number {
    if (rng.next() >= CONFIG.mutationRate) return value;      // no mutation
    const nudged = value + (rng.next() * 2 - 1) * CONFIG.mutationSize;
    return Math.min(Math.max(nudged, 0), 1);                  // keep in 0–1
}

export function mutateGenome(g: Genome, rng: Rng): Genome {
    return {
    speed: mutateGene(g.speed, rng),
    size: mutateGene(g.size, rng),
    sight: mutateGene(g.sight, rng),
    color: mutateGene(g.color, rng),
};
}
