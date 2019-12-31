class Dino {
	constructor(){
		this.dinoWidth = 25;
		this.dinoHeight = 40;
		this.x = 100;
		this.startY = height-this.dinoHeight;
		this.y = this.startY;
		this.yVel = 0;
		this.gravity = 1.7;
	}
	update(){
		this.yVel += this.gravity;
		if ((this.y < this.startY) && keyIsDown(38)) this.yVel -= .6;
		if ((this.y < this.startY) && keyIsDown(40)) this.yVel += 1.1;
		let a = this.y + this.yVel;
		this.y = constrain(a, 0, this.startY);
	}
	jump(){
		if (this.y === this.startY) this.yVel = -16;
	}
	duck(){
		if (keyIsDown(40)){
			this.dinoHeight = this.dinoWidth;
		} else {
			this.dinoHeight = 40;
		}
	}
	show(){
		push();
		noStroke();
		fill("#515151");
		rect(this.x, this.y, this.dinoWidth, this.dinoHeight);
		pop();
	}
}
