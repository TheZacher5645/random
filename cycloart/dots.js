function Dot(pos, id) {
	this.pos = pos;
	this.id = id;

	this.pressed = false;

	this.press = function() {
		// check if no other dots are pressed,
		var othersPressed = false
		var pressedDot = 0;
		for (var i = 0; i < dots.length; i++) {
			if (i == this.id && this.pressed) { // if it's itself, then unpress it
				this.pressed = false;
				return;
			} else if (dots[i].pressed) {
				othersPressed = true;
				pressedDot = i;
				break;
			}
		}

		if (!othersPressed) { // if there are none the dot is now presesd
			this.pressed = true;
		} else { // if there is, connect the two and unpress both

			createLink(this.id, pressedDot);

			this.pressed = false;
			dots[pressedDot].pressed = false;

		}
	}

	this.show = function() {
		noStroke();
		if (this.pressed) {
			fill(255,0,0);
		} else {
			fill(255);
		}
		ellipse(this.pos.x, this.pos.y, 5);
	}
}

function Link(d1, d2) {
	this.d1 = d1;
	this.d2 = d2;

	this.show = function() {
		strokeWeight(1);
		stroke(200);
		var p1 = dots[d1].pos;
		var p2 = dots[d2].pos;
		line(p1.x, p1.y, p2.x, p2.y);
	}
}