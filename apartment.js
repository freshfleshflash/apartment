var totalW = 1280;//$('body').width();
var totalH = 728;//$('body').height();

var gapW = totalW / 21;
var gapH = totalH / 21;

var roomW = gapW * 4;
var roomH = gapH * 4;
var rooms = [];
var audioW = 90;
var audioH = 40;

var numBar = 22;
var barGap = roomW / numBar;
var bedRoomW = barGap * 8;

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
    drawBars(svg, room)
}


function render3_3(svg) {
    var room = rooms[10];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);

    drawAudio(svg, room.gRoom, new Audio(x + 130, y + 30));
    drawDesk(svg, room.gRoom, x + 130, y + 30 + audioH);

    drawHuman(svg, room.gRoom, new Human(x + 130 + audioW/2, y + 80));

    drawBars(svg, room);
}

function drawDesk(svg, gRoom, x, y) {
    var w = audioW * 1.1;
    var h = roomH - (roomH * 0.75);
    svg.rect(gRoom, x - 5, y, w, h, {stroke: 'black', fill: 'none'});
}

function Audio(x, y) {
    this.x = x;
    this.y = y;
    this.w = audioW;
    this.h = audioH;
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

    var gOuterSpeaker = svg.group(gSpeaker, {class: 'outerSpeaker'});
    var gInnerSpeaker = svg.group(gSpeaker, {class: 'innerSpeaker'});

    svg.circle(gOuterSpeaker, x + speakerW / 2, y + speakerH / 4, outerSpeakerR);
    svg.circle(gInnerSpeaker, x + speakerW / 2, y + speakerH / 4, innerSpeakerR);
    svg.circle(gOuterSpeaker, x + speakerW / 2, y + speakerH - speakerH / 4, outerSpeakerR);
    svg.circle(gInnerSpeaker, x + speakerW / 2, y + speakerH - speakerH / 4, innerSpeakerR);
    svg.circle(gOuterSpeaker, x + w - speakerW / 2, y + speakerH / 4, outerSpeakerR);
    svg.circle(gInnerSpeaker, x + w - speakerW / 2, y + speakerH / 4, innerSpeakerR);
    svg.circle(gOuterSpeaker, x + w - speakerW / 2, y + speakerH - speakerH / 4, outerSpeakerR);
    svg.circle(gInnerSpeaker, x + w - speakerW / 2, y + speakerH - speakerH / 4, innerSpeakerR);

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

    var playW = buttonW * 0.4;
    var playH = playW;
    var playGap = (buttonW - playW) / 2;

    var imgW = buttonW * 0.5;
    var imgH = imgW;
    var imgGap = (buttonW - imgW) / 2;

    extraSvg.append('rect').attr('id', 'playButton').attr('x', buttonX + buttonGapW + 0*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    extraSvg.append('rect').attr('id', 'stopButton').attr('x', buttonX + buttonGapW + 1*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    extraSvg.append('rect').attr('id', 'increaseButton').attr('x', buttonX + buttonGapW + 2*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');
    extraSvg.append('rect').attr('id', 'decreaseButton').attr('x', buttonX + buttonGapW + 3*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'white');

    extraSvg.append('polygon').attr('points', (buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap) + ', ' + (buttonY + playGap) + ' ' + (buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap) + ', ' + (buttonY + playGap + playH) + ' ' + (buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap + playW) + ', ' + (buttonY + playGap + playH/2));
    //extraSvg.append('polygon').attr('points', buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap + ',10 ' +  buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap + ',190 ' +  buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap + ',210');
    extraSvg.append('rect').attr('x', buttonX + buttonGapW + 1*(buttonW + buttonGapW) + playGap).attr('y', buttonY + playGap).attr('width', playW).attr('height', playH);
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + playGap).attr('y1', buttonY + buttonH - playGap).attr('x2', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + buttonW/2).attr('y2', buttonY + playGap)
        .attr('stroke', 'black');
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + buttonW/2).attr('y1', buttonY + imgGap).attr('x2', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + buttonW - imgGap).attr('y2', buttonY + buttonH - imgGap)
        .attr('stroke', 'black');
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + imgGap).attr('y1', buttonY + imgGap).attr('x2', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + buttonW/2).attr('y2', buttonY + buttonH - imgGap)
        .attr('stroke', 'black');
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + buttonW/2).attr('y1', buttonY + buttonH - imgGap).attr('x2', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + buttonW - imgGap).attr('y2', buttonY + imgGap)
        .attr('stroke', 'black');

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

    var frequencyData = new Uint8Array(15);    // max: 1024

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

        var amp = 0;
        for(var i = 0; i < frequencyData.length; i++) {
            amp += frequencyData[i];
        }
        var ampMin = 1100;
        var ampMax = 2200;
        //console.log(amp);

        vSvg.selectAll('rect')
            .data(frequencyData)
            .attr('y', function (d) {
                return h - math_map(d, 0, 255, 0, vH*0.9);
            })
            .attr('height', function (d) {
                return math_map(d, 0, 255, 0, vH*0.9);
            })
            .attr('fill', function (d) {
                return 'hsl(' + math_map(amp, ampMin, ampMax, 120, 0) + ',' + math_map(d, 0, 255, 0, 100) + '%, 50%)';
            });

        var bass = (frequencyData[1]) / 1;

        if(audioOn) {
            $('#room3_3 .human, #room3_3 .human .leftLeg, #room3_3 .human .leftArm, #room3_3 .human .rightLeg, #room3_3 .human .rightArm').css('animation-play-state', 'running');

            $('#room3_3 .human .leftArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, -60)) + ", " + getPivotPos('#room3_3', 'leftUpperArm', 'x1') + ", " + getPivotPos('#room3_3', 'leftUpperArm', 'y1') + ")");
            $('#room3_3 .human .leftLowerArm').attr('transform', "rotate(" + (0+ math_map(bass, 0, 255, 0, -160)) + ", " + getPivotPos('#room3_3', 'leftLowerArm', 'x1') + ", " + getPivotPos('#room3_3', 'leftLowerArm', 'y1') + ")");

            $('#room3_3 .human .rightArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, 60)) + ", " + getPivotPos('#room3_3', 'rightUpperArm', 'x1') + ", " + getPivotPos('#room3_3', 'rightUpperArm', 'y1') + ")");
            $('#room3_3 .human .rightLowerArm').attr('transform', "rotate(" + (0+ math_map(bass, 0, 255, 0, 160)) + ", " + getPivotPos('#room3_3', 'rightLowerArm', 'x1') + ", " + getPivotPos('#room3_3', 'rightLowerArm', 'y1') + ")");

            $('#room3_3 .audio .speaker .outerSpeaker circle').css('transform', 'scale(' + math_map(bass, 0, 255, 0.1, 1.3) +')');
            $('#room3_3 .audio .speaker .innerSpeaker circle').css('transform', 'scale(' + math_map(bass, 0, 255, 0.1, 1.3) +')');
        } else {
            $('#room3_3 .audio .speaker .outerSpeaker circle').css('transform', 'scale(1)');
            $('#room3_3 .audio .speaker .innerSpeaker circle').css('transform', 'scale(1)');
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

    drawBars(svg, room)
}

function drawBroom() {

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

    svg.rect(gRoom, x, y, w, h, {class: 'frame', fill: 'white', strokeWidth: 1});

    //var gBar = svg.group(gRoom, {class: 'bar'});
    //svg.line(gBar, x, y + h * 0.75, x + w, y + h * 0.75);
    //
    //for(var i = 0; i < numBar; i++) {
    //    svg.line(gBar, x + i * barGap, y + h * 0.75, x + i * barGap, y + h);
    //}

    svg.line(gRoom, x + 8 * barGap, y, x + 8 * barGap, y + h * 0.75);

    drawClock(svg, gRoom, x, y);

}

function drawBars(svg, room) {
    var x = room.x;
    var y = room.y;
    var w = room.w;
    var h = room.h;

    var gRoom = room.gRoom;

    var gBar = svg.group(gRoom, {class: 'bar', strokeWidth: 2});
    svg.line(gBar, x, y + h * 0.75, x + w, y + h * 0.75);

    for(var i = 0; i < numBar; i++) {
        svg.line(gBar, x + i * barGap, y + h * 0.75, x + i * barGap, y + h);
    }
}

function drawClock(svg, gRoom, roomX, roomY) {
    var h, m, s;

    var x = roomX + bedRoomW / 2;
    var y = roomY + roomH * 0.2;
    var r = 12;
    var hourHand = r * 0.6;
    var minuteHand = r * 0.75;
    var secondHand = r * 0.8;

    var gClock = svg.group(gRoom, {class: 'clock'});
    svg.circle(gClock, x, y, r, {fill: 'white'});
    svg.line(gClock, x, y, x, y + hourHand, {class: 'hourHand'});
    svg.line(gClock, x, y, x, y + minuteHand, {class: 'minuteHand'});
    svg.line(gClock, x, y, x, y + secondHand, {class: 'secondHand'});

    setInterval(function() {
        h = new Date().getHours() % 12;
        m = new Date().getMinutes();
        s = new Date().getSeconds();
        console.log(h);
        $('.clock .hourHand').css('transform', 'rotate(' + math_map(h, 0, 11, -180, 180) + 'deg)');
        $('.clock .minuteHand').css('transform', 'rotate(' + math_map(m, 0, 59, -180, 180) + 'deg)');
        $('.secondHand').css('transform', 'rotate(' + math_map(s, 0, 59, -180, 180) + 'deg)');
    }, 100);
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

    var gHuman = svg.group(gRoom, {class: 'human', stroke: 'black', strokeWidth: 1, fill: 'white'});

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