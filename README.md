# AL-Koi-Pond

An artificial life simulation of a koi pond. Fish eat, grow, age, choose mates, breed and die, and their patterns, bodies and personalities evolve across generations.

> **Status:** early development (Phase 1 of 8). The tank renders; fish are next.

## The idea

Every koi carries a genome. Some genes shape survival: size, metabolism, speed, lifespan, and personality traits like boldness, skittishness, aggression and appetite. Others shape appearance: base color, fins, and a set of pattern patches that mix and mutate when two fish breed.

Selection comes from two directions:

- **Natural selection:** survival genes decide who finds food and has the energy to breed.
- **Sexual selection:** each fish has inherited preferences for how a mate looks, so appearance matters only through mate choice.

Which patterns take over is part skill and part luck, and nothing is scripted.

## Planned features

- Top-down koi with evolving patterns, rendered on a spine-driven body mesh
- Behavior driven by genes: foraging, courting, fleeing, schooling, and fighting over food
- Feeding by clicking, with growth that depends on how well a fish eats
- Japanese names that evolve from parents' names along with their genes
- An inspector for any fish: genome, stats, parents and offspring
- Graphs of gene averages, lineages and causes of death over time
- Water effects: caustics, ripples and wakes
- Autosave, with catch-up simulation when reopened, so the pond keeps living between sessions

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for the dev server and build
- [PixiJS](https://pixijs.com/) for WebGL rendering

## Getting started

Requires [Node.js](https://nodejs.org/) (LTS).

```bash
git clone https://github.com/JulianAguirre04/AL-Koi-Pond.git
cd AL-Koi-Pond
npm install
npm run dev
```

Then open the local URL the dev server prints (usually `http://localhost:5173`).

## Project structure

```
src/
├─ main.ts        entry point: creates the app and runs the loop
├─ sim/           the simulation; no rendering code
└─ render/        draws the simulation state with PixiJS
```

The simulation never depends on rendering, so it can run headless to catch up on time missed while the app was closed.

## Roadmap

1. Living dots: wander, eat, age, die
2. Genetics: genome, reproduction, crossover, mutation
3. Behavior genes and decision-making
4. Stats and graphs
5. Koi bodies and patterns
6. Mate choice and sexual selection
7. Water effects and polish
8. Persistence and installable app

## Inspiration

- *Artificial Life* videos by Emergent Garden
- *The Nature of Code* by Daniel Shiffman