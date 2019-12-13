//const socket = io('http://localhost:3000')

window.randomScalingFactor = function() {
    return Math.round(Samples.utils.rand(0, 100));
};

var timeFormat = 'ss';

function newDate(days) {
    return moment().add(days, 'd').toDate();
}

function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        labels: [ // Date Objects
            newDate(0),
            newDate(1),
            newDate(2),
            newDate(3),
            newDate(4),
            newDate(5),
            newDate(6)
        ],
        datasets: [{
            label: 'Light Reading',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            fill: true,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }]
    },
    options: {
        title: {
            text: 'Light Graph'
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        second: 'h:mm:ss a'
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
    }
};
socket.on('lightsensor', function (data) {
    //console.log(data);

    myLine.data.datasets[0].data.splice(window.myLine.data.datasets[0].data.length - 1, 1);
    myLine.data.datasets[0].data.unshift(data);
    
    setTimeout(function() {
        myLine.update();    
    }, 1000);
    //myLine.update();
});
