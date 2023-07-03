
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

// let myMic;
var mic;

function setup() {
    noCanvas();
    // speech recognition
    let lang = navigator.language || 'en-US'; // check language
    speechRec = new p5.SpeechRec(lang,gotSpeech);
    speechRec.continuous = true; // keep listening
    speechRec.interim = false; // doesnt quite work when true
    speechRec.start(); // start listening 
    speechRec.onEnd = restart;
    
    function gotSpeech() {
        if (speechRec.resultValue) {
            mic = new p5.AudioIn();
            mic.start();
            document.getElementById('speech').innerHTML = speechRec.resultString;
            // document.getElementById('speech').style.fontSize = 
        }
    }
    function restart(){
        speechRec.start();
    }
}

function draw() {
    
}

/*
https://stackoverflow.com/questions/68192821/cannot-get-mic-input-in-p5-js
*/