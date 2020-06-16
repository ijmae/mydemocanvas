import { Clock } from './clock.js';
import { SolarSystem } from './solarSystem.js';
import { drawAnything } from './drawAny.js';

let clock = new Clock(500, false);
let solarSystem = new SolarSystem(500);
let drawAny = drawAnything(500);

document.querySelector('#container').appendChild(clock.canvas);
document.querySelector('#container').appendChild(solarSystem.canvas);
document.querySelector('#container').appendChild(solarSystem.canvasZoom);
document.querySelector('#container').appendChild(drawAny.drawTrapezoid(250, 400, 200));
document.querySelector('#container').appendChild(drawAny.drawDiamond(400, 'red'));
document.querySelector('#container').appendChild(drawAny.drawZicZac(25));
document.querySelector('#container').appendChild(drawAny.drawSpiral(1));
document.querySelector('#container').appendChild(drawAny.drawStar(5, 200));

function runAnimate() {
    clock.drawClock();
    solarSystem.drawAll();
    window.requestAnimationFrame(runAnimate);
}

window.requestAnimationFrame(runAnimate);