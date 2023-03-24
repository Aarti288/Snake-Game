//Game Constant
var inputDir = { x: 0, y: 0 };
let SnakeMOVE = new Audio('../music/SnakeGameSound.mp3');
let SnakeEaten = new Audio('../music/Snake.mp3')
let SnakeDaeath = new Audio('../music/Snakedeathshout.mp3')


let SnakeObj = [
    {
        x: 13,
        y: 14,
    }

]
let FoodObj = {
    x: 15,
    y: 13
}


let speed = 4;
let score =0;
let regscore =0;
let lastPaintTime = 0;
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    SnakeGame();

}
function isCollide(snake) {
    for (let i = 1; i < SnakeObj.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

let highestScore = document.getElementById('highest-score');

highestScore.innerHTML =localStorage.getItem('score');

function SnakeGame() {
    let snakeBoard = document.getElementById('snake-board');

    let scoreElement = document.getElementById('score-board');
   
   
   
   
   
    


    //updating snake & food
    if (isCollide(SnakeObj)) {
        inputDir = { x: 0, y: 0 };
        // SnakeDaeath.play();
        alert("Game is over!!...press any key to start!")
        SnakeObj = [
            {
                x: 13,
                y: 14,
            }

        ]
        regscore = 0;
        scoreElement.innerHTML = regscore;
        
       
        if(localStorage.getItem('highscore')<localStorage.getItem('score'))
        {
           
            highestScore.innerHTML =localStorage.getItem('score');
           
        }
       


    }
   //snake eating a food & generating new food for snake
    if (SnakeObj[0].x === FoodObj.x && SnakeObj[0].y === FoodObj.y) {


        // SnakeEaten.play();
        score += 25;
        scoreElement.innerText = score;
        let highscore=0;
        if(score>highscore)
        {
              highscore= score;
              localStorage.setItem("score",JSON.stringify(score));
           
              localStorage.setItem("highscore",JSON.stringify(highscore));
        }
        
          
        
       
        console.log(score);
        SnakeObj.unshift({ x: SnakeObj[0].x + inputDir.x, y: SnakeObj[0].y + inputDir.y });
        let a = 2;
        let b = 16;

        FoodObj = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    //Movig the snake


    for (let i = SnakeObj.length - 2; i >= 0; i--) {      //let arr=1 2 3 5 5
        SnakeObj[i + 1] = { ...SnakeObj[i] };        //                   i  i+1
    }
    SnakeObj[0].x += inputDir.x;
    SnakeObj[0].y += inputDir.y;


    //Display Snake
    snakeBoard.innerHTML = "";
    SnakeObj.forEach((e, index) => {
        let snake = document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        if (index == 0) {
            snake.classList.add('head');
        }
        else {
            snake.classList.add('snake');
        }
        snakeBoard.appendChild(snake);

    })
    //Display Food
    let food = document.createElement('div');
    food.style.gridRowStart = FoodObj.y;
    food.style.gridColumnStart = FoodObj.x;
    food.classList.add('food');
    snakeBoard.appendChild(food);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    // SnakeMOVE.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;


            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;

            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;

            break;
        default:
            break;
    }
})
