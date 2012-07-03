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

    aInput.addEventListener('keyup', handleKeys, false);
    bInput.addEventListener('keyup', handleKeys, false);
}

function renderJulia(a, b) {
    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            julia([x / canvas.width, y / canvas.height], [a, b]);
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

    for (var i = 0; i < 50; i++) {
	var xTemp = x2 * x2 - y2 * y2 + a;
        var yTemp = 2 * x2 * y2 + b;
        x2 = xTemp;
        y2 = yTemp;
        if (x2 * x2 + y2 * y2 > 4) {
	    var hex = itorgb(i);
            ctx.fillStyle = hex;
            ctx.fillRect(x, y, 1, 1);
            return;
        }
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 1, 1);
}

function handleKeys(e) {
    if (e.which == 13) {
        renderJulia(parseFloat(aInput.value), parseFloat(bInput.value));
    }
}
function itorgb (i) {
    var h = i / 50 * 360;
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
    
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) {
	r = "0" + r;
    }
    if (g.length === 1) {
	g = "0" + g;
    }
    if (b.length === 1) {
	b = "0" + b;
    }

    return "#" + r + g + b;
}