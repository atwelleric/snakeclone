// ~~~~~~~~~~~~~~~~ THIS GAME WAS CREATED FOLLOWING ~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~ THIS VERY AMAZING TUTORIAL AT   ~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~ https://www.youtube.com/watch?v=9TcU2C1AACw ~~~~





const cvs = document.getElementById('canvas');

const ctx = cvs.getContext('2d');
//create unit
const box = 32;
//load images
let ground = new Image();
ground.src = 'img/ground.png';
let foodImg = new Image();
foodImg.src = 'img/food.png';

//load audio
const dead = new Audio();
const down = new Audio();
const eat = new Audio();
const left = new Audio();
const right = new Audio();
const up = new Audio();

dead.src = 'audio/dead.mp3';
down.src = 'audio/down.mp3';
eat.src = 'audio/eat.mp3';
left.src = 'audio/left.mp3';
right.src = 'audio/right.mp3';
up.src = 'audio/up.mp3';

// create snake
let snake = [];

snake[0] = {
	x: 9 * box,
	y: 10 * box,
};
//create the random food position
let food = {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box,
};

// create score var
let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
//control snake

let d;

document.addEventListener('keydown', direction);

function direction(event) {
	let key = event.keyCode;
	if (key == 37 && d != 'RIGHT') {
		left.play();
		d = 'LEFT';
	} else if (key == 38 && d != 'DOWN') {
		up.play();
		d = 'UP';
	} else if (key == 39 && d != 'LEFT') {
		right.play();
		d = 'RIGHT';
	} else if (key == 40 && d != 'UP') {
		down.play();
		d = 'DOWN';
	}
}

//check collision

function collision(head, array) {
	for (let i = 0; i < array.length; i++) {
		if (head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

//Draw

function draw() {
	ctx.drawImage(ground, 0, 0);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? 'green' : 'white';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = 'red';
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}
	ctx.drawImage(foodImg, food.x, food.y);

	//old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//which direction

	if (d == 'LEFT') snakeX -= box;
	console.log(snakeX);
	if (d == 'UP') snakeY -= box;
	console.log(snakeY);
	if (d == 'RIGHT') snakeX += box;
	console.log(snakeX);
	if (d == 'DOWN') snakeY += box;
	console.log(snakeY);

	//if the snake eats the food
	if (snakeX == food.x && snakeY == food.y) {
		score++;
		bestScore = Math.max(score, bestScore);
		localStorage.setItem('bestScore', bestScore);
		eat.play();
		food = {
			x: Math.floor(Math.random() * 17 + 1) * box,
			y: Math.floor(Math.random() * 15 + 3) * box,
		};
		//dont remove tail
	} else {
		//remove tail
		snake.pop();
	}

	// add new head

	let newHead = {
		x: snakeX,
		y: snakeY,
	};

	// game over
	if (
		snakeX < box ||
		snakeX > 17 * box ||
		snakeY < 3 * box ||
		snakeY > 17 * box ||
		collision(newHead, snake)
	) {
		dead.play();
		clearInterval(game);
	}

	snake.unshift(newHead);

	ctx.fillStyle = 'white';
	ctx.font = '45px Changa one';
	ctx.fillText(score, 2 * box, 1.6 * box);

	ctx.fillText(bestScore, 15 * box, 1.6 * box);
}

// call draw function everyone 100 ms

let game = setInterval(draw, 100);
