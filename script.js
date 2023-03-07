//Select canvas
const cvs = document.getElementById("pong")
const ctx = cvs.getContext("2d")

//Loading sounds
let hit = new Audio()
let wall = new Audio()
let userScore = new Audio()
let comScore = new Audio()

hit.src = "sounds/hit.mp3"
wall.src = "sounds/wall.mp3"
comScore.src = "sounds/comScore.mp3"
userScore.src = "sounds/userScore.mp3"

//Create user paddle
const user = {
    x: 0,
    y: cvs.height/2 - 100/2,
    width: 10, 
    height: 100,
    color: "white",
    score: 0
}

//Create computer paddle
const com = {
    x: cvs.width -10,
    y: cvs.height/2 - 100/2,
    width: 10, 
    height: 100,
    color: "white",
    score: 0
}

//Create ball
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "white",
}

//Draw rectangle
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
} 

//Create the net
const net = {
    x: cvs.width /2 -1,
    y: 0,
    width: 2, 
    height: 10,
    color: "white"
}

//Draw net
function drawNet(){
    for(let i = 0; i <= cvs.height; i += 15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color)
    }
}

//Draw circle
function drawCircle(x, y, r, color){
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2, false)
    ctx.fill()
}

//Draw Text
function drawText(text, x, y, color){
    ctx.fillStyle = color
    ctx.font = "45px fantasy"
    ctx.fillText(text, x, y)
}

//Moving paddle
cvs.addEventListener("mousemove", getMousePos);

function getMousePos(e){
    let rect = cvs.getBoundingClientRect();
    
    user.y = e.clientY - rect.top - user.height/2;
}

//Reset the ball at scoring
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

//Render the game
function render(){
    //Clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, "black")

    //Draw the net
    drawNet()

    //Draw the score
    drawText(user.score, cvs.width/4, cvs.height/5, "white")
    drawText(com.score, 3*cvs.width/4, cvs.height/5, "white")

    //Draw user and com paddle
    drawRect(user.x, user.y, user.width, user.height, user.color)
    drawRect(com.x, com.y, com.width, com.height, com.color)

    //Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

//Colision detection
function collision(b,p){
    p.top = p.y
    p.bottom = p.y + p.height
    p.left = p.x
    p.right = p.x + p.width
    
    b.top = b.y - b.radius
    b.bottom = b.y + b.radius
    b.left = b.x - b.radius
    b.right = b.x + b.radius
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
}


//Game init
function game(){
    update()
    render()
}

//Loop
const framePerSec = 50
setInterval(game, 1000/framePerSec)