export function drawAnything(width) {
    return {
        drawTrapezoid(smallEgde, bigEdge, height) {
            let canvas = document.createElement('canvas');
            canvas.width = canvas.height = width;
            let ctx = canvas.getContext('2d');
            ctx.translate(width / 2, width / 2);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-smallEgde / 2, -height / 2);
            ctx.lineTo(smallEgde / 2, -height / 2);
            ctx.lineTo(bigEdge / 2, height / 2);
            ctx.lineTo(-bigEdge / 2, height / 2);
            ctx.closePath();
            ctx.stroke();
            return canvas;
        },

        drawDiamond(xWidth, color) {
            let canvas = document.createElement('canvas');
            canvas.width = canvas.height = width;
            let ctx = canvas.getContext('2d');
            ctx.translate(width / 2, width / 2);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, -xWidth / 2);
            ctx.lineTo(xWidth / 2, 0);
            ctx.lineTo(0, xWidth / 2);
            ctx.lineTo(-xWidth / 2, 0);
            ctx.closePath();
            ctx.fill();
            return canvas;
        },

        drawZicZac(heightStep) {
            let canvas = document.createElement('canvas');
            canvas.width = canvas.height = width;
            let ctx = canvas.getContext('2d');
            let y = 0;
            ctx.beginPath();
            ctx.moveTo(0, y);
            while (y < width) {
                ctx.lineTo(width, y);
                y += heightStep;
                ctx.lineTo(0, y);
            }
            ctx.stroke();
            return canvas;
        },

        drawSpiral(radStep) {
            let canvas = document.createElement('canvas');
            canvas.width = canvas.height = width;
            let ctx = canvas.getContext('2d');
            let origin = {
                x: width / 2,
                y: width / 2
            }
            let rad = radStep;
            let startAngle = 0, endAngle = startAngle + Math.PI;
            let flag = 1;
            while (rad < width) {
                ctx.beginPath();
                ctx.arc(origin.x, origin.y, rad, startAngle, endAngle)
                rad += radStep;
                origin.x += flag * radStep;
                startAngle = endAngle;
                endAngle += Math.PI;
                flag *= -1;
                radStep *= 1.05;
                ctx.stroke();
            }
            return canvas;
        },

        drawStar(numPoints, xWidth) {
            let canvas = document.createElement('canvas');
            canvas.width = canvas.height = width;
            let ctx = canvas.getContext('2d');
            let angleStep = 2 * Math.PI / numPoints;
            let curAngle = -Math.PI / 2 + angleStep;
            let center = {
                x: width / 2,
                y: width / 2
            }
            let CurPoint = {
                x: center.x + Math.cos(-Math.PI / 2) * xWidth,
                y: center.x + Math.sin(-Math.PI / 2) * xWidth
            }
            ctx.beginPath();
            ctx.moveTo(CurPoint.x, CurPoint.y);
            for (let p = 0; p < numPoints; p++) {
                CurPoint.x = center.x + Math.cos(curAngle) * xWidth;
                CurPoint.y = center.x + Math.sin(curAngle) * xWidth;
                ctx.quadraticCurveTo(center.x, center.y, CurPoint.x, CurPoint.y);
                curAngle += angleStep;

            }
            ctx.fillStyle = 'yellow';
            ctx.fill();
            return canvas;
        }
    }
};
