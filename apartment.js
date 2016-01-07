var music = $('#music')[0];

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

var humans = [];

var audioOn = false;

var alarmLevel = 4;
var alarmGroup = [['3_4'], ['3_2', '2_3', '4_3'], ['2_4', '2_2', '4_2', '4_4'], ['1_1', '1_2', '1_3', '1_4', '2_1', '3_1', '4_1']];

var extraSvg = d3.select('body')
    .append('svg')
    .attr('id', 'extraSvg')
    .attr('width', totalW)
    .attr('height', totalH);

$('#totalSvg').svg(
    {onLoad: init}
);

function init(svg) {
    positionRooms(svg);
    drawBasis(svg);
    renderOthers(svg);
}

function renderOthers(svg) {
    renderCat(svg);
}

function positionRooms(svg) {
    for(var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gRoom = svg.group({
                class: 'room',
                id: 'room' + (i + 1) + '_' + (j + 1),
                stroke: 'black',
                strokeWidth: 1
            });
            rooms.push(new Room(gapW + i * (roomW + gapW), gapH + j * (roomH + gapH), gRoom, 'room' + (i + 1) + '_' + (j + 1)));
        }
    }
}

function drawBasis(svg) {
    for(var i = 0; i < rooms.length; i++) {
        drawRoom(svg, rooms[i]);
    }

    makeAlarmGroup();

    drawFurniture(svg);

    for(var i = 0; i < rooms.length; i++) {
        var gHuman = svg.group(rooms[i].gRoom, {class: 'human', fill: 'white'});
        humans.push(new Human(rooms[i], gHuman));
        drawHuman(svg, humans[i]);
        drawBars(svg, rooms[i]);
    }

    drawProps(svg);
}

function drawFurniture(svg) {
    var furniture = {
        room1_1: function(svg, room) {

        },
        room3_3: function(svg, room) {
            drawDesk(svg, room);
            drawAudio(svg, room);
        }
    };

    furniture.room3_3(svg, rooms[10]);
}

function drawProps(svg) {
    var props = {
        room3_4: function(svg, human) {
            drawBroom(svg, human);
        }
    };

    props.room3_4(svg, humans[11]);
}

function drawDesk(svg, room) {
    var x = room.x + 130;
    var y = room.y + 30 + audioH;
    var w = audioW * 1.1;
    var h = roomH - (roomH * 0.75);
    svg.rect(room.gRoom, x - 5, y, w, h, {stroke: 'black', fill: 'none'});
}

function drawAudio(svg, room) {
    var x = room.x + 130;
    var y = room.y + 30;
    var w = audioW;
    var h = audioH;

    var gAudio = svg.group(room.gRoom, {class: 'audio', stroke: 'black', fill: 'none'});
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

    var arrowW = buttonW * 0.5;
    var arrowH = arrowW;
    var arrowGap = (buttonW - arrowW) / 2;

    extraSvg.append('rect').attr('id', 'playButton').attr('x', buttonX + buttonGapW + 0*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'none');
    extraSvg.append('rect').attr('id', 'stopButton').attr('x', buttonX + buttonGapW + 1*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'none');
    extraSvg.append('rect').attr('id', 'increaseButton').attr('x', buttonX + buttonGapW + 2*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'none');
    extraSvg.append('rect').attr('id', 'decreaseButton').attr('x', buttonX + buttonGapW + 3*(buttonW + buttonGapW)).attr('y', buttonY).attr('width', buttonW).attr('height', buttonH).attr('stroke', 'black').attr('fill', 'none');

    extraSvg.append('polygon').attr('points', (buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap) + ', ' + (buttonY + playGap) + ' ' + (buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap) + ', ' + (buttonY + playGap + playH) + ' ' + (buttonX + buttonGapW + 0*(buttonW + buttonGapW) + playGap + playW) + ', ' + (buttonY + playGap + playH/2));
    extraSvg.append('rect').attr('x', buttonX + buttonGapW + 1*(buttonW + buttonGapW) + playGap).attr('y', buttonY + playGap).attr('width', playW).attr('height', playH);
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + playGap).attr('y1', buttonY + buttonH - playGap).attr('x2', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + buttonW/2).attr('y2', buttonY + playGap)
        .attr('stroke', 'black');
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + buttonW/2).attr('y1', buttonY + arrowGap).attr('x2', buttonX + buttonGapW + 2*(buttonW + buttonGapW) + buttonW - arrowGap).attr('y2', buttonY + buttonH - arrowGap)
        .attr('stroke', 'black');
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + arrowGap).attr('y1', buttonY + arrowGap).attr('x2', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + buttonW/2).attr('y2', buttonY + buttonH - arrowGap)
        .attr('stroke', 'black');
    extraSvg.append('line').attr('x1', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + buttonW/2).attr('y1', buttonY + buttonH - arrowGap).attr('x2', buttonX + buttonGapW + 3*(buttonW + buttonGapW) + buttonW - arrowGap).attr('y2', buttonY + arrowGap)
        .attr('stroke', 'black');

    connectAudio(visWindowX, visWindowY, visWindowW, visWindowH);
}

function connectAudio(x, y, w, h) {
    var volumeDeg = 0.01;

    $(window).keypress(function(e) {
        var code = e.which || e.keyCode;

        if(code == 112) {
            music.play();
            music.volume = 0.5;
            audioOn = true;
        }
        if(code == 115) {
            music.pause();
            music.volume = 0.5;
            music.currentTime = 0;
            audioOn = false;
        }
        if(code == 105) {
            if(music.volume <= 1 - volumeDeg) {
                music.volume += volumeDeg;
            }
        }
        if(code == 100) {
            if(music.volume >= volumeDeg*2) {
                music.volume -= volumeDeg;
            }
        }
    });

    $('#playButton').click(function() {
        music.play();
        music.volume = 0.5;
        audioOn = true;
    });

    $('#stopButton').click(function() {
        music.pause();
        music.volume = 0.5;
        music.currentTime = 0;
        audioOn = false;
    });


    $('#increaseButton').click(function() {
        if(music.volume <= 1 - volumeDeg) {
            music.volume += volumeDeg;
        }
        console.log(music.volume);
    });

    $('#decreaseButton').click(function() {
        if(music.volume >= volumeDeg*2) {
            music.volume -= volumeDeg;
        }
        console.log(music.volume);
    });

    $('#music').bind('ended', function() {
        console.log("end");
        music.volume = 0.5;
        audioOn = false;
    });

    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('music');
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
        var ampMin = 1500;
        var ampMax = 3700;

        var volume = music.volume;

        vSvg.selectAll('rect')
            .data(frequencyData)
            .attr('y', function (d) {
                return h - math_map(d, 0, 255, 0, vH*0.9);
            })
            .attr('height', function (d) {
                return math_map(d, 0, 255, 0, vH*0.9);
            })
            .attr('fill', function (d) {
                return 'hsl(' + math_map(volume, 0, 1, 120, 0) + ',' + math_map(d, 0, 255, 0, 100) + '%, 50%)';
            });

        if(audioOn) {
            var bass = (frequencyData[1]) / 1;
            dance(bass, volume);
            checkNoise(volume);
        } else {
            $('.human, #room3_3 .human .leftLeg, #room3_3 .human .rightLeg').css('animation-play-state', 'paused');

            $('#room3_3 .audio .speaker .outerSpeaker circle').css('transform', 'scale(1)');
            $('#room3_3 .audio .speaker .innerSpeaker circle').css('transform', 'scale(1)');
        }
    }
}

function checkNoise(volume) {
    var alarm = Math.floor(math_map(volume, 0.5, 1, 0, 5));

    if(alarm >= 1) {
        controlBubble.on(0);
        if(alarm >= 2) {
            controlBubble.on(1);
            closeEar('a2');
            if(alarm >= 3) {
                controlBubble.on(2);
                closeEar('a3');
                if(alarm >= 4) {
                    controlBubble.on(3);
                    closeEar('a4');
                } else{
                    controlBubble.off(3);
                    openEar('a4');
                }
            } else {
                controlBubble.off(2);
                openEar('a3');
            }
        } else {
            controlBubble.off(1);
            openEar('a2');
        }
    } else {
        controlBubble.off(0);
    }
}

var controlBubble = {
    on: function(groupNum) {
        for(var i = 0; i < alarmGroup[groupNum].length; i++) {
            $('#bubble_room' + alarmGroup[groupNum][i]).css('display', 'block');
        }
    },
    off: function (groupNum) {
        for(var i = 0; i < alarmGroup[groupNum].length; i++) {
            $('#bubble_room' + alarmGroup[groupNum][i]).css('display', 'none');
        }
    }
};

function makeAlarmGroup() {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < alarmGroup[i].length; j++) {
            $('#room' + alarmGroup[i][j]).addClass('a' + (i+1));
            $('#bubble_room' + alarmGroup[i][j]).addClass('a' + (i+1));
        }
    }
}

function closeEar(alarmGroup) {
    $('.' + alarmGroup + ' .human .leftArm').css('transform', 'rotate(90deg)');
    $('.' + alarmGroup + ' .human .rightArm').css('transform', 'rotate(-90deg)');
    $('.' + alarmGroup + ' .human .leftLowerArm').css('transform', 'rotate(150deg)');
    $('.' + alarmGroup + ' .human .rightLowerArm').css('transform', 'rotate(-150deg)');
}

function openEar(alarmGroup) {
    $('.' + alarmGroup + ' .human .leftArm').css('transform', 'rotate(0deg)');
    $('.' + alarmGroup + ' .human .rightArm').css('transform', 'rotate(0deg)');
    $('.' + alarmGroup + ' .human .leftLowerArm').css('transform', 'rotate(0deg)');
    $('.' + alarmGroup + ' .human .rightLowerArm').css('transform', 'rotate(0deg)');
}

function dance(bass, volume) {
    $('#room3_3 .human, #room3_3 .human .leftLeg, #room3_3 .human .leftArm, #room3_3 .human .rightLeg, #room3_3 .human .rightArm').css('animation-play-state', 'running');

    $('#room3_3 .human .leftArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, -60)) + ", " + getPivotPos('#room3_3', 'leftUpperArm', 'x1') + ", " + getPivotPos('#room3_3', 'leftUpperArm', 'y1') + ")");
    $('#room3_3 .human .leftLowerArm').attr('transform', "rotate(" + (0 + math_map(bass, 50, 255, 0, -180)) + ", " + getPivotPos('#room3_3', 'leftLowerArm', 'x1') + ", " + getPivotPos('#room3_3', 'leftLowerArm', 'y1') + ")");

    $('#room3_3 .human .rightArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, 60)) + ", " + getPivotPos('#room3_3', 'rightUpperArm', 'x1') + ", " + getPivotPos('#room3_3', 'rightUpperArm', 'y1') + ")");
    $('#room3_3 .human .rightLowerArm').attr('transform', "rotate(" + (0 + math_map(bass, 50, 255, 0, 180)) + ", " + getPivotPos('#room3_3', 'rightLowerArm', 'x1') + ", " + getPivotPos('#room3_3', 'rightLowerArm', 'y1') + ")");

    $('#room3_3 .audio .speaker .outerSpeaker circle').css('transform', 'scale(' + math_map(bass, 0, 255, 0.5, 0.5 + volume * 1.7) + ')');
    $('#room3_3 .audio .speaker .innerSpeaker circle').css('transform', 'scale(' + math_map(bass, 0, 255, 0.5, 0.5 + volume * 1.7) + ')');
}


function drawBroom(svg, human) {
    var gHuman = human.gHuman;
    var gBroom = svg.group(gHuman, {class: 'broom'})
    var x = getPivotPos('#room3_4', 'leftLowerArm', 'x1');
    var y = getPivotPos('#room3_4', 'leftLowerArm', 'y1') + human.armLeng/2;
    var stickLeng = 20;

    var brushW = 10;
    var brushH = 3;
    var brushLeng = stickLeng * 0.4;
    var numBrush = 7;
    var brushGap = brushW / numBrush;

    svg.line(gBroom, x, y, x, y + stickLeng, {strokeWidth: 2, stroke: 'black'});
    svg.rect(gBroom, x - brushW/2, y + stickLeng, brushW, brushH, {fill: 'white'});
    for(var i = 0; i < numBrush + 1; i++) {
        svg.line(gBroom, (x - brushW/2) + i*brushGap, y + stickLeng + brushH, (x - brushW/2) + i*brushGap, y + stickLeng + brushH + brushLeng);
    }
}

function Room(x, y, gRoom, id) {
    this.x = x;
    this.y = y;
    this.w = roomW;
    this.h = roomH;
    this.gRoom = gRoom;
    this.id = id;
}

function Human(room, gHuman) {
    this.gRoom = room.gRoom;
    this.gHuman = gHuman;
    this.x = room.x + room.w/2;
    this.y = room.y + 75;
    this.faceR = 7;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.armLeng = this.bodyH * 0.9;
    this.legLeng = this.bodyH * 0.8;
}

function drawRoom(svg, room) {
    var x = room.x;
    var y = room.y;
    var w = room.w;
    var h = room.h;

    var gRoom = room.gRoom;

    svg.rect(gRoom, x, y, w, h, {class: 'frame', fill: 'white', strokeWidth: 1});
    svg.line(gRoom, x + 8 * barGap, y, x + 8 * barGap, y + h * 0.75, {class: 'wall'});

    drawClock(svg, gRoom, x, y);

    drawBubble(room);
}

function drawBars(svg, room) {
    var x = room.x;
    var y = room.y;
    var w = room.w;
    var h = room.h;

    var gRoom = room.gRoom;

    var gBar = svg.group(gRoom, {class: 'bar', strokeWidth: 2});
    svg.line(gBar, x, y + h * 0.75, x + w, y + h * 0.75);

    for(var i = 0; i < numBar + 1; i++) {
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

        $('.clock .hourHand').css('transform', 'rotate(' + math_map(h, 0, 11, -180, 180) + 'deg)');
        $('.clock .minuteHand').css('transform', 'rotate(' + math_map(m, 0, 59, -180, 180) + 'deg)');
        $('.secondHand').css('transform', 'rotate(' + math_map(s, 0, 59, -180, 180) + 'deg)');
    }, 100);
}

function drawHuman(svg, human) {
    var gHuman = human.gHuman;
    var x = human.x;
    var y = human.y;
    var faceR = human.faceR;
    var bodyW = human.bodyW;
    var bodyH = human.bodyH;
    var armLeng = human.armLeng;
    var legLeng = human.legLeng;

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

function drawBubble(room) {
    $('body').append('<div class="bubble" id=bubble_' + room.id + '>TURN THE MUSIC DOWN!!!</div>');

    var w = $('.bubble').width();
    var x = room.x + room.w/2 - w/2;
    var y = room.y + 30;

    $('#bubble_' + room.id).css('left', x);
    $('#bubble_' + room.id).css('top', y);
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

function getPivotPos(room, bodyParts, point) {
    return Number($(room + ' .human .' + bodyParts).attr(point));
}

function math_map(value, input_min, input_max, output_min, output_max) {
    return output_min + (output_max - output_min) * (value - input_min) / (input_max - input_min);
}


