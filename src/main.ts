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
      (app.screen.width = margin) / TANK_W,
      (app.screen.height - margin) / TANK_H,
    );
    pond.scale.set(scale);
    pond.position.set(
      (app.screen.width - TANK_W * scale) / 2,
      (app.screen.height - TANK_H * scale) / 2,
    );
  };
  fit();
  app.renderer.on('resize', fit);
}

start();