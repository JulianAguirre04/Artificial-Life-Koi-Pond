import {Container, Graphics} from 'pixi.js';
import type { World } from '../sim/world';

export class Renderer {
    layer = new Container();
    sprites: Map<number, Graphics> = new Map();

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
    }
  }   
}