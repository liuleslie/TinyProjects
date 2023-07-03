let mytxt = "";

let capture, tracker;
let w, h;

let c
let s

let randW;
let randH;


function setup() {
  // var myCan = createCanvas(window.innerWidth,window.innerHeight);
  var myCan = createCanvas(400,400);
  myCan.parent('p5Container')

  randW = Math.floor(Math.random()*(w*0.50));
  randH = Math.floor(Math.random()*(h*0.50));

  // setup the webcam capture
  capture = createCapture(VIDEO);
  capture.hide();
  capture.size(w,h);
  
  // setup the face tracker
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

 
}

function draw() {
  frameRate(12);
  scale(-1*(randW/w),randH/h);
  //scale(-1, 1);
  translate(-w, 0);
  image(capture, 0, 0, w, h)
  
  // get the face positions from the tracker
  let positions = tracker.getCurrentPosition();
  
  if(positions.length>0) {
    fill('white');
    noStroke();
    
    // dist(x1, y1, x2, y2)
    let eyeDist = dist(positions[27][0],positions[32][0],positions[27][1],positions[32][1]);
    
    let textSizeMult = eyeDist/80;
    let em = 36;
    let txtSz = em*textSizeMult;
    
    push();
    scale(-1,1);
    translate(-w,0);
    
    textSize(txtSz);
    text("友谊万岁",positions[27][0],positions[27][1]);
    pop();
  }
  
  
  
}


