// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)

let oldMouseX;



let bounds=[];
let ray;
let player;
function setup() {
  // put setup code here
  createCanvas(800, 1000);
  bounds.push(new Boundary(400,300,400,350));

  bounds.push(new Boundary(500,200,600,250));
  bounds.push(new Boundary(500,300,600,250));
  bounds.push(new Boundary(500,200,500,300));

  bounds=bounds.concat(new Box(0,0,width,400).bounds)
  bounds=bounds.concat(new Box(200,200,300,300).bounds)

  player=new Player(50,50,800,30,60);
  
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
  player.show3d(bounds);
}