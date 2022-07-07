// Selectionner le canvas

const canvas = document.getElementById('pong');
const ctx = canvas.getContext("2d");

// Creation Joueurs + Bot
const joueur = {
    x : 0,
    y : canvas.height / 2 - 100 / 2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0,
};

const bot = {
    x: canvas.width - 10,
    y: (canvas.height-100)/ 2,
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE",
};

//Création de la Balle

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius : 10,
    speed : 7,
    velocityX : 5,
    velocityY : 5,
    color : "WHITE",
}

// Function du Rectangle

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

const net = {
    x: (canvas.width -2) /2,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE",
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// La Baballe

function laBaballe(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

// Affichage du Texte

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y)
}

// Controle le pad du joueur
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
    let rect = canvas.getBoundingClientRect();

    joueur.y = event.clientY - rect.top - joueur.height/2;
};

// Controle Bot
let computerLevel = 0.1;
bot.y += (ball.y - (bot.y + bot.height / 2)) * computerLevel;


// Collision
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;

};

// function Reset la balle
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
};

// Refresh
function refreshUpdate() {

    //update le Score
    if (ball.x - ball.radius < 0) {
        // Le bot Win
        bot.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        // Le joueur marque
        joueur.score++;
        resetBall();
    }


    // La balle gagne de la velocité
    ball.x += ball.velocityX;
    ball.y += ball.velocityY


    // Bot Play
    bot.y += ((ball.y - (bot.y + bot.height/2)))*0.1;

    // Collision de la balle inverse la velocité
    if (ball.y + ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY
    }

    let player = (ball.x + ball.radius < canvas.width/2) ? joueur : bot;

    if (collision(ball, player)) {
        // ball.velocityX = -ball.velocityX
        let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height/2);

        // Calcul du Radian
        let angleRad = (Math.PI/4) * collidePoint;

        // Direction de la balle
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad)
        ball.velocityY = ball.speed * Math.sin(angleRad)
        // Quand la ball entre en collision avec le paddle, sa vitesse augmente
        ball.speed += 0.1;
    }
}

// Function Rendu
function renduMatch() {
    // Clear
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");

    // the Net
    drawNet()

    // Draw score
    drawText(joueur.score, canvas.width / 4, canvas.height / 5, "WHITE")
    drawText(joueur.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE")

    //Joueur VS COM
    drawRect(joueur.x, joueur.y, joueur.width, joueur.height, joueur.color);
    drawRect(bot.x, bot.y, bot.width, bot.height, bot.color);

    // Draw the Ball
    laBaballe(ball.x, ball.y, ball.radius, ball.color);
}

// StartGame
function startGame() {
    refreshUpdate();
    renduMatch()
}

// Boucle
let framePerSecond = 50;
let loop = setInterval(startGame, 1000 / framePerSecond);