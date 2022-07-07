// Selectionner le canvas

const canvas = document.getElementById('pong');
const ctx = canvas.getContext("2d");

// Creation Joueurs + Bot
const joueur = {
    x : 0,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0,
};

const bot = {
    x : canvas.width - 10,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0,
};

//Création de la Balle

const ball = {
    x : canvas.width / 2,
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    velocityX: 2,
    velocityY: 5,
    color : "WHITE",
}

// Function du Rectangle

function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
};

const net = {
    x : canvas.width/2 - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE",
}

function drawNet() {
    for (let i = 0; i <= canvas.length; i+=15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
        
    }
}

// La Baballe

function laBaballe(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

// Affichage du Texte

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y)
}

// Function Rendu

function renduMatch() {
    // Clear
    drawRect(0,0,canvas.width,canvas.height,"BLACK");
    
    // the Net
    drawNet()

    // Draw score
    drawText(joueur.score,canvas.width/4,canvas.height/5,"WHITE")
    drawText(joueur.score,3*canvas.width/4,canvas.height/5,"WHITE")

    //Joueur VS COM
    drawRect(joueur.x,joueur.y,joueur.width,joueur.height,joueur.color);
    drawRect(bot.x,bot.y,bot.width,bot.height,bot.color);

    // Draw the Ball
    laBaballe(ball.x,ball.y,ball.radius,ball.color);
}

// Controle le pad du joueur
canvas.addEventListener("mouseover", movePaddle);
function movePaddle(event) {
    let rect = canvas.getBoundingClientRect();

    joueur.y = event.clientY - rect.top - joueur.height/2;
    
}

// Controle Bot
let computerLevel = 0.1;
bot.y += (ball.y - (bot.y + bot.height/2 )) * computerLevel;


// Collision
function collision(b,p){
    b.top = b.y -b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
};
// Refresh
function refreshUpdate(params) {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0  ) {
        ball.velocityY = -ball.velocityY
    }
    let player = (ball.x < canvas.width/2) ? joueur : bot;
    if(collision(ball,player)){

    }
}
// StartGame
function startGame(){
    refreshUpdate();
    renduMatch()
}

// Boucle
const framePerSecond = 50;
setInterval(startGame,1000/framePerSecond);
