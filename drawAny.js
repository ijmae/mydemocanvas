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


            
            return canvas;
        }
    }
};
