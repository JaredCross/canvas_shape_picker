
var colorInput = document.querySelector('#color');
var rectangleArray = [];
var circleArray = [];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var heightInput = document.querySelector('#height');
var widthInput = document.querySelector('#width');
var canvasCoords = document.querySelector('#canvas');
var shapeSelect = document.querySelector('.shape');



function Shape(x, y, color) {
  this.color = color;
  this.x = x;
  this.y = y;
}

function Rectangle(height, width, x, y, color) {
  Shape.call(this, x , y, color);
  this.height = height;
  this.width = width;
  rectangleArray.push(this);
}

Rectangle.prototype = new Shape();
Rectangle.prototype.constructor = Rectangle;

function Circle(height, x, y, color) {
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
  circleArray.push(this);
}

Circle.prototype= new Shape();
Circle.prototype.constructor = Circle;

function drawR() {
  if (canvas.getContext) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.height, rect.width);
  }
}

function drawC() {

  if (canvas.getContext) {

    ctx.beginPath();
      ctx.arc(circ.x, circ.y, circ.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = circ.color;
      ctx.fill();
  }
}



canvasCoords.addEventListener('click', function () {
  var x = event.x;
  var y = event.y;
  var colorInput = document.querySelector('#color');
  var color = colorInput.value;

  if(shapeSelect.value === 'rectangle') {
    x = x - (heightInput.value/2);
    y = y - (widthInput.value/2);
    rect = new Rectangle(heightInput.value, widthInput.value, x, y, color);
    drawR();
  } else if(shapeSelect.value === 'circle') {
    circ = new Circle(heightInput.value, x, y, color);
    drawC();
  } else if (shapeSelect.value === 'animCircle') {
      circ = new AnimCircle(heightInput.value, x, y, color);
      drawC();
  }

});

var eraseRect = document.querySelector('#eraseRect');
eraseRect.addEventListener('click', function () {
  rectangleArray.forEach(function (r) {

    if (canvas.getContext) {

      ctx.clearRect(r.x, r.y, r.height, r.width);
    }
  });

  circleArray.forEach(function (c) {

    if (canvas.getContext) {

      ctx.beginPath();
        ctx.arc(c.x, c.y, (c.radius), 0, 2 * Math.PI, false);
        ctx.fillStyle = c.color;
        ctx.fill();
    }
  });

  rectangleArray=[];

});

var eraseCirc = document.querySelector('#eraseCirc');
eraseCirc.addEventListener('click', function () {
  circleArray.forEach(function (c) {

    if (canvas.getContext) {

      ctx.beginPath();
        ctx.arc(c.x, c.y, (c.radius + 0.6), 0, 2 * Math.PI, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
  });

  rectangleArray.forEach(function (r) {

    if (canvas.getContext) {

      ctx.fillStyle = r.color;
      ctx.fillRect(r.x, r.y, r.height, r.width);
    }
  });
  circleArray=[];

});

var randColor = function() {
    return Math.round(Math.random() * 255);

};

var randCoord = function () {
  return Math.round(Math.random() * 600);
};

var randSize = function () {
  return Math.round(Math.random() * 200);
};

var randShapes = document.querySelector("#randShapes");
randShapes.addEventListener('click', function () {
  for(var i = 0; i < 10; i++) {
    var randomColor = 'rgb('+randColor()+','+randColor()+','+randColor()+')';
    if(randCoord() % 2 === 0) {
      rect = new Rectangle(randSize(), randSize(), randCoord(), randCoord(), randomColor);
      drawR();
    } else {
      circ = new Circle(randSize(), randCoord(), randCoord(), randomColor);
      drawC();
    }
  }
  console.log('*******************');
  console.log(rectangleArray.length);
  console.log(circleArray.length);
  console.log('*******************');
});

// var allShapesColored = document.querySelector('#shapeColors');
// allShapesColored.addEventListener('click', function () {
//   circleArray.forEach(function (c) {
//
//     if (canvas.getContext) {
//       ctx.beginPath();
//         ctx.arc(c.x, c.y, (c.radius + 0.6), 0, 2 * Math.PI, false);
//         ctx.fillStyle = colorInput.value;
//         ctx.fill();
//     }
//   });
//
//   rectangleArray.forEach(function (r) {
//     if (canvas.getContext) {
//       var ctx = canvas.getContext('2d');
//       ctx.fillStyle = colorInput.value;
//       ctx.fillRect(r.x, r.y, r.height, r.width);
//     }
//   });
// });
