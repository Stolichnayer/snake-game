// Get the canvas from HTML file
const canvas = document.getElementById("cvs");
const canvas_context = canvas.getContext("2d");

// Add event listener for keys when pressed down
document.addEventListener("keydown", direction);

// Set the background
var background = new Image();
background.src = "img/background.png";

// Set apple image
var appleImg = new Image();
appleImg.src = "img/apple.png";

// Create box unit
const box = 25;

// Create snake
var snake = [];

// Set the snake's starting position
snake[0] = {
	x : 10 * box,
	y : 9 * box
}

// Create apple
let apple = {
	x : Math.floor(Math.random() * 20 + 1) * box,
	y : Math.floor(Math.random() * 16 + 1) *  box	
}

// Create score
var score = 0;

// Create direction variable;
var dir;

// Call function update every 100 ms (= 10 FPS)
var game = setInterval(update, 100);

function update() {
	// Draw background
	canvas_context.drawImage(background, 0, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);

	// Draw snake
	for(let i = 0; i < snake.length; i++){

		if(i == 0)
			canvas_context.fillStyle = "white";
		else
			canvas_context.fillStyle = "green";

		canvas_context.fillRect(snake[i].x, snake[i].y, box, box);

		canvas_context.strokeStyle = "black";
		canvas_context.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	// Draw the apple
	canvas_context.drawImage(appleImg, apple.x, apple.y, 25, 25 * appleImg.height / appleImg.width);

	// Old snake head's position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// Control direction
	// "%" and nested if is used for walking through walls portal effect
	if(dir == "LEFT"){
		if(snakeX == box)
			snakeX = 20 * box;
		else
			snakeX = snakeX - box;
	}
	else if(dir == "RIGHT")		
	 	snakeX = box + snakeX % (20 * box);
	else if(dir == "UP"){
		if(snakeY == box)
			snakeY = 16 * box;
		else
			snakeY = snakeY - box;
	}
	else if(dir == "DOWN") 
		snakeY = box + snakeY % (16 * box);

	// Case that snake eats the apple
	if(snakeX == apple.x && snakeY == apple.y){
		// Increase score	
		score++;
		// Randomize apple's position
		apple.x = (Math.floor(Math.random() * 20 + 1) * box);
		apple.y = Math.floor(Math.random() * 16 + 1) *  box	;

	} else {
		// Remove snake's tail
		snake.pop();
	}

	// (OPTIONAL) Wall collision detection - end game
	//if(snakeX < 1 * box || snakeX > 20 * box || snakeY > 16 * box || snakeY < 1 * box)
		//clearInterval(game);

	for(let i = 1; i < snake.length; i++){
		if(snakeX == snake[i].x && snakeY == snake[i].y)
			clearInterval(game);
	}

	// Add snake's new head
	let newHead = {
		x : snakeX,
		y : snakeY
	}

	snake.unshift(newHead);
}

function direction(event){
	switch(event.keyCode){
		case 37:
			if(dir !== "RIGHT")
				dir = "LEFT";
			break;
		case 38:
			if(dir !== "DOWN")
				dir = "UP";
			break;
		case 39:
			if(dir !== "LEFT")
				dir = "RIGHT";
			break;
		case 40:
			if(dir !== "UP")
				dir = "DOWN";
			break;
	}
}