var totalW = 1280;//$('body').width();
var totalH = 728;//$('body').height();

var xGap = totalW / 21;
var yGap = totalH / 21;

var roomW = xGap * 4;
var roomH = yGap * 4;

var rooms = [];

$('#buildingSvg').svg(
    {onLoad: init}
);

function init(svg) {
    drawBuilding(svg);
    renderRooms(svg);
    renderOthers(svg);
}

function renderRooms(svg) {
    //...
    render1_1(svg);
    render3_2(svg);
    render3_3(svg);
    //  ...
}

function renderOthers(svg) {
    renderCat(svg);
}

function drawBuilding(svg) {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            var gRoom = svg.group({class: 'room', id: 'room' + (i+1) + '_' + (j+1), stroke: 'black', strokeWidth: 1});
            rooms.push(new Room(xGap + i * (roomW + xGap), yGap + j * (roomH + yGap), gRoom));
        }
    }
}

function render1_1(svg) {
    var room = rooms[0];

    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render3_2(svg) {
    var room = rooms[9];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render3_3(svg) {
    var room = rooms[10];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x, y));

    drawAudio(svg, room.gRoom, new Audio(x + 120, y + 15));
}

function Audio(x, y) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 40;
}

function drawAudio(svg, gRoom, audio) {
    var x = audio.x;
    var y = audio.y;
    var w = audio.w;
    var h = audio.h;

    var gAudio = svg.group(gRoom, {class: 'audio', stroke: 'black', fill: 'white'});
    svg.rect(gAudio, x, y, w, h);

    var gSpeaker = svg.group(gAudio, {class: 'speaker'});
    var speakerW = w * 0.25;
    var speakerH = h;
    svg.rect(gSpeaker, x, y, speakerW, speakerH);
    svg.rect(gSpeaker, x + w - speakerW, y, speakerW, speakerH);
    var outerSpeakerR = speakerW * 0.35;
    var innerSpeakerR = outerSpeakerR * 0.6;
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH / 4, innerSpeakerR);
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH - speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH - speakerH / 4, innerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH / 4, innerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH - speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH - speakerH / 4, innerSpeakerR);

    var gVis = svg.group(gAudio);
    var visWindowW = w * 0.4;
    var visWindowH = h * 0.4;
    var visGapH = (h / 2 - visWindowH) / 2;

    svg.rect(gVis, x + w / 2 - visWindowW / 2, y + visGapH, visWindowW, visWindowH);
}







function Room(x, y, gRoom) {
    this.x = x;
    this.y = y;
    this.w = roomW;
    this.h = roomH;
    this.gRoom = gRoom;
}

function drawRoom(svg, room) {
    var x = room.x;
    var y = room.y;
    var w = room.w;
    var h = room.h;

    var gRoom = room.gRoom;

    svg.rect(gRoom, x, y, w, h, {class: 'frame', fill: 'white'});

    var gBar = svg.group(gRoom, {class: 'bar'});
    svg.line(gBar, x, y + h * 0.75, x + w, y + h * 0.75);

    var numBar = 22;
    var barGap = w / numBar;

    for(var i = 0; i < numBar; i++) {
        svg.line(gBar, x + i * barGap, y + h * 0.75, x + i * barGap, y + h);
    }

    svg.line(gRoom, x + 8 * barGap, y, x + 8 * barGap, y + h * 0.75);
}

function Human(x, y) {
    this.x = x;
    this.y = y;
    this.faceR = 5;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.armLeng = this.bodyH * 0.9;
    this.legLeng = this.bodyH * 0.75;
}

function drawHuman(svg, gRoom, human) {
    var gHuman = svg.group(gRoom, {class: 'human', stroke: 'black', strokeWidth: 3});

    var gBody = svg.group(gHuman, {class: 'body'});
    svg.rect(gBody, human.x - human.faceR, human.y + human.faceR, human.bodyW, human.bodyH);
    svg.circle(gBody, human.x, human.y, human.faceR, human.faceR);

    var gLeftUpperArm = svg.group(gBody, {class: 'leftUpperArm', stroke: 'red'});
    var gLeftLowerArm = svg.group(gLeftUpperArm, {class: 'leftLowerArm', stroke: 'orange'});

    svg.line(gLeftUpperArm, human.x - human.faceR, human.y + human.faceR, human.x - human.faceR, human.y + human.faceR + human.armLeng/2);
    svg.line(gLeftLowerArm, human.x - human.faceR, human.y + human.faceR + human.armLeng/2, human.x - human.faceR, human.y + human.faceR + human.armLeng);

    var gRightArm = svg.group(gBody, {class: 'rightArm'});

    var gLeg = svg.group(gHuman, {class: 'leg'});
    svg.line(gLeg, human.x - human.faceR, human.y + human.faceR + human.bodyH, human.x - human.faceR, human.y + human.faceR + human.bodyH + human.legLeng, {class: 'left'});
    svg.line(gLeg, human.x + human.faceR, human.y + human.faceR + human.bodyH, human.x + human.faceR, human.y + human.faceR + human.bodyH + human.legLeng, {class: 'right'});
}









//room #3_3
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('sound');
var audioSource = audioContext.createMediaElementSource(audioElement);
var analyser = audioContext.createAnalyser();

audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

var frequencyData = new Uint8Array(10);    // max: 1024

var room = $('#room3_3 .frame');
var roomX = Number(room.attr('x')) + 100;
var roomY = Number(room.attr('y'));
var roomW = Number(room.attr('width'));
var roomH = Number(room.attr('height'));

var vW = roomW * 0.4;
var vH;
var barPadding = 1;

var vSvg = createSvg();

renderVis();

function createSvg() {
    return d3.select('.audio')
        .append('svg')
        .attr('x', roomX)
        .attr('y', roomY - (totalH - roomH) - roomH/2)
        .attr('width', totalW)
        .attr('height', totalH)
        .attr('id', 'audioSvg');
}

vSvg.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return i * (vW / frequencyData.length);
    })
    .attr('width', vW / frequencyData.length - barPadding)
    .attr('class', 'vBar');

function renderVis() {
    requestAnimationFrame(renderVis);

    analyser.getByteFrequencyData(frequencyData);

    vSvg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
            return totalH - d * 0.5;
        })
        .attr('height', function(d) {
            return d * 0.5;
        })
        .attr('fill', function(d) {
            return 'rgb(0, 0, ' + d + ')';
        });

    var bass = (frequencyData[2]) / 1;

    $('#room3_3 .human .leftUpperArm').css('transform', 'rotate(' + (90 - math_map(bass, 0, 255, 0, 150)) + 'deg)');
    //$('#room3_3 .human .leftLowerArm').css('transform', 'rotate(' + (90 - math_map(bass, 0, 255, 0, 150)) + 'deg)');

}

function math_map(value, input_min, input_max, output_min, output_max) {
    return output_min + (output_max - output_min) * (value - input_min) / (input_max - input_min);
}








function renderCat(svg) {
    var gCat = svg.group({class: 'cat'});
    svg.rect(gCat, totalW/2, totalH - 30, 10, 20, {fill: 'orange'});

    $(window).mousemove(function(e) {
        if(e.clientY > totalH * 0.9) $('.cat').attr('x', e.clientX);
    });
}