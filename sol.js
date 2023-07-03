
/*
https://cathyatseneca.gitbooks.io/coding-projects-with-p5-js/content/p5jsdom.html
https://github.com/processing/p5.js-sound
// should i modify which variables are instantiated via let v. var?
*/

/*
agenda
    figure out AWS speechrec: trial?

    part 1: speechrec
    part 2: p5.sound
*/

let mySpeech = "";
let myPoints;
let myFont;
let myMic;
let minX = 10000;
let minY = 10000;
let speechRec;
let bgColor;
    

function preload() {
    myFont = loadFont('authenticsans130.otf');
}
function setup() {
    // speech recognition
    let lang = navigator.language || 'en-US'; // check language
    speechRec = new p5.SpeechRec(lang,gotSpeech);
    speechRec.continuous = true; // keep listening
    speechRec.interim = false; // doesnt quite work when true
    speechRec.start(); // start listening 
    speechRec.onEnd = restart;
    function gotSpeech() {
        if (speechRec.resultValue) {
            mySpeech = speechRec.resultString;
        }
    }
    function restart(){
        speechRec.start();
    }

    // sound (mic) input
    myMic = new p5.AudioIn();
    myMic.start();

    // set the value of fullscreen into the variable
    let fs = fullscreen();
    // call to fullscreen func
    fullscreen(!fs);
    // bruh how does this actually work... bc it doesnt work here? or how it should?
}

function draw() {
    colorMode(RGB,255);
    createCanvas(windowWidth,windowHeight);


    // draw text
    let windowMargins = .1*windowWidth*2;
    let fontSize = windowHeight*0.06;
    let lineSpacing = fontSize * .25;
    let maxWidth = windowWidth-windowMargins;
    
    // does this need to be after text to points? no?!
    
    let wrappedLines = wrapText(mySpeech,maxWidth,fontSize);
    let textHeight = (myFont.textBounds(mySpeech,0,0,fontSize)).h;

    for (let i=0; i<wrappedLines.length; i++) {


        // text to points
        myPoints = myFont.textToPoints(wrappedLines[i],0,0,fontSize,{
            sampleFactor:0.5,
            simplifyThreshold:0.0
        })

        
        let centroid = calculateCentroid();
        centerPoints(centroid,wrappedLines.length,i,lineSpacing,textHeight);
        console.log('centroid ',i,' ',centroid);
        console.log('textHeight ',textHeight);
    }

    // interpret audio input
    let myVol = myMic.getLevel(); // returns a float

    noStroke();
    let c;
    let sizeMult;
    
    for (let i=0; i<myPoints.length;i++) {
        // myVol usually around 0.001 to 0.02
        c = color('#ffffff');

        c.setAlpha(myVol*80*255);
        fill(c);
        rectMode(CENTER);

        let sizeMult = map(speechRec.resultConfidence,0.0,1.0,3,1)

        ellipse(myPoints[i].x+100,myPoints[i].y+500,sizeMult*(Math.random()*10)*sin(millis()),sizeMult*10*cos(millis()));

    }
    console.log('volume ', myVol);

    


}


function wrapText(text, maxWidth,fontSize) {
    console.log(text)
    let words = text.split(' ');
    let wrappedLines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let testLine = currentLine + word + ' ';
      let bBox = myFont.textBounds(testLine, 0, 0, fontSize);
      
      if (bBox.w > maxWidth) {
        wrappedLines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    
    wrappedLines.push(currentLine.trim());

    return wrappedLines;
}

  

function calculateCentroid() {
    let centroidX = 0;
    let centroidY = 0;
    
    for (let i = 0; i < myPoints.length; i++) {
      let point = myPoints[i];
      centroidX += point.x;
      centroidY += point.y;

      // evaluate min x and y
      if (point.x < minX) {
        minX = point.x;
      }
      if (point.y < minY) {
        minY = point.y;
      }
    }
    
    centroidX /= myPoints.length;
    centroidY /= myPoints.length;
    
    return { x: centroidX, y: centroidY };
}
  
function centerPoints(centroid,numLines,currLine,ls,txtH) {
    let offsetX = windowWidth / 2 - centroid.x;
    // text should be at the bottom.
    let multiLineSpace = (numLines*txtH)+((numLines-1)*ls);
    let marginBottom = 0.2*windowHeight;
    let offsetY = multiLineSpace+(0.75*marginBottom);
    

    // centerPoints(centroid,wrappedLines.length,i,lineSpacing,textHeight);

    
    
    for (let i = 0; i < myPoints.length; i++) {
        let point = myPoints[i];
        point.x += offsetX - (windowWidth*0.05);
        point.y += offsetY;
    }
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

function mousePressed() {
    saveCanvas('test', 'jpg');
}

// thank you https://github.com/IDMNYU/p5.js-speech/issues/21
// thank you https://glitch.com/~p5js-sound-mic-input