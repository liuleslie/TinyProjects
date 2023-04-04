let anno1; // in W3schools, const. but why?
let anno2;
let anno3;
let anno;
var myNounsPro = "";
var myVerbsPro = "";
var myNounsTxt = "";
var myVerbsTxt = "";
let textOpac = 0;

function preload() {
    anno1 = loadJSON('dl-annotations-np.json');
    anno2 = loadJSON('dl-annotations-ne.json');
    anno3 = loadJSON('dl-annotations-vp.json');
}
function setup() {
    colorMode(RGB,255);
    createCanvas(windowWidth,windowHeight);
    
    sortInfo(anno1);
    sortInfo(anno2);
    sortInfo(anno3);
    
}

// p5's (0,0) is in the top left corner

function draw() {
    clear();

    // ---------- TEST 3 ----------
    frameRate(8);
    textSize(50);
    textAlign(CENTER,CENTER);
    let myTxt = anno3.pronunciation[3];
    text(myTxt,windowWidth/2,windowHeight/2);
    
    // L UH1 K,D AW1 N
    // differentiate by position in mouth


    // ---------- TEST 2 ----------
    // frameRate(5);
    // let c = color(0,0,0);
    // c.setAlpha(128 + 128 * sin(millis() / 1000));
    // fill(c);
    // textSize(50);
    // textAlign(CENTER,CENTER);
    
    // let annoToChoose;
    // if (Math.random() < 0.33) {annoToChoose = anno1}
    // else if (Math.random() < 0.67) {annoToChoose = anno2}
    // else {annoToChoose=anno3}
    // let randInd = Math.floor(Math.random()*(annoToChoose.pronunciation.length));
    // let myPhrasePro = annoToChoose.pronunciation[randInd];
    // let myPhraseTxt = annoToChoose.lower[randInd];
    // if (!mouseIsPressed) {
    //     text(myPhrasePro,windowWidth/2,windowHeight/2)
    // } else {
    //     text(myPhraseTxt, windowWidth/2, windowHeight/2)
    // }


    // ---------- TEST 1 ----------
    // text(myNounsPro,300,50,500,windowHeight);
    // if (mouseIsPressed) {
    //     background(150);
    //     text(myNounsTxt,300,50,500,windowHeight);
    // }
    // 
    // if (!mouseIsPressed) {
        // text(myNounsPro,mouseX+30,mouseY,windowWidth/2,windowHeight-10)
    // } else {
        // text(myNounsTxt,mouseX+30,mouseY,windowWidth/2,windowHeight-10)
    // }
    // text('mouse: '+mouseX+', '+mouseY,mouseX,mouseY-100)
}

function windowResized() { //responsive
    resizeCanvas(windowWidth,windowHeight);
}

function sortInfo(anno) {
    for (let i=0; i< anno.lower.length; i++) {
        if (anno.pos[i].indexOf("NOUN") > -1) {
            myNounsTxt += anno.lower[i] + "\n";
            myNounsPro += anno.pronunciation[i] + "\n";
        } else if ((anno.pos[i].indexOf("VERB") > -1) | (anno.pos[i].indexOf("ADJ") > -1)) {
            myVerbsTxt += anno.lower[i] + "\n";
            myVerbsPro += anno.pronunciation[i] + "\n";
        }
    }
}