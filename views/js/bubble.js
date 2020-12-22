class Bubble{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.r=0;
        this.opacity=100
        this.speed = random(1, 5)
        this.colR=random(225)
        this.colG=random(225)
        this.colB=random(225)
    }
    inflate(){
        this.r += this.speed;
    }
    fade() {
        this.opacity -= map(this.speed, 1, 5, 0.1, 2)
    }
    faded(){
        if(this.r > width/2){
            this.r = 0
            this.x = random(innerWidth)
            this.y = random(innerHeight)
            this.opacity = 100
        }
    }
    display(){
    fill(this.colR, this.colG, this.colB, this.opacity);
    noStroke()
        ellipse(this.x,this.y,this.r,this.r);
    }
}