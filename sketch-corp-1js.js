let anno; // in W3schools, const. but why?
var mantra = "";
let myTextY;
let newTextY;
let myTextYDecr;
let newTextYDecr;
let secondTextY;


function preload() {
    anno = loadJSON('annotations.json');
}
function setup() {
    createCanvas(windowWidth,windowHeight);

    for (let i=0; i< anno.lower.length; i++) {

        if (anno.pos[i].indexOf("NOUN") > -1) {
            mantra += anno.lower[i] + " ";
        }
    }
    myTextY = windowHeight;
    secondTextY = windowHeight;
}

// p5's (0,0) is in the top left corner
function draw() {

    let myFontSize = 30;
    let myLeading = 1.5;
    let myTextMaxWidth = windowWidth-10;

    frameRate(30);
    background(255);
    fill('black');
    textSize(myFontSize);
    textLeading(myFontSize * myLeading);
    ellipse(30,myTextY,30,30)

    // let myTextWidth = textWidth(mantra);
    // console.log(myTextWidth, " -> this is full width")
    // let numLines = ceil(myTextWidth/myTextMaxWidth);
    // // it said like 37 lines
    // let myTextHeight = (numLines*myFontSize) + ((numLines-1)*myLeading);
    // console.log(myTextHeight)

    

    // if the current text is halfway up the screen, draw new text
    // once current text is out of frame, redraw it at the bottom of the screen;
    // previously "new" text is now current text. recycled "previously current" text
    // is now new text.
    
    text(mantra,10,myTextY,myTextMaxWidth,windowHeight);
    myTextY -= 3;

    let numLines = ceil(textWidth(mantra)/myTextMaxWidth);
    let myTextHeight = (numLines*myFontSize) + ((numLines-1)*myLeading);
    
    if (myTextY+myTextHeight <= 0) {
        myTextY = windowHeight;
    }

    
    if (secondTextY+myTextHeight <= 0) {
        secondTextY = windowHeight;
    }    

    if (myTextY < windowHeight/2) {
        newTextY = windowHeight;

        fill('red');
        secondTextY -= 6;
        
    }
    text(mantra, 10, secondTextY, myTextMaxWidth, windowHeight);
    ellipse(30,secondTextY,30,30)
    


    

    
}

function windowResized() { //responsive
    resizeCanvas(windowWidth,windowHeight);
}


// let myTextHeight = myLeading * myFontSize * (mantra.split("\n").length);