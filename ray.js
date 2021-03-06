class Ray{
    //angle in radian!!
    constructor(originX,originY,angle){
      this.point=createVector(originX,originY);
      this.angle=angle;
      this.rayVector=createVector(cos(angle),sin(angle));
      this.rayVector.normalize();
    }
    lookAt(targX,targY){
      this.rayVector=createVector(targX-this.point.x,targY-this.point.y);
      this.rayVector.normalize();
    }
    setRawDir(dirX,dirY){
      this.rayVector=createVector(dirX,dirY);
      this.rayVector.normalize();
    }
    show(){
      push();
      stroke(255);
      translate(this.point.x, this.point.y);
      line(0,0,this.rayVector.x*100,this.rayVector.y*100);
      pop();
    }
    cast(wall){
      //wikipedia line line intersection https://en.wikipedia.org/wiki/Line–line_intersection
      const x1=wall.a.x;
      const x2=wall.b.x;
      const y1=wall.a.y;
      const y2=wall.b.y;
  
      const x3=this.point.x;
      const x4=this.point.x+this.rayVector.x;
      const y3=this.point.y;
      const y4=this.point.y+this.rayVector.y;
      const den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
      if(den==0)
        return;
      const tnum=(x1-x3)*(y3-y4)-(y1-y3)*(x3-x4);
      const t= tnum/den;
      const unum=  -(x1-x2)*(y1-y3)+(y1-y2)*(x1-x3);
      const u=unum/den;
      if(t>0&&t<1&&u>0)
      {
        //collision in the direction of the ray and the segment
        const resPoint=createVector();
        
          const x= x1+t*(x2-x1);
          const y=y1+t*(y2-y1);
          resPoint.x=x;
          resPoint.y=y;
          return resPoint;
      }
      else{
        //no collision
        return;
      }
    }
    findFirstCollision(bounds){
        var minDistPoint;
        var minDist=1000000;
        var collidedWall;
        for(let bound of bounds){    
          const point=this.cast(bound);
          if(!point)
            continue;

          if(point.dist(this.point)<minDist)
          {
            minDist=point.dist(this.point);
            minDistPoint=point;
            collidedWall=bound;
          }
        }
       return [minDistPoint,collidedWall];
    }
  }