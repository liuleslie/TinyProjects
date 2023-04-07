let annoNP; // in W3schools, const. but why? understand const v. var v. let
let annoNE;
let annoVP;
let chunks = [];

let capture, tracker;
let w = window.innerWidth;
let h = window.innerHeight;

// the latest:
// make sure words dont wander off — or if they do, ability to drag them back
// implement different opacities
// consider whether to break down multiple word "chunks" — clearly define what a chunk is

class Chunk {
    constructor(x,y,text,pro,role) {
        this.x = x;
        this.y = y;
        this.text = text; // lower
        this.pro = pro; // pronunication
        this.role = role; // pos (part of speech)
        // this.type = type; // np/ne/vp --> this is not important here?
    }
    draw() {

        push();
        scale(-1,1);
        translate(-w,0);
        image(capture,0,0,w,h);
        pop();

        let myStr;
        if (mouseIsPressed) {
            myStr = this.pro;
        } else {
            myStr = this.text;
        }
        fill('#ffce00');
        stroke('black');
        strokeWeight(5);
        text(myStr,this.x,this.y);
    }
    // update() looks for any mouse interactions and small scale animations
    update() {
        this.x += Math.random()*2-1;
        this.y += Math.random()*2-1;
        
    }
}

function preload() {
    annoNP = loadJSON('dl-annotations-np.json'); // noun phrases
    annoNE = loadJSON('dl-annotations-ne.json'); // named entities
    annoVP = loadJSON('dl-annotations-vp.json'); // verb phrases
}
function setup() {
    colorMode(RGB,255);
    createCanvas(windowWidth,windowHeight);
    
    sortInfo(annoNP);
    sortInfo(annoNE);
    sortInfo(annoVP);

    // video feed setup
    capture = createCapture(VIDEO)
    
}

// p5's (0,0) is in the top left corner

function draw() {
    clear();
    background('black')

    // frameRate(4);
    textSize(50);
    textAlign(CENTER,CENTER);
    let myStr = "";
    for (let i=0; i<15; i++) {
        chunks[i].draw();
        chunks[i].update();
    }
    // for (let chunk of chunks) {
    //     chunk.draw();
    //     chunk.update();
    // }

}

function windowResized() { //responsive
    resizeCanvas(windowWidth,windowHeight);
}

function sortInfo(anno) {

    // anno is an array of key value pairs. each key is the attribute, the value is an array of JSON obj literals
    // what i want is lower, pronunciation, pos (part of speech)
    for (let i=0; i<anno.lower.length; i++) { // iterate through each word in this list
        // create a chunk object
        // chunks.push(new Chunk(JSON.stringify(anno.lower[i]),JSON.stringify(anno.pronunciation[i]),JSON.stringify(anno.pos[i])));
        let newPro = JSON.stringify(anno.pronunciation[i]);
        newPro = newPro.substr(2,newPro.length-4);
        // remove "," for multiple word chunks
        if (newPro.indexOf('","') > -1) {
            let tempPro = newPro.split('","');
            newPro = "";
            for (let j=0; j<tempPro.length;j++) {
                newPro += "    " + tempPro[j];
            }
        }
        newPro = newPro.toLowerCase();
        chunks.push(new Chunk(Math.random()*windowWidth-100,Math.random()*windowHeight-100,anno.lower[i],newPro,JSON.stringify(anno.pos[i])));
    }


}

// L UH1 K,D AW1 N

// i y ɨ ʉ ɯ u = 14%
// ɪ ʏ ʊ = 28%
// e ø ɘ ɵ ɤ o = 42%
// ə = 56%
// ɛ œ ɜ ɞ ʌ ɔ = 70%
// æ ɐ = 84%
// a ɶ ɑ ɒ = 100%


// 14 = "IY", "Y", "W", "UW", "OO"
// 28 = "IH", "UH"
// 42 = "TH"
// 56 = "AH0"
// 70 = "EH", "AH", "A0"
// 84 = "AE"
// 100 = "AA", ""