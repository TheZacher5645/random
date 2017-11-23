const container = document.getElementById("container");
const numbOfImgs = container.childElementCount;
const image = container.children
const holdTime = 4000;
const fadeTime = 3000;
const offset = fadeTime + holdTime
const imageFadeInts = new Array(numbOfImgs);

function fade(fromN, toN) {
	let from = image[fromN];
	let to = image[toN];

	//console.log("fadding from "+ fromN +" to "+ toN);
	from.style.opacity = 1;
	to.style.zIndex = 1;
	let alpha = 0;
	imageFadeInts[to] = setInterval(
		function() {

			to.style.opacity = alpha;

			alpha += 20/fadeTime;

			if (alpha > 1) {
				to.style.opacity = 1;
				from.style.opacity = 0;
				to.style.zIndex = 0;
				clearInterval(imageFadeInts[to]);
			}
		},
	20);
}

function loop(func, ms) {
	func();
	setInterval(func, ms);
}

for (let i = 0; i < numbOfImgs; i++) {
	image[i].style.opacity = 0;
}
image[0].style.opacity = 1;

for (let i = 0; i < numbOfImgs; i++) {
	let next = i+1
	if (next > numbOfImgs-1) {
		next = 0
	}
	setTimeout(function() { loop(function() { fade(i,next) }, offset*numbOfImgs); }, holdTime + offset * i);
}