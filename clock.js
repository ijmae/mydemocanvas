//////Begin Draw analog clock
//
//Begin draw face
function drawFace(ctxOff, center, radius) {
    let borderStyle = 'black';
    ctxOff.fillStyle = 'white';
    ctxOff.beginPath();
    ctxOff.strokeStyle = borderStyle;
    ctxOff.lineWidth = radius * 0.02;
    ctxOff.arc(center.x, center.y, radius, 0, 7);
    ctxOff.fill();
    ctxOff.stroke();
    ctxOff.beginPath();
    ctxOff.fillStyle = 'black';
    ctxOff.arc(center.x, center.y, radius * 0.12, 0, 7);
    ctxOff.fill();
}
//
////end draw face

//begin draw number   
function drawNumber(ctxOff, center, radius) {
    let angleStep = Math.PI / 6;
    let curAngle = -Math.PI / 2 + angleStep;

    for (let i = 1; i < 13; i++) {
        ctxOff.save();
        ctxOff.translate(center.x, center.y);
        ctxOff.rotate(curAngle);
        ctxOff.beginPath();
        ctxOff.moveTo(radius * 0.9, 0);
        ctxOff.lineTo(radius, 0);
        curAngle += angleStep;
        (i % 3 === 0) ? ctxOff.lineWidth = radius * 0.025 : ctxOff.lineWidth = radius * 0.0125;
        ctxOff.strokeStyle = 'black';
        ctxOff.stroke();
        ctxOff.restore();
    }
}

//end draw number

//begin draw hour bar

function drawBar(ctx, time, center, radius) {
    let startAngle = -Math.PI / 2;
    let [hour, min, msec] = [time.getHours(), time.getMinutes(), (time.getSeconds() * 1000 + time.getMilliseconds())]
    min = (min + msec / 60000) % 60;
    hour = (hour + min / 60) % 12;
    let hourBar = {
        length: radius * 0.4,
        style: 'black',
        weight: radius * 0.05,
        gapSize: radius * 0.1
    };

    let hourAngle = hour * Math.PI / 6 + startAngle;

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(hourAngle);
    ctx.strokeStyle = hourBar.style;
    ctx.lineWidth = hourBar.weight
    ctx.beginPath();
    ctx.moveTo(-hourBar.gapSize, 0);
    ctx.lineTo(hourBar.length, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = radius * 0.01;
    ctx.moveTo(hourBar.length - radius * 0.1, 0);
    ctx.lineTo(hourBar.length, 0);
    ctx.stroke();
    ctx.restore();

    //end draw hour bar
    //draw minute bar
    let minBar = {
        length: radius * 0.75,
        style: 'black',
        weight: radius * 0.03,
        gapSize: radius * 0.1
    };

    let minAngle = min * Math.PI / 30 + startAngle;
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(minAngle);
    ctx.strokeStyle = minBar.style;
    ctx.lineWidth = minBar.weight
    ctx.beginPath();
    ctx.moveTo(-minBar.gapSize, 0);
    ctx.lineTo(minBar.length, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = radius * 0.01;
    ctx.moveTo(minBar.length - radius * 0.1, 0);
    ctx.lineTo(minBar.length, 0);
    ctx.stroke();
    ctx.restore();

    //end draw minute bar
    //draw second bar
    let secBar = {
        length: radius * 0.9,
        style: 'red',
        weight: radius * 0.0125,
        gapSize: radius * 0.15
    };

    let secAngle = msec * Math.PI / 30000 + startAngle;

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(secAngle);
    ctx.beginPath();
    ctx.strokeStyle = secBar.style;
    ctx.lineWidth = secBar.weight
    ctx.moveTo(0, 0);
    ctx.lineTo(secBar.length, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = secBar.weight * 2;
    ctx.moveTo(-secBar.gapSize, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.restore();

    //end draw hour bar
}

function padZero(a, len) {
    let proto = Object.getPrototypeOf(a);
    a = String(a);
    if (len > a.length) a = '0'.repeat(len - a.length) + a;
    Object.setPrototypeOf(a, proto);
    return a;
}

function drawDate(ctx, time, center, radius) {
    let [day, mon, year] = [time.getDate(), time.getMonth() + 1, time.getFullYear()];
    let [hour, min, msec] = [time.getHours(), time.getMinutes(), (time.getSeconds() * 1000 + time.getMilliseconds())]
    ctx.font = `${radius * 0.12}px Arial`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${padZero(hour, 2)} : ${padZero(min, 2)} : ${padZero(Math.floor(msec / 1000), 2)}`, center.x, center.y + radius / 2 - radius * 0.12)
    ctx.fillText(`${padZero(day, 2)} - ${padZero(mon, 2)} - ${padZero(year, 2)}`, center.x, center.y + radius / 2 + radius * 0.06);
}

//////End Draw analog clock
export class Clock {
    constructor(width, hasDate = true) {
        this.hasDate = hasDate;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = width;
        this.offScreen = document.createElement('canvas');
        this.offScreen.width = width;
        this.offScreen.height = width;
        this.center = { x: width / 2, y: width / 2 }
        this.radius = width / 2 - 4;
        let ctx = this.offScreen.getContext('2d');
        drawFace(ctx, this.center, this.radius);
        drawNumber(ctx, this.center, this.radius);
    }

    drawClock() {
        let ctx = this.canvas.getContext('2d');
        let time = new Date();
        ctx.drawImage(this.offScreen, 0, 0);

        if (this.hasDate) drawDate(ctx, time, this.center, this.radius);

        drawBar(ctx, time, this.center, this.radius);
    }
}