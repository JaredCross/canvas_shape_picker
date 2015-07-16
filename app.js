
var colorInput = document.querySelector('#color');
var color = colorInput.value;
var rectangleArray = [];
var circleArray = [];

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
  circleArray.push(this);
}

Circle.prototype= new Shape();
Circle.prototype.constructor = Circle;

function drawR() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.height, rect.width);
  }
}

function drawC() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
      ctx.arc(circ.x, circ.y, circ.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = circ.color;
      ctx.fill();
  }
}


var heightInput = document.querySelector('#height');
var widthInput = document.querySelector('#width');
var canvasCoords = document.querySelector('#canvas');
var wantRect = document.querySelector('#wantRect');
var wantCirc = document.querySelector('#wantCirc');

var rectButton = document.getElementById('rect');
rectButton.addEventListener("click", function () {
  wantRect.value = 'rect';
  wantCirc.value = '';
});

var circButton = document.getElementById('circ');
circButton.addEventListener("click", function () {
  wantCirc.value = 'circ';
  wantRect.value = '';
});

canvasCoords.addEventListener('click', function () {
  var x = event.x;
  var y = event.y;
  var colorInput = document.querySelector('#color');
  var color = colorInput.value;

  if(wantRect.value === 'rect') {
    x = x - (heightInput.value/2);
    y = y - (widthInput.value/2);
    rect = new Rectangle(heightInput.value, widthInput.value, x, y, color);
    drawR();
  } else if(wantCirc.value === 'circ') {
    circ = new Circle(heightInput.value, x, y, color);
    drawC();
  }

});

var eraseRect = document.querySelector('#eraseRect');
eraseRect.addEventListener('click', function () {
  rectangleArray.forEach(function (r) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(r.x, r.y, r.height, r.width);
    }
  });

  circleArray.forEach(function (c) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
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
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
        ctx.arc(c.x, c.y, (c.radius + 0.6), 0, 2 * Math.PI, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
  });

  rectangleArray.forEach(function (r) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
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
  for(var i = 0; i < 150; i++) {
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

var allShapesColored = document.querySelector('#shapeColors');
allShapesColored.addEventListener('click', function () {
  circleArray.forEach(function (c) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
        ctx.arc(c.x, c.y, (c.radius + 0.6), 0, 2 * Math.PI, false);
        ctx.fillStyle = colorInput.value;
        ctx.fill();
    }
  });

  rectangleArray.forEach(function (r) {
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = colorInput.value;
      ctx.fillRect(r.x, r.y, r.height, r.width);
    }
  });
});
