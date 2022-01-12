objects=[];
status="";
var r="";
var g="";
var b="";
var obj="";
var f="";

function start(){
    document.getElementById("status").innerHTML="Detecting objects..";
    cocossd= ml5.objectDetector('cocossd',modelLoaded );
    obj= document.getElementById("inputObject").value;
    console.log(obj);
}
function setup() {
    canvas = createCanvas(450, 300) ;
    canvas.position(550, 359) ;
    video = createCapture(VIDEO) ;
    video.hide() ;
}

function preload() {}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    cocossd.detect(video, gotResult);
}

function draw()
{
    image(video, 0, 0, 380,380);
for(i=0; i<objects.length; i++){
percent=floor(objects[i].confidence*100);
document.getElementById("status").innerHTML="Detected objects.";
text(objects[i].label+" "+percent+ " %", objects[i].x+20, objects[i].y +20);
noFill();
stroke ('#000');
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
console.log(objects[i].label +" "+percent+"%" +" , ");
}
}

function gotResult(error,result){
if(error){
    console.log(error);

}
if(result){
    console.log(result);
    objects=result;  
    for(i=0; i<objects.length; i++){
        if(obj==objects[i].label){
            textToAudio();
        }      
    }
}
}
function textToAudio() {
    console.log(obj +" has been found!" );
    let msg = obj +" has been found!" ;
    
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(msg);

    // speech.lang = "en-US";

    // speech.text = msg;
    // speech.volume = 1;
    // speech.rate = 1;
    // speech.pitch = 1;
    synth.speak(utterThis); 
}