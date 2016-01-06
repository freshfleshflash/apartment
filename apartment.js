var totalW = 1280;//$('body').width();
var totalH = 728;//$('body').height();

var gapW = totalW / 21;
var gapH = totalH / 21;

var roomW = gapW * 4;
var roomH = gapH * 4;
var rooms = [];

var numBar = 22;
var barGap = roomW / numBar;
var livingRoomX = barGap * 8;
var livingRoomW = roomW - livingRoomX;

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

    //svg.rect(0, 0, 500, 300, {id: 'testRect', fill: 'none', stroke: 'violet'});
    //$('#testRect').attr('transform', 'rotate(30 250 150)');
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
    //  ...
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
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render1_3(svg) {
    var room = rooms[2];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render1_4(svg) {
    var room = rooms[3];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_1(svg) {
    var room = rooms[4];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_2(svg) {
    var room = rooms[5];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_3(svg) {
    var room = rooms[6];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render2_4(svg) {
    var room = rooms[7];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 100, y + 80));
}

function render3_1(svg) {
    var room = rooms[8];
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
    drawHuman(svg, room.gRoom, new Human(x, y + 80));
}


function render3_3(svg) {
    var room = rooms[10];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + roomW/2, y + 80));

    animateHuman();

    function animateHuman() {
        $('#room3_3 .human').css('animation-play-state', 'running');
        $('#room3_3 .human .leftLeg').css('animation-play-state', 'running');
        $('#room3_3 .human .rightLeg').css('animation-play-state', 'running');
    }

    drawAudio(svg, room.gRoom, new Audio(x + 120, y + 15));

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
                    return 'rgb(0, 0, ' + d + ')';
                });

            var bass = (frequencyData[2]) / 1;

            if(audioOn) {
                $('#room3_3 .human .leftUpperArm').attr('stroke', 'red');
                $('#room3_3 .human .leftLowerArm').attr('stroke', 'orange');
                //$('#room3_3 .human .leftUpperArm').attr('transform', "rotate(" + (90 + math_map(bass, 0, 255, 0, 60)) + ", " + 788 + ", " + 467 + ")");
                $('#room3_3 .human .leftUpperArm').css('transform', "rotate(" + (190 + math_map(bass, 0, 255, 0, 60)) + "deg)");
                $('#room3_3 .human .leftLowerArm').css('transform', 'rotate(' + (45 - math_map(bass, 0, 255, 0, 180)) + 'deg)');
                $('#room3_3 .human .rightUpperArm').css('transform', "rotate(" + (190 + math_map(bass, 0, 255, 0, 60)) + "deg)");
                $('#room3_3 .human .rightLowerArm').css('transform', 'rotate(' + (45 - math_map(bass, 0, 255, 0, 180)) + 'deg)');


                $('#room3_4 .human .leftUpperArm').css('transform', "rotate(80deg)");
            }
        }
    }
}

function render3_4(svg) {
    var room = rooms[11];
    var x = room.x;
    var y = room.y;

    drawRoom(svg, room);
    drawHuman(svg, room.gRoom, new Human(x + 130, y + 80));
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
    this.faceR = 5;
    this.bodyW = this.faceR * 2;
    this.bodyH = this.bodyW * 2;
    this.armLeng = this.bodyH * 0.9;
    this.legLeng = this.bodyH * 0.75;
}

function drawHuman(svg, gRoom, human) {
    var gHuman = svg.group(gRoom, {class: 'human', stroke: 'black', strokeWidth: 1});

    var gBody = svg.group(gHuman, {class: 'body'});
    svg.rect(gBody, human.x - human.faceR, human.y + human.faceR, human.bodyW, human.bodyH);
    svg.circle(gBody, human.x, human.y, human.faceR, human.faceR);

    var gArm = svg.group(gBody, {class: 'arm', stroke: 'black'});

    var gLeftArm = svg.group(gArm, {class: 'leftArm'});
    var gLeftUpperArm = svg.group(gLeftArm, {class: 'leftUpperArm'});
    var gLeftLowerArm = svg.group(gLeftUpperArm, {class: 'leftLowerArm'});
    svg.line(gLeftUpperArm, human.x - human.faceR, human.y + human.faceR, human.x - human.faceR, human.y + human.faceR + human.armLeng/2);
    svg.line(gLeftLowerArm, human.x - human.faceR, human.y + human.faceR + human.armLeng/2, human.x - human.faceR, human.y + human.faceR + human.armLeng);

    var gRightArm = svg.group(gArm, {class: 'rightArm'});
    var gRightUpperArm = svg.group(gRightArm, {class: 'rightUpperArm'});
    var gRightLowerArm = svg.group(gRightUpperArm, {class: 'rightLowerArm'});
    svg.line(gRightUpperArm, human.x + human.faceR, human.y + human.faceR, human.x + human.faceR, human.y + human.faceR + human.armLeng/2);
    svg.line(gRightLowerArm, human.x + human.faceR, human.y + human.faceR + human.armLeng/2, human.x + human.faceR, human.y + human.faceR + human.armLeng);

    var gLeftLeg = svg.group(gHuman, {class: 'leftLeg'});
    svg.line(gLeftLeg, human.x - human.faceR, human.y + human.faceR + human.bodyH, human.x - human.faceR, human.y + human.faceR + human.bodyH + human.legLeng);

    var gRightLeg = svg.group(gHuman, {class: 'rightLeg'});
    svg.line(gRightLeg, human.x + human.faceR, human.y + human.faceR + human.bodyH, human.x + human.faceR, human.y + human.faceR + human.bodyH + human.legLeng);
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