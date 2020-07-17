class Boundary{
    constructor(x1,y1,x2,y2){
      this.a=createVector(x1,y1);
      this.b=createVector(x2,y2);
    }
    show(){
      stroke(255);
      push();
      
      line(this.a.x,this.a.y,this.b.x,this.b.y);
      pop();
    }
  }
class Box{
    
    constructor(topLeftX,topLeftY,bottomRightX,bottomRightY){
        this.bounds=[];
        this.bounds.push(new Boundary(topLeftX,topLeftY,topLeftX,bottomRightY));
        this.bounds.push(new Boundary(topLeftX,topLeftY,bottomRightX,topLeftY));
        this.bounds.push(new Boundary(bottomRightX,bottomRightY,bottomRightX,topLeftY));
        this.bounds.push(new Boundary(bottomRightX,bottomRightY,topLeftX,bottomRightY));
    }
    show(){
     this.bounds.forEach(bound=>{
         bound.show();
     });   
    }
}