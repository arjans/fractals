var canvas, ctx;
function init() {
    canvas = document.getElementById('thing');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = canvas.height = 500;

    ctx = canvas.getContext('2d');
    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            julia([x / canvas.width, y / canvas.height], [-0.513, -0.579]);
        }
    }
}

function julia(z, c) {
    // if iteration > 2, color as white
    var x, y, x2, y2;
    var a = c[0];
    var b = c[1];

    x = x2 = z[0];
    y = y2 = z[1];
    x *= canvas.width;
    y *= canvas.height;

    for (var i = 0; i < 20; i++) {
	var xTemp = x2 * x2 - y2 * y2 + a;
        var yTemp = 2 * x2 * y2 + b;
        x2 = xTemp;
        y2 = yTemp;
        if (Math.sqrt(x2 * x2 + y2 *y2) > 2) {
            console.log(x2, y2, i);
	    ctx.fillStyle = 'white';
            ctx.fillRect(x, y, 1, 1);
            return;
        }
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 1, 1);
}
