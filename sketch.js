let dino;
let obstacleSpeed = 10;
let obstacles = [];
let spawnSpeed = 2100;
let score = 0;
let scores = [];

let spawnTimeout;

function setup(){
	let canv = createCanvas(600, 300);
	let x = (windowWidth - width)/2;
	let y = (windowHeight - height)/2;
	canv.position(x, y);
	frameRate(40);
	dino = new Dino();
	spawnTimeout = setTimeout(spawn, spawnSpeed);
}

function spawn(){
	if (random(0, 3) > 1) {
		for (let i = 0; i < round(random(1, 3)); i++){
			setTimeout(newCactus, i*150);
		}
		spawnTimeout = setTimeout(spawn, spawnSpeed+round(random(-100, 100)));
	} else {
		for (let i = 0; i < round(random(1, 2)); i++){
			setTimeout(newBird, i*200+round(random(0, 100)));
		}
		spawnTimeout = setTimeout(spawn, spawnSpeed-200+round(random(-100, 100)));
	}
	spawnSpeed -= 32;
	obstacleSpeed += .27;
}

function newCactus(){
	obstacles.push(new Obstacle(0));
}

function newBird(){
	obstacles.push(new Obstacle(1));
}

function draw(){
	background(51);

	score++;
	document.getElementById("score").innerHTML = score;

	dino.duck();
	dino.update();
	dino.show();

	for (elt of obstacles){
	 	elt.update();
	 	elt.show();
	 	if (elt.collides()) endGame();
	}

	despawnObstacles();
}

function updateScoreboard(){
	scores.sort(function(a,b){return b-a});
	switch(scores.length){
		case 0:
			break;
		case 1:
			document.getElementById("name1").innerHTML = scores[0];
			break;
		case 2:
			document.getElementById("name1").innerHTML = scores[0];
			document.getElementById("name2").innerHTML = scores[1];
			break;
		case 3:
			document.getElementById("name1").innerHTML = scores[0];
			document.getElementById("name2").innerHTML = scores[1];
			document.getElementById("name3").innerHTML = scores[2];
			break;
		case 4:
			document.getElementById("name1").innerHTML = scores[0];
			document.getElementById("name2").innerHTML = scores[1];
			document.getElementById("name3").innerHTML = scores[2];
			document.getElementById("name4").innerHTML = scores[3];
			break;
		case 5:
			document.getElementById("name1").innerHTML = scores[0];
			document.getElementById("name2").innerHTML = scores[1];
			document.getElementById("name3").innerHTML = scores[2];
			document.getElementById("name4").innerHTML = scores[3];
			document.getElementById("name5").innerHTML = scores[4];
			break;
		default:
			document.getElementById("name1").innerHTML = scores[0];
			document.getElementById("name2").innerHTML = scores[1];
			document.getElementById("name3").innerHTML = scores[2];
			document.getElementById("name4").innerHTML = scores[3];
			document.getElementById("name5").innerHTML = scores[4];
			break;
	}

}

function despawnObstacles(){
	for (let i = obstacles.length-1; i >= 0; i--){
		if (obstacles[i].x < -1*obstacles[i].width){
			obstacles.splice(i, 1);
		}
	}
}

function endGame(){
	noLoop();
	clearTimeout(spawnTimeout);
	obstacleSpeed = 10;
	spawnSpeed = 2100;
	document.getElementById("gameover").innerHTML = "GAME OVER";
	document.getElementById("restart").innerHTML = "R to Restart";
	scores.push(score);
	updateScoreboard();
}

function restart(){
	score = 0;
	obstacles = [];
	obstacleSpeed = 10;
	spawnSpeed = 2100;
	dino.y = dino.startY;
	setTimeout(spawn, spawnSpeed);
	document.getElementById("gameover").innerHTML = " ";
	document.getElementById("restart").innerHTML = " ";
	loop();
}

function keyPressed(){
	if ((keyCode === 38)) dino.jump();
	if (keyCode === 40){
		dino.y += dino.dinoWidth;
		dino.startY = 275;
	}
	if (keyCode === 82){
		restart();
	}
}

function keyReleased(){
	if (keyCode === 40){
		dino.y -= dino.dinoWidth;
		dino.startY = 260;
	}
}
