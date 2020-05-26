import { Clock } from './clock.js';
import { SolarSystem } from './solarSystem.js';

let clock = new Clock(200, false);
let solarSystem = new SolarSystem(500);

document.querySelector('#container').appendChild(clock.canvas);
document.querySelector('#container').appendChild(solarSystem.canvasZoom2);
document.querySelector('#container').appendChild(solarSystem.canvas);
document.querySelector('#container').appendChild(solarSystem.canvasZoom);

function runAnimate() {
    clock.drawClock();
    solarSystem.drawAll();
    window.requestAnimationFrame(runAnimate);
}

window.requestAnimationFrame(runAnimate);