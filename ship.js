function Ship() { //ship object
  this.pos = createVector(width/2, height/2); //pos vector
  this.s = 15; //scale
  this.heading = 0; //rotation angle
  this.rotation = 0; //rotation var
  this.vel = createVector(0, 0); //speed
  this.isBoosting = false; //is the ship boosting
  this.isDestroyed = false; //is the ship destroyed
  this.destroyFrames = 600; //death animation length
  this.brokenParts = []; //the broken parts array

  this.boosting = function(b) { //detecting the UP_ARROW key
    this.isBoosting = b;
  }

  this.update = function() { //updating the ship

    if (this.isDestroyed) { //if the ship is destroyed
      for (var i = 0; i < this.brokenParts.length; i++) {
        this.brokenParts[i].pos.add(this.brokenParts[i].vel); //move the broken parts
        this.brokenParts[i].heading += this.brokenParts[i].rot; //rotate the broken parts
      }
    } else {
      if (this.isBoosting) { //boosting
        this.boost();
      }
      this.pos.add(this.vel); //adding the vel to the pos (moving the ship)
      this.vel.mult(0.99); //dampening
    }

  }

  this.boost = function() { //boosting the ship
    var force = p5.Vector.fromAngle(this.heading); //pushing from the heading angle
    force.mult(0.1); //controlling the thrust
    this.vel.add(force); //adding the force to the vel (pushing the ship)
  }

  this.render = function() { //showing the ship
    if  (this.isDestroyed) { //if the ship is destroyed
      for (var i = 0; i < this.brokenParts.length; i++) {
        push(); //save translate state
        stroke(floor(255 * ((this.destroyFrames--) / 600))); //fade the color as the time passes by
        var bp = this.brokenParts[i]; //individual broken part
        translate(bp.pos.x, bp.pos.y); //setting each broken parts starting pos to 0
        rotate(bp.heading); //rotating the broken parts
        line(-this.s / 2, -this.s / 2, this.s / 2, this.s / 2); //rendering the broken parts (lines)
        pop(); //restore default translate state
      }
    } else { //if the ship is not destroyed, render normally
      push(); //save translate state
      fill(0);
      stroke(255); //graphic
      translate(this.pos.x, this.pos.y); //setting the pos to the center
      rotate(this.heading + PI/2); //rotating the ship
      triangle(-this.s, this.s, this.s, this.s, 0, -this.s); //drawing the ship

      if (this.isBoosting) { //is the ship boosting (boosting)
        translate(0, this.s); //making the ship's rear 0, 0 for the line (translate the ship's size)
        rotate(random(-PI / 4, PI / 4)); //randomly rotate the line
        line(0, 0, 0, 10); //drawing the boost indicator
      }

      pop(); //restore default translate state
    }
  }

  this.edges = function() { //edge detection and respawning
    if (this.pos.x > width + this.s) { //if the whole ship is out (right)
      this.pos.x = -this.s; //reset the pos to the opposide x pos
    } else if (this.pos.x < -this.s) { // if the ship pos is smaller then its negative size (out left)
      this.pos.x = width + this.s; //reset the pos to opposide x pos
    }
    if (this.pos.y > height + this.s) { //if the whole ship is out (down)
      this.pos.y = -this.s; //reset the pos to the opposide y pos
    } else if (this.pos.y < -this.s) { //if the ship pos is smaller then its negative size (out up)
      this.pos.y = height + this.s; //reset the pos to the opposide y pos
    }
  }

  this.setRotation = function(a) { //setting the rotation variable
    this.rotation = a;
  }

  this.turn = function(angle) { //turn function
    this.heading += this.rotation;
  }

  this.hits = function(asteroid) { //checking if the ship is hitting an asteroid
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y); //checking the distance between the asteroid and the ship

    if (d < asteroid.s + this.s) { //detecting colision with asteroids
      return true;
    } else {
      return false;
    }

  }

  this.destroy = function() { //making the destroy function
    this.isDestroyed = true; //setting the destroy indicator to true
    for (var i = 0; i < 4; i++) { //looping the broken parts "creation" (in this case, four of them)
      this.brokenParts[i] = { //setting the broken parts properties
        pos: this.pos.copy(), //copying the ship pos (starting pos)
        vel: p5.Vector.random2D(), //random velocity and direction
        heading: random(0, 360), //random rotation
        rot: random(-0.07, 0.07) //random rotation speed
      };
    }
  }

}
