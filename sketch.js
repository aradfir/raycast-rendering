// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)

let oldMouseX;



let bounds=[];
let ray;
let player;
function setup() {
  // put setup code here
  createCanvas(400, 400);
  bounds.push(new Boundary(300,300,300,350));
  // bounds.push(new Boundary(0,0,0,height));
  // bounds.push(new Boundary(0,0,width,0));
  // bounds.push(new Boundary(width,height,width,0));
  // bounds.push(new Boundary(width,height,0,height));
  bounds=bounds.concat(new Box(0,0,width,height).bounds)
  player=new Player(50,50,600,30,90);
  //ray=new Ray(100,300,100,150);
  oldMouseX=mouseX;
}
function draw() {
  background(0);
  
  player.show(bounds);
  player.checkInputs();
  bounds.forEach(bound => {
    bound.show();
  });
  oldMouseX=mouseX;
  
}