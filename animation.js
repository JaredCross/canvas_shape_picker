var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame ||
                           window.mozCancelAnimationFrame ||
                           window.webkitCancelAnimationFrame;

var myReq;

var animCircleArray = [];


function AnimCircle(height, x, y, color) {
  Shape.call(this, x, y, color);
  this.radius = (height/2);
  this.speed = (25/height + 0.5);
  this.counter = 0;

  var signRand = Math.floor(Math.random() * 2) + 1;

  if (signRand === 1) {
    this.sign = 1;
  } else {
    this.sign = -1;
  }

    animCircleArray.push(this);
    drawAndUpdate();
}

Circle.prototype= new Shape();
AnimCircle.prototype.constructor = AnimCircle;


AnimCircle.prototype.update = function () {
    var newX = this.x + this.counter*this.speed;
    var newY = (this.y) + this.counter*this.speed;
    ctx.beginPath();
    var direction;


    if (newX - this.radius*2 < 0) {
      this.sign *= -1;
      newX = (this.x + 2);
      newY = this.y + this.counter*this.speed;
      direction = 'thisWay';
    }

    if (direction) {
      this.sign *= -1;
      newX = (this.x + 25 + this.counter*this.speed) *-1;
      newY = this.y + this.counter*this.speed;
    }

    if (newX + this.radius*2 > 600) {
      this.sign *=-1;
    }

    if (newY + this.radius*2 > 600) {
      this.sign *= -1;
    }

    if (newY - this.radius*2 < 0) {
      this.sign *= -1;

    }


    this.counter += 1 * this.sign;
    ctx.arc(newX,
                    newY,
                    this.radius*2,
                    0,
                    Math.PI * 2,
                    false);


    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();
};

function drawAndUpdate() {
    ctx.clearRect(0, 0, 600, 600);

    for (var i = 0; i < animCircleArray.length; i++) {

        var myCircle = animCircleArray[i];
        myCircle.update();
    }

    // requestAnimationFrame(drawAndUpdate);
    myReq = requestAnimationFrame(drawAndUpdate);
}
