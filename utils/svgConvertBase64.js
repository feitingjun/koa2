import canvg from "canvg";
import Canvas from "canvas";

export default (svg) => {
    return new Promise((resolve, reject) => {
        var canvas = Canvas.createCanvas();
        canvg(canvas, svg, { ignoreMouse: true, ignoreAnimation: true, ImageClass: Canvas.Image });
        var stream = canvas.pngStream();
        var data = [];
        stream.on('data', function(chunk) {
            data.push(chunk);
        });
        stream.on('error', function(error) {
            reject(error);
        });
        stream.on('end', function() {
            resolve(Buffer.concat(data).toString('base64'));
        });
    })
}