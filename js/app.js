const ROWS = [140, 220, 305];
const SPEEDS = [100, 200, 250, 300, 350, 400, 450];
const SPAWNRATE = 500;
var victoryCounter = 0;

// Enemies our player must avoid
var Enemy = function(yPosition, speed) {
	this.x = -100;
	this.y = yPosition;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/samoyed.png';
    this.x = 200;
    this.y = 380;
}

let player = new Player();

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){
    if(this.y < 100){
        playSound();
        this.reset();
        victoryCounter++;

    }
    this.checkForCollisions();
}

function playSound(){
    var victorySound = new Audio('victory.wav');
    victorySound.play();
}

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}

Player.prototype.checkForCollisions = function() {
    var playerInstance = this;
    allEnemies.forEach(function(enemy){
        if(Math.abs(enemy.x - playerInstance.x) < 60  && Math.abs(enemy.y - playerInstance.y) < 20 ){
            playerInstance.reset();
        }
    });
}

//Math.abs(10 - 50)

//implement player.resset() function
// should reset player to original coordinates

//implement player.checkIfAlive() function
// should loop through all enemies and check whether
// their coordinates intersect with the players
// compensating for their height and width

//



Player.prototype.handleInput = function(direction){


    if(direction == 'left' && this.x > 0){
        this.x -= 100;
    }

    else if(direction == 'right' && this.x < ctx.canvas.width * .75){
        this.x += 100;
    }

    else if(direction == 'up' && this.y > 0){
        this.y -= 85;
    }

    else if(direction == 'down' && this.y < ctx.canvas.height * .60){
        this.y += 85;
    }

}


let allEnemies = [];


//creates enemies at random locations and speeds
setInterval(function(){ allEnemies.push(new Enemy(getRandomRow(), getRandomSpeed())); }, SPAWNRATE);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.




document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//HELPER METHODS

function getRandomRow(){
    var randomNumber = Math.floor((Math.random() * ROWS.length));
    return ROWS[randomNumber];
}

function getRandomSpeed(){
    var randomNumber = Math.floor((Math.random() * SPEEDS.length));
    return SPEEDS[randomNumber];
}