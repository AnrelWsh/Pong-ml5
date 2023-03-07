//Select canvas
const cvs = document.getElementById("pong")
const ctx = cvs.getContext("2d")

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
    /**/ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2, false)
    ctx.fill()
}

//Draw Text
function drawText(text, x, y, color){
    ctx.fillStyle = color
    ctx.font = "45px fantasy"
    ctx.fillText(text, x, y)
}

//Render the game
function render(){
    //Clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, "black")

    //Draw the net
    drawNet()

    //Draw the score
    drawText(user.score, cvs.width/4, cvs.height/5, "white")
    drawText(com.score, cvs.width/4, cvs.height/5, "white")

    //Draw user and com paddle
    drawRect(user.x, user.y, user.width, user.height, user.color)
    drawRect(com.x, com.y, com.width, com.height, com.color)

    //Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

//Colision detection


//Update function
function update(){
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY
    }
}

//Game init
function game(){
    update()
    render()
}

//Loop
const framePerSec = 50
setInterval(game, 1000/framePerSec)