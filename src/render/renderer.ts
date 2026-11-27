import {Container, Graphics} from 'pixi.js';
import type { World } from '../sim/world';
import {CONFIG} from '../sim/config';

export class Renderer {
    layer = new Container();
    sprites: Map<number, Graphics> = new Map();
    pelletSprites: Map<number, Graphics> =  new Map();

    constructor(pond: Container) {
        pond.addChild(this.layer);
}

draw(world: World) {
  for (const f of world.fish) {
      let g = this.sprites.get(f.id);
      if (!g) {
        g = new Graphics()
          .circle(0, 0, 8).fill(0xff6a3d)
          .moveTo(0, 0).lineTo(16, 0).stroke({ width: 2, color: 0xffffff });
        this.layer.addChild(g);
        this.sprites.set(f.id, g);
      }
      g.position.set(f.x, f.y);
      g.rotation = Math.atan2(f.vy, f.vx);
      g.alpha = 0.3 + 0.7 * (f.energy / CONFIG.maxEnergy);
    }
  
  for (const f of world.food) {
    let g = this.pelletSprites.get(f.id)
    if (!g) {
      g = new Graphics()
      .circle(0,0,3).fill(0x023020)
      this.layer.addChild(g)
      this.pelletSprites.set(f.id,g)
    }
    g.position.set(f.x, f.y);

  }
   const alive = new Set(world.food.map(p => p.id));
  
  for (const [id, g] of this.pelletSprites) {
    if (!alive.has(id)) {
      g.destroy();
      this.pelletSprites.delete(id);
    }
  }

  const aliveFish = new Set(world.fish.map(f => f.id));
  for (const [id, g] of this.sprites) {
    if (!aliveFish.has(id)) {
      g.destroy();
      this.sprites.delete(id);
    }
  }
  }
}