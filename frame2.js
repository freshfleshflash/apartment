var w = $('body').width();
var h = $('body').height();

var xGap = w / 21;
var yGap = h / 21;

var roomW = xGap * 4;
var roomH = yGap * 4;

$('#svg').svg(
    {onLoad: initDrawing}
);

function initDrawing(svg) {
    drawBuilding(svg);
}

function drawBuilding(svg) {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            drawRoom(svg, xGap + i * (roomW + xGap), yGap + j * (roomH + yGap));
        }
    }
}

function drawRoom(svg, x, y) {
    svg.rect(x, y, roomW, roomH,
        {fill: 'white', stroke: 'black', strokeWidth: 1}
    );

    svg.line(x, y + roomH*0.75, x + roomW, y + roomH*0.75, {stroke: 'black', strokeWidth: 1});

    var numBar = 22;
    var barGap = roomW / numBar;

    for(var i = 0; i < numBar; i++) {
        svg.line(x + i*barGap, y + roomH * 0.75, x + i*barGap, y + roomH, {stroke: 'black', strokeWidth: 1});
    }

    svg.line(x + 8*barGap, y, x + 8*barGap, y + roomH * 0.75, {stroke: 'black', strokeWidth: 1});
}