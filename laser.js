var colors = [[248, 12, 18], [238, 17, 0], [255, 51, 17], [255, 68, 34], [255, 102, 68], [255, 153, 51], [254, 174, 45], [204, 187, 51],
[208, 195, 16], [170, 204, 34], [105, 208, 37], [34, 204, 170], [18, 189, 185], [17, 170, 187], [68, 68, 221], [51, 17, 187], [59, 12, 189],
[68, 34, 153]];

function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y); //laser vector position
  this.vel = p5.Vector.fromAngle(angle); //getting velocity vector from the ship's "heading" variable
  this.vel.mult(10); //controlling the velocity

  this.color = colors[floor(random(0,colors.length-1))]; //randomly choosing a color from the colors array

  this.update = function() { //updating lasers position
    this.pos.add(this.vel);
  }

  this.render = function() { //rendering the laser
    push();
    stroke(this.color[0], this.color[1], this.color[2]); //selecting the random color chosen by the code in line 8
    strokeWeight(4); //graphic
    point(this.pos.x, this.pos.y); //drawing the laser
    pop();
  }

  this.hits = function(asteroid) { //collision function
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.s) {
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() { //edge detection to remove out of the array

    if (this.pos.x > width || this.pos.x < 0) { // if laser is off x axis
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) { // if laser is off y axis
      return true;
    }

    return false;

  }

}
