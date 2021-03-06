/**
 * @author pengys5
 */
define(["jquery", "text!alarmHtml", "echarts", "walden"], function ($, alarmHtml, echarts, walden) {
    function create(divId) {
        $("#" + divId).html(alarmHtml);
    }

    function loadCostMetric(data) {
        var costChart = echarts.init(document.getElementById('costMetricDiv'), 'walden');
        var option = {
            title: {
                text: 'Cost',
                textStyle: {fontStyle: 'normal', fontWeight: 'normal', fontSize: 14}
            },
            grid: {top: 40},
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                right: 30,
                feature: {
                    myMore: {
                        show: true,
                        title: 'more',
                        icon: 'image://./public/img/more_red.png',
                        onclick: function () {
                            window.open("/trace/trace.html");
                        }
                    }
                }
            },
            legend: {
                data: ['1s', '3s', '5s', 'slow'],
                bottom: 10
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: data.xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '1s',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: data.s1Axis
                },
                {
                    name: '3s',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: data.s3Axis
                },
                {
                    name: '5s',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: data.s5Axis
                },
                {
                    name: 'slow',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: data.slowAxis
                }
            ],
            color: ["#3fb1e3", "#6be6c1", "#626c91", "#a0a7e6", "#FA8072"],
        };
        costChart.setOption(option);
    }

    function loadExceptionMetric(data) {
        var exceptionChart = echarts.init(document.getElementById('exceptionMetricDiv'), 'walden');
        var option = {
            title: {
                text: 'Throughput',
                textStyle: {fontStyle: 'normal', fontWeight: 'normal', fontSize: 14}
            },
            grid: {top: 40},
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                right: 30,
                feature: {
                    myMore: {
                        show: true,
                        title: 'more',
                        icon: 'image://./public/img/more_red.png',
                        onclick: function () {
                            window.open("/trace/trace.html");
                        }
                    }
                }
            },
            legend: {
                data: ['success', 'error'],
                bottom: 10
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: data.xAxis
                }
            ],
            yAxis: [{}, {
                inverse: true,
                min: 0,
                minInterval: 1,
                boundaryGap : 2,
                splitLine: {
                    show: false
                }
            }, {
                show: false
            }],
            series: [
                {
                    name: 'success',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: data.successAxis,
                    yAxisIndex: 0
                },
                {
                    name: 'error',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: data.errorAxis,
                    yAxisIndex: 1
                }
            ]
        };
        exceptionChart.setOption(option);
    }

    function loadCostData(slice, startTimeStr, endTimeStr) {
        $.getJSON("costDataLoad?timeSliceType=" + slice + "&startTime=" + startTimeStr + "&endTime=" + endTimeStr, function (data) {
            loadCostMetric(data);
            loadExceptionMetric(data);
        });
    }

    return {
        create: create,
        loadCostData: loadCostData
    }
});