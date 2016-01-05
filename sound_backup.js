var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audio');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(50);    // max: 1024

var svgHeight = '60';
var svgWidth = '120';
var barPadding = '1';

function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width).attr('x', $('#room2_3').attr('x'))
        .attr('y', $('#room2_3').attr('y'));
}

var svg = createSvg('svg', svgHeight, svgWidth);

// Create our initial D3 chart.
svg.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
    })
    .attr('width', svgWidth / frequencyData.length - barPadding);

// Continuously loop and update chart with frequency data.
function renderChart() {
    requestAnimationFrame(renderChart);

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
            return svgHeight - d/2;
        })
        .attr('height', function(d) {
            return d/2;
        })
        .attr('fill', function(d) {
            return 'rgb(0, 0, ' + d/2 + ')';
        });
}

// Run the loop
renderChart();