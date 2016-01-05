var windowW = 1280;//$('body').width();
var windowH = 728;//$('body').height();

var xGap = windowW / 21;
var yGap = windowH / 21;

var roomW = xGap * 4;
var roomH = yGap * 4;

var rooms = [];
var humans = [];

$('#buildingSvg').svg(
    {onLoad: init}
);

function init(svg) {
    drawBuilding(svg);
    for(var i = 0; i < 16; i++) {
        drawRoom(svg, rooms[i]);
        drawHuman(svg, humans[i]);
    }
    renderCat(svg);
}

function drawBuilding(svg) {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            rooms.push(new Room(xGap + i * (roomW + xGap), yGap + j * (roomH + yGap), "room" + (i+1) + "_" + (j+1)));
            humans.push(new Human(xGap + i * (roomW + xGap) + 120, yGap + j * (roomH + yGap) + 80, "human" + (i+1) + "_" + (j+1)));
        }
    }
}

function Room(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.w = roomW;
    this.h = roomH;
}

function drawRoom(svg, room) {
    var gRoom = svg.group({class: 'room', stroke: 'black', strokeWidth: 1});

    svg.rect(gRoom, room.x, room.y, roomW, roomH, {id: room.id, fill: 'white'});

    var gBar = svg.group(gRoom);
    svg.line(gBar, room.x, room.y + roomH * 0.75, room.x + roomW, room.y + roomH * 0.75);

    var numBar = 22;
    var barGap = roomW / numBar;

    for(var i = 0; i < numBar; i++) {
        svg.line(gBar, room.x + i*barGap, room.y + roomH * 0.75, room.x + i*barGap, room.y + roomH);
    }

    svg.line(gRoom, room.x + 8 * barGap, room.y, room.x + 8 * barGap, room.y + roomH * 0.75);
}

function Human(x, y, id) {
    this.x = x;
    this.y = y;
    this.faceR = 5;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.armLeng = this.bodyH * 0.9;
    this.legLeng = this.bodyH * 0.75;
    this.id = id;
}

function drawHuman(svg, human) {
    var gHuman = svg.group({class: 'human', id: human.id, stroke: 'black', strokeWidth: 1});

    svg.circle(gHuman, human.x, human.y, human.faceR, human.faceR);
    svg.rect(gHuman, human.x - human.faceR, human.y + human.faceR, human.bodyW, human.bodyH);

    var gArm = svg.group(gHuman, {class: 'arm'});
    svg.line(gArm, human.x - human.faceR, human.y + human.faceR, human.x - human.faceR, human.y + human.faceR + human.armLeng, {class: 'left'});
    svg.line(gArm, human.x + human.faceR, human.y + human.faceR, human.x + human.faceR, human.y + human.faceR + human.armLeng, {class: 'right'});

    var gLeg = svg.group(gHuman, {class: 'leg'});
    svg.line(gLeg, human.x - human.faceR, human.y + human.faceR + human.bodyH, human.x - human.faceR, human.y + human.faceR + human.bodyH + human.legLeng, {class: 'left'});
    svg.line(gLeg, human.x + human.faceR, human.y + human.faceR + human.bodyH, human.x + human.faceR, human.y + human.faceR + human.bodyH + human.legLeng, {class: 'right'});
}

function renderCat(svg) {
    var gCat = svg.group();
    svg.rect(gCat, windowW/2, windowH - 30, 10, 20, {fill: 'orange', class:'cat'});

    $(window).mousemove(function(e) {
        if(e.clientY > windowH * 0.9) $('.cat').attr('x', e.clientX);
    });
}