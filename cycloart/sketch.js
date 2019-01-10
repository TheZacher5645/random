var dots = [];
var links = [];
var seed = 0;


// game settings
var numOfDots = 5;

var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;
var transX;
var transY;

function setup() {
	randomSeed(seed-10*numOfDots);
	createCanvas(400, 600);
	// noLoop();

	minX = 0;
	maxX = 0;
	minY = 0;
	maxY = 0;
	transX = width/2;
	transY = height/2;
	dots = [];
	setDots();
	links = [];
}

function draw() {
	background(0);
	translate(transX, transY);

	for (var i = 0; i < links.length; i++) {
		links[i].show();
	}
	for (var i = 0; i < dots.length; i++) {
		dots[i].show();
	}
}

function setDots() {
	var n = 0; // the ids for the dots
	var black = [];
	for (var i = 0; i < numOfDots; i++) {
		var x = random(width);
		var y = random(width);

		if (i == 0) { // start the first dot at the origin
			x = 0;
			y = 0;
		} else { // after that, form the next dots arround all the others
			var newDotMade = false;
			calcBounds();
			while (!newDotMade) {
				BminX = minX - 100;
				BmaxX = maxX + 100;
				BminY = minY - 100;
				BmaxY = maxY + 100;

				var a = random(BminX, BmaxX); // potential new point position
				var b = random(BminY, BmaxY);

					// find closest point
				var smallestDist = 1000;
				for (var j = 0; j < dots.length; j++) {
					var dis = dist(a, b, dots[j].pos.x, dots[j].pos.y);
					if (dis < smallestDist) {
						smallestDist = dis;
					}
				}
					// now that we have the smallest dist, check if it's between 50 and 100
				if (50 < smallestDist && smallestDist < 100) {
					x = a;
					y = b;
					newDotMade = true;
				}
			}
		}

		var pos = createVector(x, y);
		var nd = new Dot(pos, n);

		dots.push(nd);

		n++;
	}

	// after all that, center the dots and fit them on the screen.

	calcBounds();

	// ######################################
	// properly center/scale this

	// goto line 32
	

}

function calcBounds() {
	for (var i = 0; i < dots.length; i++) {
		var x = dots[i].pos.x;
		var y = dots[i].pos.y;

		if (x < minX) {minX = x;}
		if (x > maxX) {maxX = x;}
		if (y < minY) {minY = y;}
		if (y > maxY) {maxY = y;}
	}
}

function mouseClicked() {
	var mx = mouseX - transX;
	var my = mouseY - transY;
	// find the nearest dot!
	var bestDist = height;
	var bestDot = 0;
	for (var i = 0; i < dots.length; i++) {
		var dx = dots[i].pos.x;
		var dy = dots[i].pos.y;

		var d = dist(dx, dy, mx, my);

		if (d < bestDist) {
			bestDist = d;
			bestDot = i;
		}
	}

	if (bestDist < width/10) { // check that it's not too far away
		dots[bestDot].press();
	}

	redraw();

	return false;
}

function createLink(d1, d2) {

	for (var i = 0; i < links.length; i++) {  // check if the link exists
		if (links[i].d1 == d1 && links[i].d2 == d2) {
			return;
		} else if (links[i].d1 == d2 && links[i].d2 == d1) {
			return;
		}
	}  // if it doesn't then make a new one!

	var l = new Link(d1, d2);
	links.push(l);
	calcProg();
}

function calcProg() {
	var n = numOfDots;
	var max = (n-1)*n*0.5 // https://www.wolframalpha.com/input/?i=n+choose+2
	var left = max - links.length;
	console.log(links.length + " of " + max);
	console.log(left + " left");
}