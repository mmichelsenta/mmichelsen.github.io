var player;
var playerImage;
var enemy;
var enemyImage;
var gameMode;
var backgroundImage;
var score;
var highScore;
var secret;
var lives;
var invincibility;

function preload(){
    playerImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/N5uCbDu.png");
    enemyImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/OdL0XPt.png");
    backgroundImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/aKQOg3G.png");
}

function setup() {
    gameMode = "play";
    createCanvas(250,250);
    player = createSprite(width/2,height-(playerImage.height/2),0,0);
    player.addImage(playerImage);
    enemy = createSprite(width/2, (enemyImage.height), 0, 0);
    enemy.addImage(enemyImage);
    enemy.rotationSpeed = 4.0;
    enemy.a_speed = 0;
    enemy.a_angle = 0.0;
    score = 0;
    highScore = 0;
    fill("white");
    secret = 0;
    lives = 3;
    invincibility = 0;
}

function draw() {
    switch(gameMode) {
    case "play":
        background(backgroundImage);
        if(enemy.overlap(player)) {
            gameOver();
        }
        
        if(keyDown(RIGHT_ARROW) && player.position.x < width-(playerImage.width/2)) {
            player.position.x += 3+score/5;
        }
        if(keyDown(LEFT_ARROW) && player.position.x > (playerImage.width/2)) {
            player.position.x += -3-score/5;
        }
        
        enemy.position.y += enemy.a_speed;
        enemy.position.x += enemy.a_angle;
        enemy.a_speed += 0.1;
        if(enemy.position.x < (enemyImage.width/2) || enemy.position.x > width - (enemyImage.width/2)) {
            enemy.a_angle *= -1;
            enemy.rotationSpeed = random(-6.0, 6.0);
        }
        if(enemy.position.y > height - (enemyImage.height/2)) {
            enemy.a_speed = random(-9-score/10,-6-score/5);
            enemy.a_angle = random(-2.0, 2.0) * (1+score/3);
            if (invincibility < 0) score++;
        }
        if(enemy.position.y < (enemyImage.height/2)) {
            enemy.a_speed = random(1+score/5,3+score/5);
            enemy.a_angle = random(-2.0, 2.0) * (1+score/3);
        }
        drawSprites();
        textAlign(LEFT);
        text(score,5,15);
        text(lives,5,30);
        invincibility -= 1;
        if (invincibility > 0) {
            if (player.position.y > 0) {
                player.position.y = -100;
            } else player.position.y = height-(playerImage.height/2)
        } else player.position.y = height-(playerImage.height/2)
        break;
    case "over":
        break;
    }
    secretf();
}

function gameOver() {
    if (invincibility < 0) {
        if (lives == 0) {
            gameMode = "over";
            background(0);
            textAlign(CENTER);
            text("Game Over!", width/2, 3*height/12)
            text("Score: " + score, width/2,5*height/12)
            if(score > highScore) {
                fill("yellow");
                text("High Score!", width/2, 6*height/12);
                fill("white");
                highScore = score;
            } else {
                text("High score: " + highScore, width/2, 6*height/12);
            }
            text("Click anywhere to try again.", width/2, 8*height/12);
        }
        else {
            lives--;
            invincibility = 50;
        }
    }
    secret = 0;
    
}

function mouseClicked() {
    if (gameMode === "over") {
        player.position.x = width/2;
        player.position.y = height-(player.height/2);
        enemy.position.x = width/2;
        enemy.position.y = (enemyImage.height);
        enemy.a_speed = 0.0;
        enemy.a_angle = 0.0;
        lives = 3;
        score = 0;
        gameMode = "play";
    }
}









function secretf() {
    if (secret == 10) {
        score += 100;
        lives = 30;
        secret = 11;
    }
    else {
        if (keyWentDown(UP_ARROW)) {
            if (secret == 0 || secret == 1) secret++;
            else secret = 0;
        }
        if (keyWentDown(DOWN_ARROW)) {
            if (secret == 2 || secret == 3) secret++;
            else secret = 0;
        }
        if (keyWentDown(LEFT_ARROW)) {
            if (secret == 4 || secret == 6) secret++;
            else secret = 0;
        }
        if (keyWentDown(RIGHT_ARROW)) {
            if (secret == 5 || secret == 7) secret++;
            else secret = 0;
        }
        if (keyWentDown("b")) {
            if (secret == 8) secret++;
            else secret = 0;
        }
        if (keyWentDown("a")) {
            if (secret == 9) secret++;
            else secret = 0;
        }
        if (keyWentDown(ENTER)) {
            if (secret == 11) {
                score = 0;
                lives = 1;
            }
        }
    }
}