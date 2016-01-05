var w = 1280;//$('body').width();
var h = 728;//$('body').height();

var xGap = w / 21;
var yGap = h / 21;

var roomW = xGap * 4;
var roomH = yGap * 4;

var humans = [];

$('#buildingSVG').svg(
    {onLoad: init}
);

function init(svg) {
    drawBuilding(svg);
    for(var i = 0; i < 16; i++) {
        drawHuman(svg, humans[i]);
    }
}

function drawBuilding(svg) {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            drawRoom(svg, "room" + (i+1) + "_" + (j+1), xGap + i * (roomW + xGap), yGap + j * (roomH + yGap));
            humans.push(new Human(xGap + i * (roomW + xGap) + 120, yGap + j * (roomH + yGap) + 80));
        }
    }
}

function drawRoom(svg, id, x, y) {
    svg.rect(x, y, roomW, roomH,
        {id: id, fill: 'white', stroke: 'black', strokeWidth: 1}
    );

    svg.line(x, y + roomH*0.75, x + roomW, y + roomH*0.75, {stroke: 'black', strokeWidth: 1});

    var numBar = 22;
    var barGap = roomW / numBar;

    for(var i = 0; i < numBar; i++) {
        svg.line(x + i*barGap, y + roomH * 0.75, x + i*barGap, y + roomH, {stroke: 'black', strokeWidth: 1});
    }

    svg.line(x + 8*barGap, y, x + 8*barGap, y + roomH * 0.75, {stroke: 'black', strokeWidth: 1});
}

function Human(x, y) {
    this.x = x;
    this.y = y;
    this.faceR = 5;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.legH = this.bodyH * 0.75;
}

function drawHuman(svg, h) {
    svg.circle(h.x, h.y, h.faceR, h.faceR);
    svg.rect(h.x - h.faceR, h.y + h.faceR, h.bodyW, h.bodyH);
}

(function() {
    //$('.bar').attr('stroke', 'red');
})();