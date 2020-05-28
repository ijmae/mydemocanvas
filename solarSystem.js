const imgBG = new Image();
imgBG.src = './images/sky_stars.jpg';

class Planet {
    constructor(name = '', size = 0, distanceAU = 0, speed = 0, parent, imgSrc = '') {
        this.name = name;
        this.xCenter = 0;
        this.yCenter = 0;
        this.curAngle = Math.random() * Math.PI * 2;
        this.size = size;
        this.distanceAU = distanceAU;
        this.speed = speed;
        this.parent = parent;
        this.img = new Image();
        this.img.src = imgSrc;
        this.rateWidth = 0
        this.rateHeight = 0
        this.img.addEventListener('load', () => {
            this.rateWidth = this.img.width / this.img.width;
            this.rateHeight = this.img.height / this.img.width;
        })
    }
}

const SUN = new Planet('Sun - Mặt Trời', 6, 0, 0, new Planet(), './images/Sun.png');
const MERCURY = new Planet('Mercury - Sao Thủy', 0.7, 0.1, 1, SUN, './images/Mercury.png');
const VERNUS = new Planet('Vernus - Sao Kim', 1.9, 0.55, 0.73, SUN, './images/Venus.png');
const EARTH = new Planet('Earth - Trái Đất', 2, 1.2, 0.62, SUN, './images/earth.png');
const MARS = new Planet('Mars - Sao Hỏa', 1, 2.1, 0.5, SUN, './images/mars.png');
const JUPITER = new Planet('Jupiter - Sao Mộc', 3.5, 3, 0.27, SUN, './images/jupiter.png');
const SATURN = new Planet('Saturn - Sao Thổ', 3.5, 4.2, 0.2, SUN, './images/saturn.png');
const URANUS = new Planet('Uranus - Sao Thiên Vương', 1.9, 5.5, 0.14, SUN, './images/Uranus.png');
const NEPTUNE = new Planet('Neptune - Sao Hải Vương', 1.5, 7, 0.11, SUN, './images/Neptune.png');
const MOON = new Planet('Moon - Mặt Trăng', 0.5, 0.05, 2, EARTH, './images/moon.png');

const PLANETS = [SUN, MERCURY, VERNUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE, MOON];

export class SolarSystem {
    constructor(width) {
        this.name = '';
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = width;
        this.canvasZoom = document.createElement('canvas');
        this.canvasZoom.width = width;
        this.canvasZoom.height = width;
        this.canvasZoom2 = document.createElement('canvas');
        this.canvasZoom2.width = width;
        this.canvasZoom2.height = width;
        this.zoomFX = 2;
        this.rate = width / 1000;
        this.sizeUnit = 17 * this.rate;
        this.distanceUnit = 60 * this.rate;
        this.speedUnit = 1;
        this.xZoom = 0;
        this.yZoom = 0;
        this.mouseX = 0;
        this.mouseY = 0
        //Zoom
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
            let widthZoom = this.canvas.width / this.zoomFX;
            let heightZoom = this.canvas.height / this.zoomFX;
            this.xZoom = e.offsetX - widthZoom / 2;
            this.yZoom = e.offsetY - heightZoom / 2;
            if (this.xZoom < 0) this.xZoom = 0
            if (this.xZoom + widthZoom > this.canvas.width) this.xZoom = this.canvas.width - widthZoom;
            if (this.yZoom < 0) this.yZoom = 0
            if (this.yZoom + heightZoom > this.canvas.height) this.yZoom = this.canvas.height - heightZoom;
        });

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })

        this.canvas.addEventListener('wheel', (e) => {
            if (e.deltaY < 0) this.zoomFX = Math.min(4, this.zoomFX + 1);
            else this.zoomFX = Math.max(1, this.zoomFX - 1);
            e.preventDefault();
        });
    }

    drawBackground() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        let pattern = ctx.createPattern(imgBG, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return canvas;
    }

    drawSolarSystem() {
        let bg = this.drawBackground();
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(bg, 0, 0);

        PLANETS.forEach(p => {
            ctx.save();
            let x = (this.canvas.width) / 2 + p.parent.xCenter;
            let y = (this.canvas.height) / 2 + p.parent.yCenter
            let width = p.size * this.sizeUnit * p.rateWidth;
            let height = p.size * this.sizeUnit * p.rateHeight;
            //Khoảng cách giữa 2 hành tinh tính từ tâm
            let distance = p.parent.size * p.parent.rateWidth * this.sizeUnit / 2 + p.distanceAU * this.distanceUnit + p.size * p.rateWidth * this.sizeUnit / 2;
            if (p === SUN) distance = 0;
            //
            ctx.translate(x, y);
            ctx.rotate(p.curAngle + (p.speed * this.speedUnit * Math.PI / 180));
            p.curAngle += p.speed * this.speedUnit * Math.PI / 180;
            ctx.strokeStyle = 'rgba(0, 153, 255, 0.2)';
            ctx.lineWidth = 2 * this.rate;
            p.xCenter = Math.cos(p.curAngle) * distance;
            p.yCenter = Math.sin(p.curAngle) * distance;
            ctx.beginPath();
            ctx.arc(0, 0, distance, 0, 7);
            ctx.stroke();
            ctx.drawImage(p.img, 0, 0, p.img.width, p.img.height, distance - width / 2, -height / 2, width, height);
            ctx.restore();
        });
    }

    drawZoom(sCanvas, dCanvas) {
        //Draw Zoom
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        let sWidth = this.canvas.width / this.zoomFX;
        let sHeight = this.canvas.height / this.zoomFX;
        ctx.strokeRect(this.xZoom, this.yZoom, sWidth, sHeight);
        let ctxZoom = dCanvas.getContext('2d');
        ctxZoom.drawImage(sCanvas, this.xZoom * sCanvas.width / dCanvas.width, this.yZoom * sCanvas.width / dCanvas.width, sWidth * sCanvas.width / dCanvas.width, sHeight * sCanvas.width / dCanvas.width, 0, 0, dCanvas.width, dCanvas.height);

        ctxZoom.beginPath();
        ctxZoom.fillStyle = 'rgba(255,0,0,0.2)';
        ctxZoom.arc(dCanvas.width / 2, dCanvas.height / 2, 20 * this.rate, 0, 7);
        ctxZoom.fill();
        //End draw zoom;
    }

    colorPicker() {
        //Draw Zoom
        let ctx = this.canvas.getContext('2d');
        let sWidth = this.canvas.width / this.zoomFX;
        let sHeight = this.canvas.height / this.zoomFX;
        let ctxZoom = this.canvasZoom.getContext('2d');
        let imgData = ctx.getImageData(this.mouseX, this.mouseY, 1, 1);
        ctxZoom.beginPath();
        ctxZoom.fillStyle = `rgba(${imgData.data[0]},${imgData.data[1]},${imgData.data[2]},${imgData.data[3]})`;
        ctxZoom.fillRect(0, 0, 50 * this.rate, 50 * this.rate);
        ctxZoom.textBaseline = 'middle';
        ctxZoom.lineWidth = 40 * this.rate;
        ctxZoom.fillText(ctxZoom.fillStyle, 50 * this.rate, 50 * this.rate / 2)
        // ctxZoom.drawImage(dCanvas, this.xZoom * this.zoomFX, this.yZoom * this.zoomFX, sWidth * this.zoomFX, sHeight * this.zoomFX, 0, 0, this.canvasZoom.width, this.canvasZoom.height);
        //End draw zoom;
    }

    showNamePlanet() {
        let ctx = this.canvas.getContext('2d');
        let xMouse = this.mouseX;
        let yMouse = this.mouseY;
        PLANETS.forEach(p => {
            let x = (this.canvas.width) / 2 + p.parent.xCenter + p.xCenter;
            let y = (this.canvas.height) / 2 + p.parent.yCenter + p.yCenter;
            let xMin = x - p.size * p.rateWidth * this.sizeUnit / 2;
            let xMax = x + p.size * p.rateWidth * this.sizeUnit / 2;
            let yMin = y - p.size * p.rateHeight * this.sizeUnit / 2;
            let yMax = y + p.size * p.rateHeight * this.sizeUnit / 2;

            if (xMin <= xMouse && xMouse <= xMax && yMin <= yMouse && yMouse <= yMax) {
                this.name = p.name;
            }
        });
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '20px Arial';
        ctx.fillStyle = 'White';
        ctx.fillText(`${this.name}`, (this.canvas.width) / 2, 20);
    }

    drawAll() {
        this.drawSolarSystem();
        this.showNamePlanet();
        this.drawZoom(this.canvas, this.canvasZoom2);
        //Trick zoom để giữ nguyên độ phân giải => render nhiều hơn, perfomance giảm
        //
        let temp = new SolarSystem(this.canvas.width * 2);
        temp.drawSolarSystem();
        this.drawZoom(temp.canvas, this.canvasZoom);
        this.colorPicker();
    }

}

