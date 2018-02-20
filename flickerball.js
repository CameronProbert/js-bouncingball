// Setting variables
var ticksPerSecond = 30; // Game Speed
var windowX = window.innerWidth;
var windowY = window.innerHeight;

// Environment variables
var gravity = 0.4;                  // Amount ball will be pulled down by (in pixels per tick)
var friction = 0.9;               // Speed ball will be slowed down by
var bounciness = 0.95;       // Speed ball will bounce walls with

// Ball variables
var ball = document.getElementById("ball");
var size = 50;
var centreX = size/2 + Math.random()*windowX - size;
var centreY = size/2 + Math.random()*windowY - size;
var speedX = 0;
var speedY = 0;

// Flick variables;
var pressX;
var pressY;

// Flags
var mousePressed = false;
var test = false;

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

/*
Main method for ball movement processing
*/
function step(){
  // Move Ball
  centreX+=speedX;
  centreY+=speedY;

  // Check if ball bounces
  if (centreX + size/2 > windowX){
    bounceX();
    slowY();
    centreX = windowX - size/2;
  }
  if (centreY + size/2 > windowY){
    bounceY();
    slowX();
    centreY = windowY - size/2;
  }
  if (centreX < size/2){
    bounceX();
    slowY();
    centreX = size/2;
  }
  if (centreY < size/2){
    bounceY();
    slowX();
    centreY = size/2;
  }

  // Enact friction if ball bounces
  // Enact gravity
  speedY+=gravity;
}

function bounceX(){
  speedX = (-speedX)*bounciness;
}

function bounceY(){
  speedY = (-speedY)*bounciness;
}

function slowX(){
  speedX = (-speedX)*friction;
}

function slowY(){
  speedY = (-speedY)*friction;
}

function draw(){
  // Draw ball
  document.getElementById("ball").style.left = centreX-25 + "px";
  document.getElementById("ball").style.top = centreY-25 + "px";
  // Draw dragging arrow
}

/*
Process mouse movements to flick the ball
*/
function flick(releaseX, releaseY){
  var flickX = pressX - releaseX;
  var flickY = pressY - releaseY;
  console.log("Flicked! Ball at: ", centreX, ", ", centreY, " - Flick X: ", flickX, " - Flick Y: ", flickY)

  speedX = flickX/3;
  speedY = -(flickY/3);
}

/*
Catch mouse pressed coordinates
*/
function mousePress(){
  console.log("Mouse Pressed");
  // Save the x and y coordinates of the press
 pressX = centreX;
 pressY = centreY;

  // Set mousePressed flag to true
  mousePressed = true;
}

/*
Catch mouse released coordinates
*/
function mouseRelease(){
  if (pressX === null || pressY === null){
    return;
  }
  // Call flick function
  flick(centreX, centreY);
  pressX = null;
  pressY = null;
  // Set mousePressed flag to false
  mousePressed = false;
}

/*
Main driving loop
*/
function main(){
  // console.log("Game running");
  step();
  draw();
}
