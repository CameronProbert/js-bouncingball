// Setting variables
var ticksPerSecond = 60; // Game Speed
var windowX = window.innerWidth;
var windowY = window.innerHeight;
var mode = "sugarglider";

var gliderNames = ["sg1", "sg2", "sg3", "sg4"];
var ballNames = ["ball"];

// Environment variables
var gravity = 0.4;                  // Amount ball will be pulled down by (in pixels per tick)
var bounciness = 0.95;       // Speed ball will bounce walls with
var balls = [];

// Flags
var test = false;

document.addEventListener('click', newBall, true);

if (test){
  ticksPerSecond = 2;
  gravity = 2;
}

setInterval(main, 1000/ticksPerSecond);

/*
When the window is resized, make sure the ball doesn't get stuck outside
*/
function resize(){
  console.log("Resizing...");
  windowX = window.innerWidth;
  windowY = window.innerHeight;
}

function newBall(e){
  var newBall = {
     centreX: e.pageX,
     centreY: e.pageY,
     speedY: 0,
     size: 40 + parseInt(Math.random() * 20),
     bounciness: 0.7 + Math.random() * 0.29,
     draw: function(){
       this.element.style.left = this.centreX-25 + "px";
       this.element.style.top = this.centreY-25 + "px";
     },
     step: function(){
      // Move Ball
      this.centreY += this.speedY;

      // Check if ball bounces
      if (this.centreY + this.size/2 > windowY){
        this.bounce();
        this.centreY = windowY - this.size/2;
      }
      if (this.centreY <this. size/2){
        this.bounce();
        this.centreY = this.size/2;
      }

      // Enact gravity
      this.speedY+=gravity;
    },
    bounce: function(){
      this.speedY = (-this.speedY)*this.bounciness;
    }

  };

  newBall.element = createImage();

  balls[balls.length] = newBall;

}

function createImage(){
  var container = document.getElementById("container");
  var img = document.createElement("img");
  img.setAttribute("src", "./images/" + getImage() + ".png");
  img.setAttribute("class", "ball");
  container.appendChild(img);
  return img;
}

function getImage(){
  if (mode === "ball"){
    return ballNames[0];
  }
  if (mode === "sugarglider"){
    var num = parseInt(Math.random() * gliderNames.length);
    return gliderNames[num];
  }
}

/*
Main driving loop
*/
function main(){
  // console.log("Game running");
  for (var i = 0; i < balls.length; i++){
    balls[i].step();
    balls[i].draw();
  }
}
