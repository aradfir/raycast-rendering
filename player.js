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
            const maxDist=createVector(0,0).dist(createVector(width,400));
            //caluculate the shade to draw with using the angle of the bound.
            var paintColor=Math.atan2(Math.abs(rayHitBound.a.y-rayHitBound.b.y), Math.abs(rayHitBound.a.x-rayHitBound.b.x));
            paintColor=map(paintColor,-radians(90),radians(90),120,255);
            
            //inverse square law with a max height of the player
            var columnHeight=1/map(1.0/(maxDist),0,1.0/(dist),0,10/height);
            columnHeight=min([height-300,columnHeight]);
            
            noStroke();
            fill(paintColor);
            //draw rectangle
            rect(x, -columnHeight/2,widthPerColumn , columnHeight);    
            //move drawhead to the right
            x+=widthPerColumn;
        });
        pop();

    }
    checkInputs(bounds){
      const turnspeed=1;
      const walkSpeed=2;
      //move to the direction of delta mouse
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
        //W is pressed
        var moveRay=new Ray(this.position.x,this.position.y,radians(this.headAngle));
        const frontPoint=moveRay.findFirstCollision(bounds);
        if(frontPoint&&frontPoint[0]&&frontPoint[0].dist(this.position)>10)
        {
          const moveVec=createVector(cos(radians(this.headAngle)),sin(radians(this.headAngle))).normalize();    
          moveVec.x*=walkSpeed;
          moveVec.y*=walkSpeed;      
          this.position.x+=moveVec.x;
          this.position.y+=moveVec.y;
        }
      }
      if(keyIsDown(83))
      {
        //S is pressed
        var moveRay=new Ray(this.position.x,this.position.y,radians(this.headAngle+180));
        const frontPoint=moveRay.findFirstCollision(bounds);
        if(frontPoint&&frontPoint[0]&&frontPoint[0].dist(this.position)>10)
        {
          const moveVec=createVector(cos(radians(this.headAngle)),sin(radians(this.headAngle))).normalize();    
          moveVec.x*=walkSpeed;
          moveVec.y*=walkSpeed;      
          this.position.x-=moveVec.x;
          this.position.y-=moveVec.y;
        }
      }
      if(keyIsDown(68))
      {
        //D is pressed
        var moveRay=new Ray(this.position.x,this.position.y,radians(this.headAngle+90));
        const frontPoint=moveRay.findFirstCollision(bounds);
        if(frontPoint&&frontPoint[0]&&frontPoint[0].dist(this.position)>10)
        {
          const moveVec=createVector(cos(radians(this.headAngle+90)),sin(radians(this.headAngle+90))).normalize();
          moveVec.x*=walkSpeed;
          moveVec.y*=walkSpeed;
          this.position.x+=moveVec.x;
          this.position.y+=moveVec.y;
        }
      }
      if(keyIsDown(65))
      {
        //A is pressed
        var moveRay=new Ray(this.position.x,this.position.y,radians(this.headAngle-90));
        const frontPoint=moveRay.findFirstCollision(bounds)
        if(frontPoint&&frontPoint[0]&&frontPoint[0].dist(this.position)>10)
        {
          const moveVec=createVector(cos(radians(this.headAngle+90)),sin(radians(this.headAngle+90))).normalize();
          moveVec.x*=walkSpeed;
          moveVec.y*=walkSpeed;
          this.position.x-=moveVec.x;
          this.position.y-=moveVec.y;
        }
      }
      //update mousePosition
      this.oldMouseX=mouseX;
    }
  }