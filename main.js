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

$(".timeline-wrapper .timeline-content-item > span").on("mouseenter mouseleave", function (e) {
    $(".timeline-wrapper .timeline-content-item.active").removeClass("active");
    $(this).parent().addClass("active");
});


document.addEventListener('DOMContentLoaded', function () {


    Highcharts.chart('networkgraph', netConfig);


    Highcharts.chart('webgraph', webConfig);
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);
        var interfaceColors = new am4core.InterfaceColorSet();

        try {
            chart.geodata = am4geodata_worldLow;
        }
        catch (e) {
            chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }


        var label = chart.createChild(am4core.Label)
        label.text = "Doctor Strange Movie Box Office as 2019 Nov 25th, worldwide, in USD ($) \n Source: https://pro.imdb.com/title/tt1211837/boxoffice";
        label.fontSize = 12;
        label.align = "left";
        label.valign = "bottom"
        label.fill = am4core.color("#ffffff");
        label.background = new am4core.RoundedRectangle()
        label.background.cornerRadius(10, 10, 10, 10);
        label.padding(10, 10, 10, 10);
        label.marginLeft = 30;
        label.marginBottom = 30;
        label.background.strokeOpacity = 0.3;
        label.background.stroke = am4core.color("#ffffff");
        label.background.fill = am4core.color("#f9e3ce");
        label.background.fillOpacity = 0.6;

        // var dataSource = chart.createChild(am4core.TextLink)
        // dataSource.text = "Data source: WHO";
        // dataSource.fontSize = 12;
        // dataSource.align = "left";
        // dataSource.valign = "top"
        // dataSource.url = "https://www.who.int/immunization/monitoring_surveillance/burden/vpd/surveillance_type/active/measles_monthlydata/en/"
        // dataSource.urlTarget = "_blank";
        // dataSource.fill = am4core.color("#ffffff");
        // dataSource.padding(10, 10, 10, 10);
        // dataSource.marginLeft = 30;
        // dataSource.marginTop = 30;

        // Set projection
        chart.projection = new am4maps.projections.Orthographic();
        chart.panBehavior = "rotateLongLat";
        chart.padding(20, 20, 20, 20);

        // Add zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        var homeButton = new am4core.Button();
        homeButton.events.on("hit", function () {
            chart.goHome();
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = chart.zoomControl;
        homeButton.insertBefore(chart.zoomControl.plusButton);

        chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#bfa58d");
        chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
        chart.deltaLongitude = 20;
        chart.deltaLatitude = -20;


        // Create map polygon series

        var shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        shadowPolygonSeries.geodata = am4geodata_continentsLow;

        try {
            shadowPolygonSeries.geodata = am4geodata_continentsLow;
        }
        catch (e) {
            shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }

        shadowPolygonSeries.useGeodata = true;
        shadowPolygonSeries.dx = 2;
        shadowPolygonSeries.dy = 2;
        shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
        shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
        shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
        shadowPolygonSeries.fillOpacity = 0.1;
        shadowPolygonSeries.fill = am4core.color("#000");


        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;

        polygonSeries.calculateVisualCenter = true;
        polygonSeries.tooltip.background.fillOpacity = 0.2;
        polygonSeries.tooltip.background.cornerRadius = 20;

        var template = polygonSeries.mapPolygons.template;
        template.nonScalingStroke = true;
        template.fill = am4core.color("#f9e3ce");
        template.stroke = am4core.color("#e2c9b0");

        polygonSeries.calculateVisualCenter = true;
        template.propertyFields.id = "id";
        template.tooltipPosition = "fixed";
        template.fillOpacity = 1;

        template.events.on("over", function (event) {
            if (event.target.dummyData) {
                event.target.dummyData.isHover = true;
            }
        })
        template.events.on("out", function (event) {
            if (event.target.dummyData) {
                event.target.dummyData.isHover = false;
            }
        })

        var hs = polygonSeries.mapPolygons.template.states.create("hover");
        hs.properties.fillOpacity = 1;
        hs.properties.fill = am4core.color("#deb7ad");


        var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
        graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
        graticuleSeries.fitExtent = false;
        graticuleSeries.mapLines.template.strokeOpacity = 0.2;
        graticuleSeries.mapLines.template.stroke = am4core.color("#fff");


        var measelsSeries = chart.series.push(new am4maps.MapPolygonSeries())
        measelsSeries.tooltip.background.fillOpacity = 0;
        measelsSeries.tooltip.background.cornerRadius = 20;
        measelsSeries.tooltip.autoTextColor = false;
        measelsSeries.tooltip.label.fill = am4core.color("#000");
        measelsSeries.tooltip.dy = -5;

        var measelTemplate = measelsSeries.mapPolygons.template;
        measelTemplate.fill = am4core.color("#bf7569");
        measelTemplate.strokeOpacity = 0;
        measelTemplate.fillOpacity = 0.75;
        measelTemplate.tooltipPosition = "fixed";



        var hs2 = measelsSeries.mapPolygons.template.states.create("hover");
        hs2.properties.fillOpacity = 1;
        hs2.properties.fill = am4core.color("#86240c");

        polygonSeries.events.on("inited", function () {
            polygonSeries.mapPolygons.each(function (mapPolygon) {
                var count = data[mapPolygon.id];

                if (count > 0) {
                    var polygon = measelsSeries.mapPolygons.create();
                    polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
                    polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": " + count;
                    mapPolygon.dummyData = polygon;
                    polygon.events.on("over", function () {
                        mapPolygon.isHover = true;
                    })
                    polygon.events.on("out", function () {
                        mapPolygon.isHover = false;
                    })
                }
                else {
                    mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
                    mapPolygon.fillOpacity = 0.9;
                }

            })
        })
        // let animation;
        // setTimeout(function () {
        //     animation = chart.animate({ property: "deltaLongitude", to: 100000 }, 20000000);
        // }, 3000)

        // chart.seriesContainer.events.on("down", function () {
        //     if (animation) {
        //         animation.stop();
        //     }
        // })


        var data = {
            "AL": 504.38,
            "AR": 3460732,
            "AT": 2146709,
            "AU": 15902123,
            "BE": 1893163,
            "BO": 691322,
            "BR": 22746665,
            "BG": 544989,
            "CL": 2548326,
            "CN": 109194913,//'Mainland',
            "CO": 3131814,
            "CZ": 1296133,
            "DK": 2285111,
            'DE': 17402095,
            "FI": 1293064,
            "FR": 15688092,
            "GR": 1175663,
            "HU": 1205704,
            "IS": 289348,
            "IN": 5174482,
            "IT": 8087311,
            "JP": 16390905,
            "MX": 13587076,
            "UK": 28547412,
            "US": 232641920,
        }

    }); // end am4core.ready()
    // Highcharts.chart('timelinegraph', timeConfig);
});