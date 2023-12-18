var cvs = document.getElementsByTagName("canvas")[0];
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "https://github.com/bulat30/school/blob/main/img/bird.png?raw=true";
bg.src = "https://github.com/bulat30/school/blob/main/img/bg.png?raw=true";
fg.src = "https://github.com/bulat30/school/blob/main/img/fg.png?raw=true";
pipeUp.src = "https://github.com/bulat30/school/blob/main/img/pipeUp.png?raw=true";
pipeBottom.src = "https://github.com/bulat30/school/blob/main/img/pipeBottom.png?raw=true";

// Звуковые файлы
//var fly = new Audio();
//var score_audio = new Audio();

//fly.src = "https://github.com/bulat30/school/blob/main/audio/fly.mp3?raw=true";
//score_audio.src = "https://github.com/bulat30/school/blob/main/audio/score.mp3?raw=true";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 35;
 //fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 0.8;

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 //score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;