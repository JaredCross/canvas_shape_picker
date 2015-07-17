var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

var animCircleArray = [];

function AnimCircle(height, x, y, color) {
  Shape.call(this, x, y, color);
  this.radius = (height/2);
  this.speed = 2;
  this.counter = 0;

  var signHelper = Math.floor(Math.random() * 2);

  if (signHelper == 1) {
    this.sign = -1;
  } else {
      this.sign = 1;
  }
    animCircleArray.push(this);
    drawAndUpdate();
}

Circle.prototype= new Shape();
AnimCircle.prototype.constructor = AnimCircle;


AnimCircle.prototype.update = function () {
    this.counter += this.sign * this.speed;

    ctx.beginPath();
    ctx.arc(this.x + Math.cos(this.counter / 100) * this.radius,
                    this.y + Math.sin(this.counter / 100) * this.radius,
                    this.radius*2,
                    0,
                    Math.PI * 2,
                    false);

    ctx.closePath();

    ctx.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
    ctx.fill();
};

function drawAndUpdate() {
    ctx.clearRect(0, 0, 600, 600);

    for (var i = 0; i < animCircleArray.length; i++) {

        var myCircle = animCircleArray[i];
        myCircle.update();
    }

    requestAnimationFrame(drawAndUpdate);
}
