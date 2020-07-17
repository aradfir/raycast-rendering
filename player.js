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
    }
    showRays(bounds){
      push();
      stroke(0,255,0);
      this.rays.forEach(ray=>{
        const minDistPoint=ray.findFirstCollision(bounds);
        if(minDistPoint)
          line(this.position.x,this.position.y,minDistPoint.x,minDistPoint.y);
      });
      pop();
    }
    show3d(bounds){
        push();
        translate(0,height);
        const widthPerColumn=2;
        var x=0;
        this.rays.forEach(ray => {
            const dist=ray.findFirstCollision(bounds).dist(this.position);
            const maxDist=createVector(0,0).dist(createVector(width,height/2));
            var paintColor=255*dist*dist/(maxDist*maxDist);
            paintColor=255-paintColor;
            var columnHeight=height/2 -map(dist*dist,0,maxDist*maxDist,0,height/2);
            
            // const paintcolor=map(inverSquareDist, 0,maxDist , 0, 255);
            //console.log(dist*dist,paintColor,width*width+height*height/4)
            // console.log(dist,inverSquareDist,maxDist,paintcolor);
            //stroke(paintColor);
            noStroke();
            
            fill(floor(paintColor))
            rect(x, -columnHeight,widthPerColumn , columnHeight);    
            x+=widthPerColumn;
        });
        pop();

    }
    checkInputs(){
      const turnspeed=1;
      const walkSpeed=1;
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