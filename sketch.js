
let bounds=[];
let ray;
let player;
function setup() {
  createCanvas(800, 1000);
  //a line
  bounds.push(new Boundary(400,300,400,350));

  //a triangle
  bounds.push(new Boundary(500,200,600,250));
  bounds.push(new Boundary(500,300,600,250));
  bounds.push(new Boundary(500,200,500,300));
  //the surrounding walls
  bounds=bounds.concat(new Box(0,0,width,400).bounds)
  //a square
  bounds=bounds.concat(new Box(200,200,300,300).bounds)

  player=new Player(50,50,800,30,60);

}
function draw() {
  background(60);
  player.show(bounds);
  player.checkInputs(bounds);
  bounds.forEach(bound => {
    bound.show();
  });
  player.show3d(bounds);
}