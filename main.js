var netConfig = {
    chart: {
        type: 'networkgraph',
        // height: '50%'
    },
    title: {
        text: 'Marvel Characters Relationship with Doctor Strange'
    },
    subtitle: {
        text: 'interactable'
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true,
                friction: -0.9
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'Tree',
        data: [
            ['Doctor Strange', 'Star-Lord'],
            ['Doctor Strange', 'Star-Lord'],

            ['Doctor Strange', 'Iron Man'],
            ['Doctor Strange', 'Captain America'],

            ['Captain America', 'Winter Soldier'],
            ['Captain America', 'Falcon'],
            ['Captain America', 'Black Widow'],
            ['Black Widow', 'Hulk'],
            ['Black Widow', 'Hawkeye'],

            ['Star-Lord', 'Loki'],
            ['Star-Lord', 'Thor'],
            ['Star-Lord', 'Gamora'],
            ['Star-Lord', 'Groot'],
            ['Star-Lord', 'Rocket Raccoon'],

            ['Loki', 'Thor'],

            ['Iron Man', 'Spider Man'],
            ['Iron Man', 'Falcon'],
            // ['Hulk', 'Captain America'],
            // ['Hulk', 'Black Widow'],
            // ['Hulk', 'Falcon'],
            // ['Winter Soldier', 'Captain America'],
            // ['Doctor Strange', 'Wong'],

        ]
    }]
};

var webConfig = {
    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Marvel Characters\' Ability Compared With Doctor Strange',
    },
    subtitle: {
        text: 'interactable'
    },
    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Intelligence', 'Strength', 'Speed', 'Durability',
            'Power', 'Combat'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 500
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    series: [{
        name: 'Doctor Strange',
        data: [170, 200, 36, 50, 231, 80],
        pointPlacement: 'on'
    }, {
        name: 'Star Lord',
        data: [145, 400, 40, 50, 25, 70],
        pointPlacement: 'on'
    }, {
        name: 'Iron Man',
        data: [170, 500, 56, 51, 65, 71],
        pointPlacement: 'on'
    }, {
        name: 'Captain America',
        data: [136, 450, 48, 50, 64, 95],
        pointPlacement: 'on'
    },],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                pane: {
                    size: '100%'
                }
            }
        }]
    }
};




Highcharts.addEvent(
    Highcharts.Series,
    'afterSetOptions',
    function (e) {
        var colors = Highcharts.getOptions().colors,
            i = 0,
            nodes = {};

        if (
            this instanceof Highcharts.seriesTypes.networkgraph &&
            e.options.id === 'Tree'
        ) {
            e.options.data.forEach(function (link) {

                if (link[0] === 'Doctor Strange') {
                    nodes['Doctor Strange'] = {
                        id: 'Doctor Strange',
                        marker: {
                            radius: 20
                        }
                    };
                    nodes[link[1]] = {
                        id: link[1],
                        marker: {
                            radius: 10
                        },
                        color: colors[i++]
                    };
                } else if (nodes[link[0]] && nodes[link[0]].color) {
                    nodes[link[1]] = {
                        id: link[1],
                        color: nodes[link[0]].color
                    };
                }
            });

            e.options.nodes = Object.keys(nodes).map(function (id) {
                return nodes[id];
            });
        }
    }
);

$(".timeline-wrapper .timeline-content-item > span").on("mouseenter mouseleave", function(e){
    $(".timeline-wrapper .timeline-content-item.active").removeClass("active");
    $(this).parent().addClass("active");
  });


document.addEventListener('DOMContentLoaded', function () {

    
Highcharts.chart('networkgraph', netConfig);


Highcharts.chart('webgraph', webConfig);

// Highcharts.chart('timelinegraph', timeConfig);
});