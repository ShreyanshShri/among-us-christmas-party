// load imgs & stuff
function preload() {
    img = loadImage('../imgs/spritesheet.png')
}

var bubbles = []

// create canvas
function setup() {
    createCanvas(innerWidth, innerHeight)
    for (let i = 0; i < 12; i++) {
        bubbles.push(new Bubble(random(innerWidth), random(innerHeight)))
        
    }
}

// render each player from players array
function draw() {
    // clear bg
    background(random(200,225),220,random(200,225))

    for(bubble of bubbles){
        bubble.inflate()
        bubble.fade()
        bubble.faded()
        bubble.display()
    }
    push()
    fill(random(180,225),100,random(180,225))
    textSize(25)
    textFont("sans-serif")
    textAlign(CENTER)
    text("Happy Birthday\nRose Didi\n🥳🎊🎂🍰🍫😜🎉",width/2,height-150)
    pop()
    // check if player exists or not
    if(curr_player != null || curr_player != undefined) {
        for(player of players) {
            // check if the player is not the curr_player (to handle lagging issues)
            if(player.id != curr_player.id) {
                player.show()
            }
        }
        // render the curr_player
        curr_player.show()
    }
}