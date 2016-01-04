var w = $('body').width();
var h = $('body').height();

var canvas = $('#canvas')[0];
var context = canvas.getContext('2d');
canvas.width = $('body').width();
canvas.height = $('body').height();

var xGap = w / 21;
var yGap = h / 21;

var roomW = xGap * 4;
var roomH = yGap * 4;

var humans = [];

$(document).ready(function() {
    document.getElementById('audio').play();
    drawBuilding();

    for(var i = 0; i < 16; i++) {
        humans[i].drawHuman();
    }
});

function drawBuilding() {
    context.beginPath();
    context.rect(0, 0, w, h);
    context.fillStyle = '#c8c8c8';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            drawRoom(xGap + i * (roomW + xGap), yGap + j * (roomH + yGap));
            humans.push(new Human(xGap + i * (roomW + xGap) + 120, yGap + j * (roomH + yGap) + 80));
        }
    }
}

function drawRoom(x, y) {
    context.beginPath();
    context.rect(x, y, roomW, roomH);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.moveTo(x, y + roomH * 0.75);
    context.lineTo(x + roomW, y + roomH * 0.75);
    context.stroke();

    var numBar = 22;
    var barGap = roomW / numBar;

    for(var i = 0; i < numBar; i++) {
        context.beginPath();
        context.moveTo(x + i*barGap, y + roomH * 0.75);
        context.lineTo(x + i*barGap, y + roomH);
        context.stroke();
    }

    context.beginPath();
    context.moveTo(x + 8*barGap, y);
    context.lineTo(x + 8*barGap, y + roomH * 0.75);
    context.stroke();
}

function moveCat() {
    $(document).mousemove(function(e) {
        //console.log(e.clientX, e.clientY);
    });
}

function Human(x, y) {
    this.x = x;
    this.y = y;
    this.faceR = 5;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.legH = this.bodyH * 0.75;
}

Human.prototype.drawHuman = function() {
    //face
    context.beginPath();
    context.arc(this.x, this.y, this.faceR, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    //body
    context.beginPath();
    context.rect(this.x - this.faceR, this.y + this.faceR, this.bodyW, this.bodyH);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    //legs
    context.beginPath();
    context.moveTo(this.x - this.faceR, this.y + this.faceR + this.bodyH);
    context.lineTo(this.x - this.faceR, this.y + this.faceR + this.bodyH + this.legH);
    context.moveTo(this.x + this.faceR, this.y + this.faceR + this.bodyH);
    context.lineTo(this.x + this.faceR, this.y + this.faceR + this.bodyH + this.legH);
    context.stroke();
}