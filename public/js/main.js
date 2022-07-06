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

function dessinRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
};


// La Baballe

function laBaballe(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

laBaballe(100,100,10,"WHITE")

// Affichage du Texte

function leTexte(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y)
}

leTexte("text",300,200,"WHITE");

// Function Rendu

function renduMatch() {
    // Clear
    dessinRect(0,0,canvas.width,canvas.height,"RED");
    
    // the Net
    drawNet()

    // Draw score
    drawText(joueur.score,canvas.width/4,canvas.height/5,"WHITE")
    drawText(joueur.score,3*canvas.width/4,canvas.height/5,"WHITE")

    //Joueur VS COM
}

