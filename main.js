var leftwristx = 0 
var leftwristy  = 0 
var rightwristx = 0 
var rightwristy = 0
var leftwristscore = 0
var rightwristscore = 0
var song = ""


function preload() {
    song = loadSound("music.mp3")
}

// prelaad 

function setup() {
    canvas = createCanvas(600,500);
    canvas.center()
    video = createCapture(VIDEO)
    video.hide();
    posenet = ml5.poseNet(video,modelloaded) 
    posenet.on('pose',gotPoses)
}
// setup function

// draw function
function draw() {
    image(video,0,0,600,500) 
    fill("red")
    stroke("black")
    if (leftwristscore > 0.2) {
    
    circle(leftwristx, leftwristy, 20) 
    leftwristy_number = floor(Number(leftwristy))
    console.log(leftwristy_number)
    volume = leftwristy_number / 500
    document.getElementById("volume").innerHTML = "volume " + volume
    song.setVolume(volume);
    }

    if (rightwristscore > 0.2) {
        circle(rightwristx, rightwristy, 20)
        if(rightwristy > 0 && rightwristy <= 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x"
            song.rate(0.5)
        }
        else if (rightwristy > 100 && rightwristy <= 200) {
            document.getElementById("speed").innerHTML = "speed = 1.0x"
            song.rate(1.0)
        }
        else if (rightwristy > 200 && rightwristy <= 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5x"
            song.rate(1.5)
        }
        else if (rightwristy > 300 && rightwristy <= 400) {
            document.getElementById("speed").innerHTML = "speed = 2.0x"
            song.rate(2.0)
        }
        else if (rightwristy > 400 && rightwristy <= 500) {
            document.getElementById("speed").innerHTML = "speed = 2.5x"
            song.rate(2.5)
        }
    }
}


function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)    
}
// useless play function 

function modelloaded() {
    console.log("posenet initialized")
}
// consoler 

// big boi gotPoses
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        leftwristx = results[0].pose.leftWrist.x
        leftwristy = results[0].pose.leftWrist.y
        console.log(" leftwristx = " + leftwristx + " leftwristy = " + leftwristy)
        leftwristscore = results[0].pose.keypoints[9].score 

        rightwristx = results[0].pose.rightWrist.x
        rightwristy = results[0].pose.rightWrist.y
        console.log(" rightwristx = " + rightwristx + " rightwristy = " + rightwristy)
        rightwristscore = results[0].pose.keypoints[10].score 
    }
}