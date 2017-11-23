const container = document.getElementById("container");
const numOfImgs = container.childElementCount;
const image = container.children;
const holdTime = 4000;
const fadeTime = 3000;
const offset = fadeTime + holdTime;
let prev = null;

function fade(fromN, toN) {
	let from = image[fromN];
	let to = image[toN];

	if (prev != null) {
		prev.className = "i hidden";
	}

	//console.log("fadding from "+ fromN +" to "+ toN);
	for (let i = 0; i < numOfImgs; i++) {
		image[i].className = "i hidden";
	}
	from.className = "i from";
	to.className = "i to";
	prev = from;
}

function loop(func, ms) {
	func();
	setInterval(func, ms);
}

const tf = new Array(numOfImgs);

for (let i = 0; i < tf.length; i++) {
	let next = i+1;
	if (next > numOfImgs-1) {
		next = 0;
	}
	
	tf[i] = [i, next];
}

transitionNum = 0;
image[0].className = "i from"
setTimeout(
	setInterval(function() {

		let localtf = tf[transitionNum];
		fade(localtf[0], localtf[1]);

		transitionNum++;
		if (transitionNum > numOfImgs-1) {
			transitionNum = 0;

		}
	}, offset)
,holdTime);