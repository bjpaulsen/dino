class Obstacle {
	constructor(type){
		this.type = type;
		if (this.type === 0){
			this.height = round(random(0, 40))+20;
			this.width = 25;
			this.y = height-this.height;
			this.x = width+this.width;
			this.color = "#5C755E";
			this.speed = obstacleSpeed;
		}
		else if (this.type === 1){
			this.height = 20;
			this.width = 30;
			this.y = height-50;
			this.x = width+this.width;
			this.color = "#926239";
			this.speed = obstacleSpeed + 1 + random(-2, 2);
		}
	}
	update(){
		this.x -= this.speed;
	}
	show(){
		push();
		noStroke();
		fill(this.color);
		rect(this.x, this.y, this.width, this.height);
		pop();
	}
	collides(){
		if (this.type === 0){
			return ((dino.x>(this.x-dino.dinoWidth))&&(dino.x<(this.x+this.width)))&&((dino.y+dino.dinoHeight)>this.y);
		} else {
			return (dino.dinoHeight===40)&&((dino.x>(this.x-dino.dinoWidth))&&(dino.x<(this.x+this.width)))&&(!(dino.y<this.y));
		}
	}
}
