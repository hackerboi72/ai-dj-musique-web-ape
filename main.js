var leftwristx = 0 
var leftwristy  = 0 
var rightwristx = 0 
var rightwristy = 0

var song = ""

function preload() {
    song = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center()
    video = createCapture(VIDEO)
    video.hide();
    posenet = ml5.poseNet(video,modelloaded) 
    posenet.on('pose',gotPoses)
}
function draw() {
    image(video,0,0,600,500) 
    fill("red")
    stroke("black")
    circle(leftwristx, leftwristy, 20) 
    leftwristy_number = floor(Number(leftwristy))
    volume = leftwristy_number / 500
    document.getElementById("volume").innerHTML = "volume " + volume
    song.setvolume(volume);
}
function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)    
}
function modelloaded() {
    console.log("posenet initialized")
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        leftwristx = results[0].pose.leftWrist.x
        leftwristy = results[0].pose.leftWrist.y
        console.log(" leftwristx = " + leftwristx + " leftwristy = " + leftwristy)

        rightwristx = results[0].pose.rightWrist.x
        rightwristy = results[0].pose.rightWrist.y
        console.log(" rightwristx = " + rightwristx + " rightwristy = " + rightwristy)
    }
}