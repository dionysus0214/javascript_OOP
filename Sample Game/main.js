var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var imgDino = new Image();
imgDino.src = 'dinosaur.png';

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(imgDino, this.x, this.y)
  }
}

var imgCactus = new Image();
imgCactus.src = 'cactus.png';

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(imgCactus, this.x, this.y)
  }
}

var timer = 0;
var cacti = [];
var jumpTimer = 0;
var animation;

function runFrame() {
  animation = requestAnimationFrame(runFrame);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0) {
    var cactus = new Cactus();
    cacti.push(cactus);
  }
  cacti.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x -= 3;
    clash(dino, a);
    a.draw();
  })

  if (jumping == true) {
    dino.y -= 3 ;
    jumpTimer += 3;
  }
  if (jumping == false) {
    if (dino.y < 200) {
      dino.y += 3;
    }
  }
  if (jumpTimer > 100) {
    jumping = false;
    jumpTimer = 0;
  }
  dino.draw();
}

runFrame();

function clash(dino, cactus) {
  var xDiff = cactus.x - (dino.x + dino.width);
  var yDiff = cactus.y - (dino.y + dino.height);
  if (xDiff < 0 && yDiff < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

var jumping = false;
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    jumping = true;
  }
})