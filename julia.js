var canvas, ctx, aInput, bInput;
function init() {
    canvas = document.getElementById('thing');
    aInput = document.getElementById('a');
    bInput = document.getElementById('b');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = canvas.height = 500;
    ctx = canvas.getContext('2d');

    renderJulia(-0.513, -0.579);
    aInput.addEventListener('keydown', handleKeys, false);
    bInput.addEventListener('keydown', handleKeys, false);
}

function renderJulia(a, b) {
    var image = ctx.createImageData(canvas.width, canvas.height);

    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            julia([x / canvas.width, y / canvas.height], [a, b], image);
        }
    }
    ctx.putImageData(image, 0, 0);
}

function julia(z, c, image) {
    // if iteration > 2, color as white
    var x, y, x2, y2;
    var a = c[0];
    var b = c[1];

    x = x2 = z[0];
    y = y2 = z[1];
    x *= canvas.width;
    y *= canvas.height;

    var rgb = [0, 0, 0];

    for (var i = 0; i < 50; i++) {
	var xTemp = x2 * x2 - y2 * y2 + a;
        var yTemp = 2 * x2 * y2 + b;
        x2 = xTemp;
        y2 = yTemp;
	var square = x2 * x2 + y2 * y2;
        if (square > 4) {
	    rgb = itorgb(i, square);
            break;
        }
    }
    image.data[(x + y * canvas.width) * 4 + 0] = rgb[0];
    image.data[(x + y * canvas.width) * 4 + 1] = rgb[1];
    image.data[(x + y * canvas.width) * 4 + 2] = rgb[2];
    image.data[(x + y * canvas.width) * 4 + 3] = 255;
}

function handleKeys(e) {
    console.log(e);
    if (e.which == 13) {
        renderJulia(parseFloat(aInput.value), parseFloat(bInput.value));
    }
}

function itorgb (i, z) {
    var h = i + Math.log(Math.log(4)) / Math.log(2) - Math.log(Math.log(z)) / Math.log(2);
    h = h / 50 * 360;
    if (h < 0) h = 0;
    var hprime = h / 60;
    var x = 1 - Math.abs(hprime % 2 - 1);
    var r = 0;
    var g = 0;
    var b = 0;

    if (0 <= hprime && hprime < 1) {
	r = 1;
	g = x;
	b = 0;
    }

    else if (1 <= hprime && hprime < 2) {
	r = x;
	g = 1;
	b = 0;
    }

    else if (2 <= hprime && hprime < 3) {
	r = 0;
	g = 1;
	b = x;
    }

    else if (3 <= hprime && hprime < 4) {
	r = 0;
	g = x;
	b = 1;
    }

    else if (4 <= hprime && hprime < 5) {
	r = x;
	g = 0;
	b = 1;
    }

    else if (5 <= hprime && hprime < 6) {
	r = 1;
	g = 0;
	b = x;
    }

    r = Math.floor(r * 255);
    g = Math.floor(g * 255);
    b = Math.floor(b * 255);
    
    return [r, g, b];
}