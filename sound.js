var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audio');
var audioSource = audioContext.createMediaElementSource(audioElement);
var analyser = audioContext.createAnalyser();

audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

var frequencyData = new Uint8Array(50);    // max: 1024

var room = $('#room2_3');
var vSvgW = room.attr('width');
var vSvgH = room.attr('height') + 200;
var barPadding = 1;

function createSvg(width, height) {
    return d3.select('svg')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('x', room.attr('x'))
        .attr('y', room.attr('y'));
}

var vSvg = createSvg(vSvgW, vSvgH);

vSvg.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return i * (vSvgW / frequencyData.length);
    })
    .attr('width', vSvgW / frequencyData.length - barPadding);

function renderChart() {
    requestAnimationFrame(renderChart);

    analyser.getByteFrequencyData(frequencyData);

    vSvg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
            return vSvgH - d;
        })
        .attr('height', function(d) {
            return d;
        })
        .attr('fill', function(d) {
            return 'rgb(0, 0, ' + d + ')';
        });
}

renderChart();