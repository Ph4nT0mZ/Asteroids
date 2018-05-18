function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy(); //making the split at the same location as previous asteroid
  } else {
    this.pos = createVector(random(width), random(height)); //setting pos
  }

  if (r) {
    this.s = r * 0.5; //scaling down the asteroids
  } else {
    this.s = random(15, 50); //scale
  }

  this.points = floor(random(5, 15)); //number of points
  this.vel = p5.Vector.random2D(); //random velocity vector
  this.rotation = 0;
  this.rotationSpd = random(-0.05, 0.05);

  this.offset = []; // ofsetting the points
  for (var i = 0; i < this.points; i++) { //looping for the amount of points
    this.offset[i] = random(-this.s*0.2, this.s*0.2); //setting the offset range
  }

  this.update = function() { //updating the asteroid position
    this.pos.add(this.vel);
    this.rotation += this.rotationSpd;
  }

  this.render = function() { //rendering and generating the asteroids
    push(); //save translate state
    stroke(255);
    noFill(); //graphic
    translate(this.pos.x, this.pos.y); //setting the pos to the center
    rotate(this.rotation);
    beginShape(); //~making more comeplex shapes
    for (var i = 0; i < this.points; i++) { //generating the rocks
      var angle = map(i, 0, this.points, 0, TWO_PI); //setting the angle range for the asteroids
      var o = this.s + this.offset[i]; //ofsetting the asteroid points
      var x = o * cos(angle); //setting the x pos for the points
      var y = o * sin(angle); //setting the y pos for the points
      vertex(x, y); //making the shapes
    }
    endShape(CLOSE); //closing the asteroids
    pop(); //restore default translate state
  }

  this.brakeup = function() { // adding 2 arrays to the asteroids array (spawning 2 asteroids)
    var newA = [];

    newA[0] = new Asteroid(this.pos, this.s);
    newA[1] = new Asteroid(this.pos, this.s);

    return newA;
  }

  this.edges = function() { //edge detection (for more info, go to ship.js)
    if (this.pos.x > width + this.s) {
      this.pos.x = -this.s;
    } else if (this.pos.x < -this.s) {
      this.pos.x = width + this.s;
    }
    if (this.pos.y > height + this.s) {
      this.pos.y = -this.s;
    } else if (this.pos.y < -this.s) {
      this.pos.y = height + this.s;
    }
  }
}
