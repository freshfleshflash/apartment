var totalW = 1280;//$('body').width();
var totalH = 728;//$('body').height();

var gapW = totalW / 21;
var gapH = totalH / 21;

var roomW = gapW * 4;
var roomH = gapH * 4;
var rooms = [];

var numBar = 22;
var barGap = roomW / numBar;

var audioOn = false;

var extraSvg = d3.select('body')
    .append('svg')
    .attr('id', 'extraSvg')
    .attr('width', totalW)
    .attr('height', totalH);

$('#totalSvg').svg(
    {onLoad: init}
);

function init(svg) {
    drawBuilding(svg);
    renderRooms(svg);
    renderOthers(svg);

    var myrect = svg.rect(25, 25, 150, '25%', 10, 10, {fill: 'none', stroke: 'blue', strokeWidth: 3, transform: 'rotate(0, 100, 75)'});

    $(myrect).animate({svgWidth: 200, svgHeight: '30%', svgStroke: 'aqua', svgTransform: 'rotate(60, 0, 0)'}, 2000);
}

function renderRooms(svg) {
    render1_1(svg);
    render1_2(svg);
    render1_3(svg);
    render1_4(svg);
    render2_1(svg);
    render2_2(svg);
    render2_3(svg);
    render2_4(svg);
    render3_1(svg);
    render3_2(svg);
    render3_3(svg);
    render3_4(svg);
    render4_1(svg);
    render4_2(svg);
    render4_3(svg);
    render4_4(svg);
}

function renderOthers(svg) {
    renderCat(svg);
}

function drawBuilding(svg) {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            var gRoom = svg.group({class: 'room', id: 'room' + (i+1) + '_' + (j+1), stroke: 'black', strokeWidth: 1});
            rooms.push(new Room(gapW + i * (roomW + gapW), gapH + j * (roomH + gapH), gRoom));
        }
    }
}

function render1_1(svg) {
    var room = rooms[0];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render1_2(svg) {
    var room = rooms[1];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render1_3(svg) {
    var room = rooms[2];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render1_4(svg) {
    var room = rooms[3];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_1(svg) {
    var room = rooms[4];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_2(svg) {
    var room = rooms[5];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_3(svg) {
    var room = rooms[6];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_4(svg) {
    var room = rooms[7];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render3_1(svg) {
    var room = rooms[8];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render3_2(svg) {
    var room = rooms[9];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x, y + 80));
}


function render3_3(svg) {
    var room = rooms[10];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + roomW/2, y + 80));

    drawAudio(svg, room.gRoom, new Audio(x + 120, y + 15));
}

function Audio(x, y) {
    this.x = x;
    this.y = y;
    this.w = 90;
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
    var speakerW = w * 0.2;
    var speakerH = h;
    svg.rect(gSpeaker, x, y, speakerW, speakerH);
    svg.rect(gSpeaker, x + w - speakerW, y, speakerW, speakerH);
    var outerSpeakerR = speakerW * 0.4;
    var innerSpeakerR = outerSpeakerR * 0.6;
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH / 4, innerSpeakerR);
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH - speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + speakerW / 2, y + speakerH - speakerH / 4, innerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH / 4, innerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH - speakerH / 4, outerSpeakerR);
    svg.circle(gSpeaker, x + w - speakerW / 2, y + speakerH - speakerH / 4, innerSpeakerR);

    var gVis = svg.group(gAudio, {class: 'vis'});
    var visWindowW = (w - speakerW * 2) * 0.85;
    var visWindowH = h * 0.6;
    var visGapH = h * 0.08;
    var visWindowX = x + w / 2 - visWindowW / 2;
    var visWindowY = y + visGapH;
    svg.rect(gVis, visWindowX, visWindowY, visWindowW, visWindowH);

    var gButton = svg.group(gAudio, {class: 'button'});
    var buttonH = h * 0.15;
    var buttonW = buttonH;
    var buttonGapW = (visWindowW - buttonW*4) / 5;
    var buttonGapH = (h - (visWindowH + visGapH)) / 2;
    var buttonX = x + speakerW + (w - speakerW*2 - visWindowW)/2;
    var buttonY = y + visGapH + visWindowH + buttonGapH - buttonH/2;

    extraSvg.append('rect').attr('id', 'playButton').attr('x', buttonX + buttonGapW + 0*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    extraSvg.append('rect').attr('id', 'stopButton').attr('x', buttonX + buttonGapW + 1*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    extraSvg.append('rect').attr('id', 'increaseButton').attr('x', buttonX + buttonGapW + 2*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    extraSvg.append('rect').attr('id', 'decreaseButton').attr('x', buttonX + buttonGapW + 3*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    //extraSvg.append('polygon').attr('points', '200,10 250,190 200,210');

    connectAudio(visWindowX, visWindowY, visWindowW, visWindowH);
}

function connectAudio(x, y, w, h) {
    $('#playButton').click(function() {
        $('#sound')[0].play();
        audioOn = true;
    });

    $('#stopButton').click(function() {
        $('#sound')[0].pause();
        audioOn = false;
    });

    $('#increaseButton').click(function() {
        $('#sound')[0].volume += 0.1;
    });

    $('#decreaseButton').click(function() {
        $('#sound')[0].volume -= 0.1;
    });

    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('sound');
    var audioSource = audioContext.createMediaElementSource(audioElement);
    var analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);
    audioSource.connect(audioContext.destination);

    var frequencyData = new Uint8Array(10);    // max: 1024

    var vW = w;
    var vH = h;
    var barPadding = 0;
    var vSvg = createSvg();

    renderVis();

    function createSvg() {
        return d3.select('#room3_3 .audio .vis')
            .append('svg')
            .attr('x', x)
            .attr('y', y)
            .attr('width', w)
            .attr('height', h)
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
            .attr('y', function (d) {
                return h - d * 0.05;
            })
            .attr('height', function (d) {
                return d * 0.05;
            })
            .attr('fill', function (d) {
                return 'rgb(0, ' + d + ', 0)';
            });

        var bass = (frequencyData[1]) / 1;

        if(audioOn) {
            $('#room3_3 .human .leftArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, -60)) + ", " + getPivotPos('#room3_3', 'leftUpperArm', 'x1') + ", " + getPivotPos('#room3_3', 'leftUpperArm', 'y1') + ")");
            $('#room3_3 .human .leftLowerArm').attr('transform', "rotate(" + (0+ math_map(bass, 0, 255, 0, -160)) + ", " + getPivotPos('#room3_3', 'leftLowerArm', 'x1') + ", " + getPivotPos('#room3_3', 'leftLowerArm', 'y1') + ")");

            $('#room3_3 .human .rightArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, 60)) + ", " + getPivotPos('#room3_3', 'rightUpperArm', 'x1') + ", " + getPivotPos('#room3_3', 'rightUpperArm', 'y1') + ")");
            $('#room3_3 .human .rightLowerArm').attr('transform', "rotate(" + (0+ math_map(bass, 0, 255, 0, 160)) + ", " + getPivotPos('#room3_3', 'rightLowerArm', 'x1') + ", " + getPivotPos('#room3_3', 'rightLowerArm', 'y1') + ")");
        }
    }
}

function getPivotPos(room, bodyParts, point) {
    return $(room + ' .human .' + bodyParts).attr(point);
}

function render3_4(svg) {
    var room = rooms[11];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 130, y + 80));

    //$('#room3_4 .human').css('transform', "rotate(5deg)");
}

function render4_1(svg) {
    var room = rooms[12];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render4_2(svg) {
    var room = rooms[13];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render4_3(svg) {
    var room = rooms[14];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render4_4(svg) {
    var room = rooms[15];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    //drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
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

    for(var i = 0; i < numBar; i++) {
        svg.line(gBar, x + i * barGap, y + h * 0.75, x + i * barGap, y + h);
    }

    svg.line(gRoom, x + 8 * barGap, y, x + 8 * barGap, y + h * 0.75);
}

function Human(x, y) {
    this.x = x;
    this.y = y;
    this.faceR = 7;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.armLeng = this.bodyH * 0.9;
    this.legLeng = this.bodyH * 0.75;
}

function drawHuman(svg, gRoom, human) {
    var x = human.x;
    var y = human.y;
    var faceR = human.faceR;
    var bodyW = human.bodyW;
    var bodyH = human.bodyH;
    var armLeng = human.armLeng;
    var legLeng = human.legLeng;

    var gHuman = svg.group(gRoom, {class: 'human', stroke: 'red', strokeWidth: 1});

    var gBody = svg.group(gHuman, {class: 'body'});
    svg.rect(gBody, x - faceR, y + faceR, bodyW, bodyH);
    svg.circle(gBody, x, y, faceR, faceR);

    var gLeftArm = svg.group(gBody, {class: 'leftArm'});
    var gLeftUpperArm = svg.group(gLeftArm);
    var gLeftLowerArm = svg.group(gLeftUpperArm);
    svg.line(gLeftUpperArm, x - faceR, y + faceR, x - faceR, y + faceR + armLeng/2, {class: 'leftUpperArm'});
    svg.line(gLeftLowerArm, x - faceR, y + faceR + armLeng/2, x - faceR, y + faceR + armLeng, {class: 'leftLowerArm'});

    var gRightArm = svg.group(gBody, {class: 'rightArm'});
    var gRightUpperArm = svg.group(gRightArm);
    var gRightLowerArm = svg.group(gRightUpperArm);
    svg.line(gRightUpperArm, x + faceR, y + faceR, x + faceR, y + faceR + armLeng/2, {class: 'rightUpperArm'});
    svg.line(gRightLowerArm, x + faceR, y + faceR + armLeng/2, x + faceR, y + faceR + armLeng, {class: 'rightLowerArm'});

    var gLeftLeg = svg.group(gHuman);
    svg.line(gLeftLeg, x - faceR, y + faceR + bodyH, x - faceR, y + faceR + bodyH + legLeng, {class: 'leftLeg'});

    var gRightLeg = svg.group(gHuman, {class: 'rightLeg'});
    svg.line(gRightLeg, x + faceR, y + faceR + bodyH, x + faceR, y + faceR + bodyH + legLeng);
}

function renderCat(svg) {
    var gCat = svg.group({class: 'cat'});
    svg.rect(gCat, totalW/2, totalH - 30, 10, 20, {class:'body', fill: 'orange'});

    $(window).mousemove(function(e) {
        if(e.clientY > totalH * 0.9) $('.cat .body').attr('x', e.clientX);
    });

    $(window).click(function(e) {
        console.log(e.clientX, e.clientY);
    });
}

function math_map(value, input_min, input_max, output_min, output_max) {
    return output_min + (output_max - output_min) * (value - input_min) / (input_max - input_min);
}