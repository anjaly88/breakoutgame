var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 12;
var x = ballRadius;
var y = ballRadius;
var dx = 2;
var dy =2;
var paddleheight=100;
var paddlewidth=12;
var paddleY=(canvas.height-paddleheight)/2;
var upPressed=false;
var downPressed=false;
var brickRowCount=5;
var brickColumnCount=4;
var brickCount=brickRowCount*brickColumnCount;
var brickWidth=25;
var brickHeight=60;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=400;
var score=0;
const SCORE_UNIT=10;
var bricks=[];
for(var c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for(var r=0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0,visible:1};
    }
}
function keydownHandler(e){
    if(e.keyCode=='40'){     
        downPressed=true;
       
    }
    else if(e.keyCode=='38'){
        upPressed=true;
    }

}
 
function keyUpHandler(e){
    if(e.keyCode=='40'){     
        downPressed=false;
    }
    else if(e.keyCode=='38'){
        upPressed=false;
    }
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0,paddleY,paddlewidth,paddleheight);
    ctx.fillStyle="#2e3548";
    ctx.fill();
    ctx.strokeStyle="#FFCD05";
    ctx.stroke();
    ctx.closePath();
}
function collisionDetection(){
    for(var c=0;c<brickColumnCount;c++){
        for(var r=0;r<brickRowCount;r++){
            var b=bricks[c][r];
            if(b.visible==1){
                if(x>b.x && x<b.x+brickWidth && y>b.y &&y<b.y+brickHeight){
                    dy=-dy;
                    b.visible=0;
                    score+=SCORE_UNIT;
                    brickCount-=1;
                    if(brickCount==0){
                        alert("Congratulatios!You Win!!Your Score"+score);
                    }
                }
            }
        }
    }
}
function drawScore(){
    ctx.fillStyle="FFCD05";
    ctx.font="25px Germania One";
    ctx.fillText("Score :"+score,20,20);

}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFCD05";
    ctx.fill();
    ctx.strokeStyle="#2e3548";
    ctx.stroke();
    ctx.closePath();
}
function drawBricks(){
    for (var c=0;c<brickColumnCount;c++){
        for (var r=0;r<brickRowCount;r++){
            if(bricks[c][r].visible==1){
            var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x=brickX;
            bricks[c][r].y=brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle="#2e3548";
            ctx.strokeStyle="#fff";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }
    }
}
 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    if(x+dx>canvas.width-ballRadius ){
        dx=-dx;
    }
    else if (x+dx<ballRadius){
        if(y>paddleY &&y<paddleY+paddleheight){
            dx=-dx;
        }
        else{
            alert("Game over");
            document.location.reload();
            clearInterval(interval);
        }
    }


    if(y+dy>canvas.height-ballRadius ||y+dy<ballRadius){
        dy=-dy;
    }
    if(downPressed && paddleY<canvas.height-paddleheight){
        paddleY= paddleY+4;
    }
   else  if(upPressed && paddleY>4){
        paddleY=paddleY-4;
    }
    x += dx;
    y += dy;
}
 
document.addEventListener("keydown",keydownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
var interval=setInterval(draw, 10);
