function init() {
    canvas = document.getElementById("snakeBoard");
    canvas.width = 1000;
    canvas.height = 1000;

    cellSize = 66;
    score = 5;
    game_over = false;

    food_img = new Image();
    food_img.src = "resources/apple.png";

    trophy_img = new Image();
    trophy_img.src = "resources/trophy.png";

    food = getRandomFood();
    pen = canvas.getContext('2d');
    

    snake = {
        snakeLength: 5,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function() {
            for(var index = this.snakeLength; index > 0; index--) {
                this.cells.push({xIndex: index, yIndex: 0 });

            }
        },
        drawSnake: function() {
            for(var index = 0; index < this.cells.length; index++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[index].xIndex*cellSize, this.cells[index].yIndex*cellSize, cellSize-2, cellSize-2);
            }
        },
        updateSnake: function() {
            
            let headX = this.cells[0].xIndex;
            let headY = this.cells[0].yIndex;

            if(headX == food.xIndex && headY == food.yIndex) {
                food = getRandomFood();
                score++;
            } else {
                this.cells.pop();
            }
            var newX, newY;

            switch(this.direction){
                case "left":
                    newX = headX - 1;
                    newY = headY;

                    break;
                case "right":
                    newX = headX + 1;
                    newY = headY;

                    break;
                case "up":
                    newX = headX ;
                    newY = headY - 1;

                    break;
                case "down":
                    newX = headX;
                    newY = headY + 1;

                    break;
            }

            this.cells.unshift({xIndex: newX, yIndex: newY});

            let lastIndexX = lastIndexY = Math.round(canvas.width/cellSize);

            if(headX < 0 || headY < 0 || headX > lastIndexX || headY > lastIndexY) {
                game_over = true;
            }
        }
    }

    snake.createSnake();

    function keyPressed(e) {

        switch(e.key) {
            case "ArrowRight":
                snake.direction = "right";
                break;
            case "ArrowLeft":
                snake.direction = "left";
                break;
            case "ArrowUp":
                snake.direction = "up";
                break;
            case "ArrowDown":
                snake.direction = "down";
                break;
        }
    }

    function getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
      }                                                     
      
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };    

    function handleTouchMove(evt) {
        if (!xDown || !yDown ) {
            return;
        }
    
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
    
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
               keyPressed({
                   key: "left"
               });
            } else {
                keyPressed({
                    key: "right"
                });
            }                       
        } else {
            if ( yDiff > 0 ) {
                keyPressed({
                    key: "up"
                });
            } else { 
                keyPressed({
                    key: "down"
                });
            }                                                                 
        }

        xDown = null;
        yDown = null;                                             
    };

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
}

function draw() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    snake.drawSnake();

    pen.drawImage(food_img, food.xIndex*cellSize, food.yIndex*cellSize, cellSize, cellSize);

    pen.drawImage(trophy_img, 18, 20);
    pen.fillStyle = "black";
    pen.font = "30px roboto";
    pen.fillText(score, 60, 60);
}

function update() {
    snake.updateSnake();
}

function getRandomFood() {
    let foodX = Math.round(Math.random()*((canvas.width - cellSize)/cellSize));
    let foodY = Math.round(Math.random()*((canvas.height - cellSize)/cellSize));

    return {
        xIndex: foodX,
        yIndex: foodY
    }
}

function gameloop() {

	if(game_over==true) {
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

init();

let f = setInterval(gameloop, 100);

