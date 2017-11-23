const container = document.getElementById("container");
const numOfImgs = container.childElementCount;
const image = container.children
const holdTime = 4000;
const fadeTime = 3000;
const offset = fadeTime + holdTime
const imageFadeInts = new Array(numOfImgs);

function fade(fromN, toN) {
	let from = image[fromN];
	let to = image[toN];

	//console.log("fadding from "+ fromN +" to "+ toN);
	for (let i = 0; i < numOfImgs; i++) {
		image[i].style.opacity = 0;
	}
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

for (let i = 0; i < numOfImgs; i++) {
	image[i].style.opacity = 0;
}
image[0].style.opacity = 1;

const tf = new Array(numOfImgs)

for (let i = 0; i < tf.length; i++) {
	let next = i+1;
	if (next > numOfImgs-1) {
		next = 0;
	}
	
	tf[i] = [i, next];
}

transitionNum = 0
// setTimeout(
	setInterval(function() {

		let localtf = tf[transitionNum]
		fade(localtf[0], localtf[1]);

		transitionNum++;
		if (transitionNum > numOfImgs-1) {
			transitionNum = 0;

		}
	}, offset)
// ,holdTime);