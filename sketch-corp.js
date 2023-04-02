let anno; // in W3schools, const. but why?
var mantra = "";
let myTextY;
let newTextY;
let myTextYDecr;
let newTextYDecr;
let secondTextY;

let bgm;
let loopStart = 0;
let loopDuration = 60.42;



function preload() {
    anno = loadJSON('annotations.json');
    soundFormats('mp3', 'ogg');
    bgm = loadSound('herringbone.mp3');
}
function setup() {
    createCanvas(windowWidth,windowHeight);
    
    bgm.loop();
    
    // for (let i=0; i< anno.lower.length; i++) {

    //     if (anno.pos[i].indexOf("NOUN") > -1) {
    //         mantra += anno.lower[i] + " ";
    //     }
    // }
    mantra += "disrupt stakeholder optimize innovate frictionless scalable pinpoint backburner spitballing painpoint operationalize pivot magic piggybacking circleback deepdive rockstar zoom synergy friction value huddle robust heavylifting ideate sprint impactful deck copy roger minimumviableproduct buzz bandaid ballpark framework usecase agile datapoints nimble wheelhouse jumpstart launch hero milestone roadmap"
    mantra = mantra.toUpperCase();
    myTextY = windowHeight;
    secondTextY = windowHeight * 2;

    myTextYDecr = 2;

}

// p5's (0,0) is in the top left corner
function draw() {
    newTextYDecr = myTextYDecr * 2;

    // font size, leading, max text width
    let myFontSize = 50;
    let myLeading = 1.5;
    let myTextMaxWidth = windowWidth-10;

    background(255);
    textSize(myFontSize);
    textLeading(myFontSize * myLeading);
    fill('black');
    textAlign(CENTER);

    text(mantra,10,myTextY,myTextMaxWidth);
    myTextY -= myTextYDecr;
    secondTextY -= newTextYDecr;
    
    text(mantra,10,secondTextY,myTextMaxWidth);


    let numLines = ceil(textWidth(mantra)/myTextMaxWidth);
    let myTextHeight = (numLines*myFontSize) + (numLines*myLeading);
    myTextY = checkIfBeyond(myTextY,myTextHeight);
    secondTextY = checkIfBeyond(secondTextY,myTextHeight);

    console.log('newTextYDecr is ',newTextYDecr);
    
}


function windowResized() { //responsive
    resizeCanvas(windowWidth,windowHeight);
}

function checkIfBeyond(thisY,textHeight) {
    if (thisY + (textHeight*1.5) < -30) {
        if (myTextYDecr < 20) {
            myTextYDecr *= 1.10;
        } else if (myTextYDecr < 50) {
            // newTextYDecr = myTextYDecr * .98;
            myTextYDecr *= .33;
            newTextYDecr = myTextYDecr * .8;
        } 
        else { // this is probably extraneous. this also could be achieved via sine?
            myTextYDecr = 3;
            newTextYDecr = myTextYDecr * 2;
        }
        return windowHeight;
    }
    else {
        return thisY;
    }
}

function mousePressed() {
    if (bgm.isPlaying()) {
        bgm.pause();
    } else {
        bgm.loop();
    }
}