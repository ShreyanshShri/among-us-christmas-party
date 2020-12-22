class Player {
    // initialize variables
    constructor(x, y, direction, index, username, id) {
        this.x = x
        this.y = y
        this.username = username
        this.id = id
        this.index = index
        this.speed = 0.35
        this.dir = direction
        this.isStanding = true
        this.width = 80
        this.height = 80
    }

    // move the player
    move(dir) {
        this.index += this.speed;
        if ( floor(this.index) % spriteData[this.dir].length == 0 ) {
            this.index = 1;
        }
        this.isStanding = false
        switch (dir) {
            case 'up':
                this.y -= (this.speed * 6) + 2;
                break;
            case 'down': 
                this.y += (this.speed * 6) + 2;
                break;
            case 'left':
                this.x -= (this.speed * 6) + 2;
                this.dir = 'left'
                break;
            case 'right':
                this.x += (this.speed * 6) + 2;
                this.dir = 'right'
                break;
            default:
                break;
        }
        if (this.x > width) {
            this.x = 0
        }
        if (this.x < 0) {
            this.x = width
        }
        if (this.y > height) {
            this.y = 0
        }
        if (this.y < 0) {
            this.x = height
        }
        this.show()
    }

    // render player with username
    show() {
        fill(0, 0, 20)
        text(this.username, this.x + 20, this.y-10)
        let i;
        if(this.isStanding == true) {
            i = 0
        } else {
            i = floor(this.index) % spriteData[this.dir].length
        }
        let pixelated = img.get(spriteData[this.dir][i].position.x, spriteData[this.dir][i].position.y, spriteData[this.dir][i].position.w, spriteData[this.dir][i].position.h)
        image(pixelated, this.x, this.y, this.width, this.height)
        if(frameCount % 18 == 0){
            this.isStanding = true
            this.index = 0
        }
    }
}