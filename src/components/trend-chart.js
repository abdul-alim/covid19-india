import React, { useRef, useState } from "react";
import Chart from "./Chart";
import { dailyTrend } from "../charts/daily";
import { toCapitalize } from "../utils/common-utils";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

    const [timeFrame, setTimeFrame] = useState('all');
    const [cumulative, setCumulative] = useState(true);

    let trendTime = {'1week': 7, '2week': 14, month: 30},
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

    function updateCallback() {
        let chart = chartStore.daily,
            scaleMode = scaleState.checked ? 'log' : 'linear',
            cumulative = cumulativeMode.checked === false;

        chart.userdata.chart.axes.yaxis[0].scaleType = scaleMode;
        let {series, minRange} = getTrendSeries(cumulative, trendTime[timeFrame]);

        series.forEach((s, i) => {
            chart.userdata.seriesdata.chartdata[i].data = s;
        });
        chart.userdata.chart.axes.xaxis.minRange = minRange;
        chart.redraw();
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
        let checked = event.target.checked;
        setScaleState({...scaleState, [event.target.name]: checked});
        setCumulativeMode({...cumulativeMode, checked: false});
    }

    /**
     *
     * @param event
     */
    function updateDailyChartCumulative(event) {
        let cumulative = event.target.checked === false;
        setCumulative(cumulative);

        setCumulativeMode({...cumulativeMode, checked: !cumulative});
        setScaleState({...scaleState, checked: false});
    }

    function updateTimeFrame(frame) {
        setTimeFrame(frame);
    }

    if (history.length && !chartStore.daily) {
        let {series, minRange} = getTrendSeries(true, trendTime[timeFrame]);
        series.forEach((series, i) => {
            chartJson.seriesdata.chartdata[i] = {data: series, seriesname: toCapitalize(seriesNames[i])};
        });
        chartJson.chart.axes.xaxis.minRange = minRange;
        chartJson.canvas.title.show = false;
    }

    const [scaleState, setScaleState] = React.useState({checked: false});
    const [cumulativeMode, setCumulativeMode] = React.useState({checked: false});

    return (
        <React.Fragment>
            <h2 className="ml-3 mt-4">Daily Trend</h2>
            <div className="ml-3 flex mt-2">
                <div className="flex items-center ">
                    <span className="mr-2">Scale</span>
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={scaleState.checked}
                                onChange={updateDailyChartScaleMode}
                                name="checked"
                                color="primary"
                            />
                        }
                        label="Logarithmic"
                    />
                </div>
                <div className="flex items-center ">
                    <span className="mr-2">Mode</span>
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={scaleState.checked}
                                size="small"
                                checked={cumulativeMode.checked}
                                onChange={updateDailyChartCumulative}
                                name="checked"
                                color="primary"
                            />
                        }
                        label="Daily"
                    />
                </div>
            </div>
            <div className="trend-graph">
                <Chart seriesData={chartJson} name="daily" callback={chartCallback} updateCallback={updateCallback} />
            </div>
            <div className="flex flex-auto z-10 my-4 items-center justify-end">
                <div className="button-group text-sm mr-4">
                    <button
                        type="button"
                        onClick={() => updateTimeFrame('all')}
                        className={`${
                            timeFrame === 'all' ? 'selected' : ''
                        } text-2xs px-4 py-2 font-extra-bold no-outline`}
                    >
                        Beginning
                    </button>
                    <button
                        type="button"
                        onClick={() => updateTimeFrame('month')}
                        className={`${
                            timeFrame === 'month' ? 'selected' : ''
                        } text-2xs px-4 py-2 font-extra-bold no-outline`}
                    >
                        Month
                    </button>
                    <button
                        type="button"
                        onClick={() => updateTimeFrame('2week')}
                        className={`${
                            timeFrame === '2week' ? 'selected' : ''
                        } text-2xs px-4 py-2 font-extra-bold no-outline`}
                    >
                        2 Weeks
                    </button>
                    <button
                        type="button"
                        onClick={() => updateTimeFrame('1week')}
                        className={`${
                            timeFrame === '1week' ? 'selected' : ''
                        } text-2xs px-4 py-2 font-extra-bold no-outline`}
                    >
                        1 Week
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TrendGraph;
