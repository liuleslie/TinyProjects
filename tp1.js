
/*
https://cathyatseneca.gitbooks.io/coding-projects-with-p5-js/content/p5jsdom.html
https://github.com/processing/p5.js-sound
*/

// should i modify which variables are instantiated via let v. var?

let mySpeech = "";
let myPoints;
let myFont;
let myMic;
let minX = 10000;
let minY = 10000;
    

function preload() {
    myFont = loadFont('authenticsans130.otf');
}
function setup() {
    // speech recognition
    let lang = navigator.language || 'en-US'; // check language
    let speechRec = new p5.SpeechRec(lang,gotSpeech);
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
}



function draw() {
    colorMode(RGB,255);
    createCanvas(windowWidth,windowHeight);

    // draw text

    let windowMargins = .1*windowWidth*2;
    let fontSize = windowHeight*0.08;
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
    }

    // interpret audio input
    let myVol = myMic.getLevel(); // returns a float
    

    noStroke();
    let c = color('#ffffff');
    
    for (let i=0; i<myPoints.length;i++) {
        c.setAlpha(myVol*50*255);
        fill(c);
        rectMode(CENTER);
        
        ellipse(myPoints[i].x+100,myPoints[i].y+500,(Math.random()*10)*sin(millis()),10*cos(millis()));


    }

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