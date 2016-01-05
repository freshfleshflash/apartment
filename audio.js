var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audio');
var audioSource = audioContext.createMediaElementSource(audioElement);
var analyser = audioContext.createAnalyser();

audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

var frequencyData = new Uint8Array(10);    // max: 1024

var room = $('#room3_3');
var roomX = room.attr('x');
var roomY = room.attr('y');
var roomW = room.attr('width');
var roomH = room.attr('height');

var vW = roomW * 0.4;
var vH;
var barPadding = 1;

var vSvg = createSvg();

function createSvg() {
    return d3.select('#buildingSvg')
        .append('svg')
        .attr('x', 800)
        .attr('y', roomY - (windowH - roomH) - roomH/2)
        .attr('width', windowW)
        .attr('height', windowH)
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
            return windowH - d * 0.5;
        })
        .attr('height', function(d) {
            return d * 0.5;
        })
        .attr('fill', function(d) {
            return 'rgb(0, 0, ' + d + ')';
        });

    var sum = (frequencyData[2]) / 1;

    $('#human3_3 .arm .left').css('transform', 'rotate(' + (180 - math_map(sum, 0, 255, 0, 120)) + 'deg)');
    $('#human3_3 .arm .right').css('transform', 'rotate(' + (180 + math_map(sum, 0, 255, 0, 120)) + 'deg)');

    $('#human3_3 .leg .left').css('transform', 'rotate(' + (0 + math_map(sum, 0, 255, 0, 60)) + 'deg)');
    $('#human3_3 .leg .right').css('transform', 'rotate(' + (0 + math_map(sum, 0, 255, 0, 60)) + 'deg)');

    console.log(frequencyData);
}

renderVis();

function math_map(value, input_min, input_max, output_min, output_max) {
    return output_min + (output_max - output_min) * (value - input_min) / (input_max - input_min);
}