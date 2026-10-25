import { CONFIG } from './sim/config';
import { World } from './sim/world';
import { Renderer } from './render/renderer';
import { Application, Container, Graphics } from 'pixi.js'
import './style.css'

const TANK_W = 1600;
const TANK_H = 1000;

async function start() {
  const app = new Application();
  await app.init({ 
    background: '#000000',
    resizeTo: window,
    antialias: true,
  });
  document.body.appendChild(app.canvas);

  //Everything in the koi pond is in this container
  const pond = new Container();
  app.stage.addChild(pond);

  const tank = new Graphics()
    .rect(0, 0, TANK_W, TANK_H)
    .stroke({ width: 3, color: 0xffffff});
  pond.addChild(tank);

  // Scale to pond to fit the window with a margin, and center it
  const fit = () => {
    const margin = 40;
    const scale = Math.min(
      (app.screen.width - margin) / TANK_W,
      (app.screen.height - margin) / TANK_H,
    );
    pond.scale.set(scale);
    pond.position.set(
      (app.screen.width - CONFIG.tankWidth * scale) / 2,
      (app.screen.height - CONFIG.tankHeight * scale) / 2,
    );
  };
  fit();
  app.renderer.on('resize', fit);
  const world = new World(CONFIG.seed);
  const renderer = new Renderer(pond);

  const tickDt = 1 / CONFIG.ticksPerSecond
  let owed = 0;
  app.ticker.add((ticker) => {
    owed = Math.min(owed + ticker.deltaMS / 1000, 0.25);
    while (owed >= tickDt) {
      world.step(tickDt);
      owed -= tickDt;
    }
    renderer.draw(world);
  })
}

start();