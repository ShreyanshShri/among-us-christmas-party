// load imgs & stuff
function preload() {
    img = loadImage('../imgs/spritesheet.png')
    bg_ref = loadImage('../imgs/bg.png')
}

// create canvas
function setup() {
    createCanvas(innerWidth, innerHeight)
}

// render each player from players array
function draw() {
    // clear bg
    background(bg_ref)

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