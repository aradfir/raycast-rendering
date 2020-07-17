class Player{
    //starting position, angle in degrees
    //how many rays to render, FOV of camera in degrees
    constructor(playerX,playerY,rayCount,headAngle,FOVAngle){
      this.position=createVector(playerX,playerY);
      this.rayCount=rayCount;
      this.headAngle=headAngle;
      this.FOVAngle=FOVAngle;
      this.rays=[];
      this.oldMouseX=mouseX;
  
    }
    show(bounds){
      push();
      fill(255);
      translate(this.position.x,this.position.y);
      ellipse(0,0, 10);
      const headNormal=createVector(cos(radians(this.headAngle)),sin(radians(this.headAngle))).normalize();
      line(0,0,headNormal.x,headNormal.y);
      pop();
      this.rays=[];
      const angleDiff=this.FOVAngle/(this.rayCount-1);
      for(var i=-this.FOVAngle/2;i<=this.FOVAngle/2;i+=angleDiff)
      {
        this.rays.push(new Ray(this.position.x,this.position.y,radians(i+this.headAngle)));
      }
      this.showRays(bounds);
      const directionVector=p5.Vector.fromAngle(radians(this.headAngle),30);
      stroke(255,0,0);
      line(this.position.x,this.position.y,this.position.x+directionVector.x,this.position.y+directionVector.y)
    }
    showRays(bounds){
      push();
      stroke(0,255,0);
      this.rays.forEach(ray=>{
        const minDistPoint=ray.findFirstCollision(bounds)[0];
        if(minDistPoint)
          line(this.position.x,this.position.y,minDistPoint.x,minDistPoint.y);
      });
      pop();
    }
    show3d(bounds){
        push();
        translate(0,3*height/4);
        const widthPerColumn=1;
        var x=0;
        this.rays.forEach(ray => {
            const closePoint=ray.findFirstCollision(bounds);
            if(!closePoint[0])
            {
                //no hit on this ray
                x+=widthPerColumn;
                return;
            }
            //head angle is in degree, ray angle in radians. multiplied by cos to fix fisheye
            const dist=closePoint[0].dist(this.position)*cos(radians(this.headAngle)-ray.angle);
            const rayHitBound=closePoint[1];
            const maxDist=createVector(0,0).dist(createVector(width,height/2));
            var paintColor=Math.atan2(Math.abs(rayHitBound.a.y-rayHitBound.b.y), Math.abs(rayHitBound.a.x-rayHitBound.b.x));//map(dist*dist,0,maxDist*maxDist,255,0);
            paintColor=map(paintColor,-radians(90),radians(90),120,255);
            var columnHeight=map(dist,0,maxDist,height/2,0);
            noStroke();
            fill(paintColor);
            
            rect(x, -columnHeight/2,widthPerColumn , columnHeight);    
            x+=widthPerColumn;
        });
        pop();

    }
    checkInputs(){
      const turnspeed=1;
      const walkSpeed=2;
      const mouseMove=mouseX-this.oldMouseX;
      this.headAngle=this.headAngle+mouseMove/2;
      if(keyIsDown(LEFT_ARROW))
      {
        this.headAngle-=turnspeed;
      }
      if(keyIsDown(RIGHT_ARROW))
      {
        this.headAngle+=turnspeed;
      }
      if(keyIsDown(87))
      {
        const moveVec=createVector(cos(radians(this.headAngle)),sin(radians(this.headAngle))).normalize();
        moveVec.x*=walkSpeed;
        moveVec.y*=walkSpeed;      
        this.position.x+=moveVec.x;
        this.position.y+=moveVec.y;
        console.log("W");
      }
      if(keyIsDown(83))
      {
        const moveVec=createVector(cos(radians(this.headAngle)),sin(radians(this.headAngle))).normalize();
        moveVec.x*=walkSpeed;
        moveVec.y*=walkSpeed;
        this.position.x-=moveVec.x;
        this.position.y-=moveVec.y;
        console.log("S");
      }
      if(keyIsDown(68))
      {
        const moveVec=createVector(cos(radians(this.headAngle+90)),sin(radians(this.headAngle+90))).normalize();
        moveVec.x*=walkSpeed;
        moveVec.y*=walkSpeed;
        this.position.x+=moveVec.x;
        this.position.y+=moveVec.y;
        console.log("D");
      }
      if(keyIsDown(65))
      {
        const moveVec=createVector(cos(radians(this.headAngle+90)),sin(radians(this.headAngle+90))).normalize();
        moveVec.x*=walkSpeed;
        moveVec.y*=walkSpeed;
        this.position.x-=moveVec.x;
        this.position.y-=moveVec.y;
        console.log("A");
      }
      this.oldMouseX=mouseX;
    }
  }