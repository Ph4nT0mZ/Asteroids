var ship; // ~constructor functions
var asteroids = [];
var lasers = [];

var canPlay = true; //can the player play
var score = 0; //score
var points = 5; //the points added
var level = 1; //the current level
var lives = 3; //lives

function spawnAsteroids() {
  for (var i = 0; i < level + 11; i++) { //looping the asteroid creation
    asteroids.push(new Asteroid()); //adding the asteroids
  }
}

function setup() { //setting up the program
  createCanvas(windowWidth - 50, windowHeight - 30); //setting up the canvas
  ship = new Ship(); // ~constructor function

  spawnAsteroids(); //spawn the asteroids

}

function keyPressed() { //detecting keyboard
  if (key === " " && canPlay) {
    lasers.push(new Laser(ship.pos, ship.heading)); //spawning a new laser
  }
  if (keyCode === RIGHT_ARROW && canPlay) { //rotating right
    ship.setRotation(0.075);
  }
  if (keyCode === LEFT_ARROW && canPlay) { //rotating left
    ship.setRotation(-0.075);
  }
  if (keyCode === UP_ARROW && canPlay) { //accelerating
    ship.boosting(true);
  }
}

function keyReleased() { //ending keyStates
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    ship.setRotation(0);
  }
  if (keyCode === UP_ARROW) {
    ship.boosting(false);
  }
}

function draw() { //updating the canvas
  background(0); //setting the canvas to black

  for (var i = 0; i < asteroids.length; i++) { //enabling the asteroids
    asteroids[i].render(); //rendering the asteroids
    asteroids[i].update(); //updating the asteroids
    asteroids[i].edges(); //checking collision with walls

    if (ship.hits(asteroids[i]) && canPlay) { //if the ship hits an asteroid and it can play

      canPlay = false;
      ship.destroy(); //starting the destroy animation
      setTimeout(function() { //setting timeout
        lives--; //reduce lives
        if (lives > 0) { //if the player can continue playing (lives > 0)
          ship = new Ship(); //spawn new ship
          canPlay = true;
        }
        //level = 1;                       //previous code, ignore
        //score = 0;
        //asteroids.length = 0;
        //spawnAsteroids();
        //ship = new Ship();
        //canPlay = true;
      }, 3000);

    }

  }

  for (var i = lasers.length-1; i >= 0; i--) { //enabling the lasers
    lasers[i].render();
    lasers[i].update();

    if (lasers[i].offscreen()) { //detecting if the lasers are offscreen
      lasers.splice(i, 1); // removing the laser
    } else { //if the lasers arent offscreen
      for (var j = asteroids.length-1; j >= 0; j--) { //checking collision with asteroids
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].s > 25 ) {
            var newAsteroids = asteroids[j].brakeup();
            asteroids = asteroids.concat(newAsteroids); //adding 2 asteroids
          }
          asteroids.splice(j, 1); // removing the asteroid
          lasers.splice(i, 1); // removing the laser
          score += points;
          if (asteroids.length === 0) {
            level++
            spawnAsteroids();
          }
          break; //stopping the loop to avoids checking non existant objects
        }
      }
    }
  }

  ship.render(); //rendering the ship
  ship.turn(); //updating the "heading" variable using the "rotation" variable
  ship.update(); //updating the ship
  ship.edges(); //"respawning the ship back when it goes of screen"

  textSize(25);
  fill(color(255));
  text('Score: ' + score, 10, 30); //draw the score
  text('Level: ' + level, 10, 60); //draw the level

  push();
  textAlign(CENTER); //align text to the center
  text('Lives: ' + lives, width / 2, height - 10); //draw lives
  pop();

  if (!canPlay && lives === 0) { //if the player cannot play and cannot continue playing (lives === 0)
    push();
    textAlign(CENTER);
    fill(255);
    text("YOU LOST!", width / 2, height / 2); //draw "YOU LOST!"
    text("Refresh to restart.", width / 2, height / 2 + 25); //draw "Refresh to restart."
    pop();
  }

}
