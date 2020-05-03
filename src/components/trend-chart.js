import React, {useEffect, useState, useRef} from 'react';
import Chart from './Chart';
import {dailyTrend} from '../charts/daily';
import {toCapitalize} from '../utils/common-utils';

/**
 *
 * @return {*}
 * @constructor
 */
function TrendGraph(props) {
    let {chartJson, history} = props;

    const ref = useRef();
    const [chartStore, updateChartStore] = useState({});
    const [dailyChartMode, setDailyChartMode] = useState('cumulative');
    let trendTime = {'1week': 7, '2week': 14, month: 30},
        cumulative = true,
        timeFrame = 'month',
        seriesNames = ['confirmed', 'active', 'recovered', 'dead'];

    /**
     *
     * @param chart
     * @param name
     */
    function chartCallback(chart, name) {
        chartStore[name] = chart;
        updateChartStore(chartStore);
    }

    function getTrendSeries(cumulative, count) {
        // create the graph data
        let seriesNames = ['confirmed', 'active', 'recovered', 'dead'];
        let dailySeries = dailyTrend(history, 'date', seriesNames, cumulative, count);
        return {
            series: dailySeries,
            minRange: dailySeries[0][0][0],
        };
    }

    /**
     *
     * @param event
     */
    function updateDailyChartScaleMode(event) {
        let chart = chartStore.daily;
        let scaleMode = event.target.value;
        chart.userdata.chart.axes.yaxis[0].scaleType = scaleMode;
        if (scaleMode === 'log') {
            setDailyChartMode('cumulative');
            ref.current.setAttribute('disabled', true);
            ref.current.parentElement.classList.add('text-gray-600');
        } else {
            ref.current.removeAttribute('disabled');
            ref.current.parentElement.classList.remove('text-gray-600');
        }
        updateDailyChartCumulative(null, scaleMode);
    }

    /**
     *
     * @param event
     */
    function updateDailyChartCumulative(event, type) {
        cumulative = type || event.target.value === 'cumulative';
        
        if (!type) {
            setDailyChartMode(event.target.value);
        }

        let chart = chartStore.daily;
        let {series, minRange} = getTrendSeries(cumulative, trendTime[timeFrame]);
        series.forEach((s, i) => {
            chart.userdata.seriesdata.chartdata[i].data = s;
        });
        chart.userdata.chart.axes.xaxis.minRange = minRange;
        chart.redraw();
    }

    function updateTimeFrame(event) {
        timeFrame = event.target.value;
        let chart = chartStore.daily;
        let {series, minRange} = getTrendSeries(cumulative, trendTime[timeFrame]);
        series.forEach((s, i) => {
            chart.userdata.seriesdata.chartdata[i].data = s;
        });
        chart.userdata.chart.axes.xaxis.minRange = minRange;
        chart.redraw();
    }

    if(history.length) {
        let {series, minRange} = getTrendSeries(true, trendTime[timeFrame]);
        series.forEach((series, i) => {
            chartJson.seriesdata.chartdata[i] = {data: series, seriesname: toCapitalize(seriesNames[i])};
        });
        chartJson.chart.axes.xaxis.minRange = minRange;
    }

    return (
        <React.Fragment>
            <div className="flex flex-auto z-10 my-2 items-center justify-center">
                <label className="flex items-center justify-center  text-sm mr-2">
                    <span>Scale</span>
                    <select
                        id="scale-mode"
                        className="bg-gray-200 text-left font-bold ml-1 rounded w-full flex"
                        defaultValue="linear"
                        onChange={updateDailyChartScaleMode}
                    >
                        <option value="linear">Linear</option>
                        <option value="log">Log</option>
                    </select>
                </label>
                <label className="flex items-center justify-center  text-sm ">
                    <span>Mode: </span>
                    <select
                        id="trend-mode"
                        className="bg-gray-200 text-left font-bold ml-1 rounded w-full flex"
                        value={dailyChartMode}
                        onChange={updateDailyChartCumulative}
                        ref={ref}
                    >
                        <option value="cumulative">Cumulative</option>
                        <option value="daily">Daily</option>
                    </select>
                </label>
                <label className="flex items-center justify-center  text-sm ml-1 ">
                    <span>Time: </span>
                    <select
                        id="trend-time"
                        className="bg-gray-200 text-left font-bold ml-1 rounded w-full flex"
                        defaultValue={timeFrame}
                        onChange={updateTimeFrame}
                    >
                        <option value="1week">1 Week</option>
                        <option value="2week">2 Weeks</option>
                        <option value="month">1 Month</option>
                        <option value="all">Beginning</option>
                    </select>
                </label>
            </div>
            <div className="trend-graph">
                <Chart seriesData={chartJson} name="daily"  callback={chartCallback} />
            </div>
        </React.Fragment>
    );
}

export default TrendGraph;
