import React, {useEffect, useRef, useState} from 'react';
import DisplayCard from './display-card';
import axios from 'axios';
import Table from './table';
import Map from './Map';
import {POPULATION, PUPULATION_SOURCE} from '../constants/population';
import {getFormattedTestingData} from '../utils/format-test';
import Chart from './Chart';
import {dailyTrend} from '../charts/daily';
import {
    clone,
    IS_MOBILE_DEVICE,
    IS_SINGLE_COLUMN,
    isTouchDevice,
    shareTheApp,
    timeDifference,
    toCapitalize,
    toFixedNumber,
} from '../utils/common-utils';
import TrendGraph from './trend-chart';
import {useHistory} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Button} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import MetaCard from './meta-card';
import NewsCard from './news-card';
import {makeKeyframes} from './race-bar/useKeyframes';
import RacingBarChart from './race-bar/RacingBarChart';
import {STATE_CODES} from '../constants/state-code';
import {COLOR_ARRAY1} from '../constants/colors';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

const d3 = window.d3;
const IS_DESKTOP = !IS_MOBILE_DEVICE;

function Home({}) {
    const [fetched, setFetched] = useState(false);
    const [data, setData] = useState({});
    const [tableData, setTableData] = useState({rows: [], columns: []});
    const [mapInitData, setMapInitData] = useState({});
    const [testingData, setTestingData] = useState({});
    const [metaCardPopulation, setMetaCardPopulation] = useState({});
    const [stateDataMapped, setStateDataMapped] = useState({});
    const [dailyChart, setDailyChart] = useState(null);
    const [stateStackedChart, setStateStackedChart] = useState({});
    const [deathTrendChart, setDeathTrendChart] = useState({});
    const [deathTrendTotalChart, setDeathTrendTotalChart] = useState({});
    const [recoveryTrendChart, setRecoveryTrendChart] = useState({});
    const [growthRateChart, setGrowthRateChart] = useState({});
    const [stateCases, setStateCases] = useState({});
    const [wordcloudChart, setWordcloudChart] = useState({});
    const [percentChart, setPercentChart] = useState({});
    const history = useHistory();
    const childRef = useRef();
    const [chartStore, updateChartStore] = useState({});
    const [lastUpdated, setLastUpdated] = useState('-');
    const [caseHistory, setCaseHistory] = useState({});
    const [spinner, setSpinner] = useState(true);
    const [articles, setArticles] = useState(true);
    const [keyframes, setKeyFrames] = useState([]);

    const getCards = (total = {}, today = {}) => {
        return [
            {
                name: 'Confirmed',
                value: total.confirmed,
                delta: today.confirmed,
                colorClass: 'red',
            },
            {
                name: 'Active',
                value: total.active,
                delta: today.active,
                colorClass: 'orange',
            },
            {
                name: 'Recovered',
                value: total.recovered,
                delta: today.recovered,
                colorClass: 'green',
            },
            {
                name: 'Dead',
                value: total.dead,
                delta: today.dead,
                colorClass: 'gray',
            },
        ];
    };

    const [displayCards, setDisplayCards] = useState(getCards());
    const [stateData, setStateData] = useState([]);

    useEffect(() => {
        if (fetched === false) {
            getData();
        }
    }, [fetched]);

    const getData = async () => {
        try {
            let [
                {data: reports},
                {
                    data: {india: indiaHistory, state: stateHistory},
                },
                {data: dailyChart},
                {data: stateBar},
                {data: percentChartJson},
                {data: news},
                {data: tests},
            ] = await Promise.all([
                axios.get('https://api.track-covid19.in/reports_v2.json'),
                axios.get('https://api.track-covid19.in/history.json'),
                axios.get('/charts/daily.json'),
                axios.get('/charts/states.json'),
                axios.get('/charts/percent-chart.json'),
                axios.get('https://jsonstorage.net/api/items/72baa701-75d5-4069-89f3-573c4a4bb3e3'),
                axios.get('https://api.track-covid19.in/tests.json'),
            ]);

            setSpinner(false);
            setData(reports);
            setCaseHistory({india: indiaHistory, state: stateHistory});
            setArticles(news);

            // time updated
            {
                // 10/05/2020 14:34:22
                let parseTime = d3.timeParse('%d/%m/%Y %H:%M:%S');
                let updatedTime = parseTime(reports.updatedTime);

                setLastUpdated(
                    `${timeDifference(new Date(), updatedTime)} - ${d3.timeFormat('%B %d, %I:%M %p')(
                        new Date(updatedTime)
                    )}`
                );
            }

            // set the testing value temporary
            for (var stateCode in reports.states) {
                if (reports.states.hasOwnProperty(stateCode)) {
                    if (tests.states[stateCode]) {
                        let stateTestHistory = tests.states[stateCode];
                        reports.states[stateCode].testing_data = stateTestHistory[stateTestHistory.length - 1];
                    }
                }
            }

            let totalPopulation = d3.sum(Object.values(POPULATION));

            let testingData = getFormattedTestingData(reports.testing_data_imcr, totalPopulation, 'Total');
            setTestingData(testingData);
            setMetaCardPopulation({...testingData});

            setDisplayCards(getCards(reports, reports.today));

            let mapInitData = {
                confirmed: reports.confirmed,
                active: reports.active,
                recovered: reports.recovered,
                dead: reports.dead,
                name: 'India',
                today: reports.today,
            };
            setMapInitData(mapInitData);

            let tableData = Object.values(reports.states); //.filter(row => row.confirmed > 0);
            setStateData(tableData);

            // s
            let t = {};
            tableData.forEach((state) => {
                t[state.name] = state;
            });
            setStateDataMapped(t);

            setTableData({
                rows: tableData,
                columns: [
                    {name: 'state/UT', accessor: 'name'},
                    {
                        name: IS_MOBILE_DEVICE ? 'cnfmd' : 'confirmed',
                        accessor: 'confirmed',
                        colorClass: 'red',
                    },
                    {
                        name: IS_MOBILE_DEVICE ? 'actv' : 'active',
                        accessor: 'active',
                        colorClass: 'orange',
                    },
                    {
                        name: IS_MOBILE_DEVICE ? 'Rcvrd' : 'recovered',
                        accessor: 'recovered',
                        colorClass: 'green',
                    },
                    {
                        name: 'dead',
                        accessor: 'dead',
                        colorClass: 'gray',
                    },
                ],
            });

            // daily trend
            setDailyChart(dailyChart);

            // sort the st

            let states = Object.values(reports.states).filter(
                (state) => state.confirmed > 50 && state.stateCode !== 'UN'
            );

            // set the factors
            states.forEach((state) => {
                state.deathRateByRecovery = toFixedNumber((state.dead / (state.recovered + state.dead)) * 100, 2);
                state.deathRateByTotal = toFixedNumber((state.dead / state.confirmed) * 100, 2);
                state.recoveryRateByTotal = toFixedNumber((state.recovered / state.confirmed) * 100, 2);
            });

            // *************************************************************************** //

            // stacked chart
            states.sort(function (a, b) {
                return d3.descending(a.confirmed, b.confirmed);
            });

            let barSeriesNames = ['confirmed', 'recovered', 'dead'],
                stateBarSeries = dailyTrend(states, 'name', barSeriesNames),
                stateBarStacked = clone(stateBar);

            stateBarSeries.forEach((series, i) => {
                stateBarStacked.seriesdata.chartdata[i] = {data: series, seriesname: toCapitalize(barSeriesNames[i])};
            });
            setStateStackedChart(stateBarStacked);

            // *************************************************************************** //

            {
                states.sort(function (a, b) {
                    return d3.descending(a.deathRateByRecovery, b.deathRateByRecovery);
                });

                let lineSeriesColumns = ['confirmed', 'recovered', 'dead', 'deathRateByRecovery'],
                    lineSeriesNames = ['confirmed', 'recovered', 'dead', 'Death Ratio'],
                    stateBarSeriesLine = dailyTrend(states, 'name', lineSeriesColumns),
                    deathTrendChart = clone(stateBar);

                deathTrendChart.canvas.title.text = 'Death Ratio By Total Recoveries';
                deathTrendChart.canvas.subtitle = {text: 'Death Ratio = Deaths / (Deaths + Recoveries)', show: true};
                deathTrendChart.chart.plot.plotoptions.bar.stacked = false;
                deathTrendChart.chart.axes.yaxis[0].label.text = 'Total';

                stateBarSeriesLine.forEach((series, i) => {
                    let s = {
                        data: series,
                        seriesname: toCapitalize(lineSeriesNames[i]),
                    };
                    if (i === stateBarSeriesLine.length - 1) {
                        s.type = 'line';
                        s.yaxiscolumnorder = [1, 0];
                        s.color = 'rgb(171, 16, 23)';
                    }
                    deathTrendChart.seriesdata.chartdata[i] = s;
                });
                setDeathTrendChart(deathTrendChart);
            }

            // *************************************************************************** //

            {
                states.sort(function (a, b) {
                    return d3.descending(a.deathRateByTotal, b.deathRateByTotal);
                });

                let lineSeriesColumns = ['confirmed', 'recovered', 'dead', 'deathRateByTotal'],
                    lineSeriesNames = ['confirmed', 'recovered', 'dead', 'death rate'],
                    stateBarSeriesLine = dailyTrend(states, 'name', lineSeriesColumns),
                    deathTrendChart = clone(stateBar);

                deathTrendChart.canvas.title.text = 'Death Ratio By Total Confirmed';
                deathTrendChart.canvas.subtitle = {text: 'Death Ratio = Deaths / (Deaths + Recoveries)', show: false};
                deathTrendChart.chart.plot.plotoptions.bar.stacked = false;
                deathTrendChart.chart.axes.yaxis[0].label.text = 'Total';

                stateBarSeriesLine.forEach((series, i) => {
                    let s = {
                        data: series,
                        seriesname: toCapitalize(lineSeriesNames[i]),
                    };
                    if (i === stateBarSeriesLine.length - 1) {
                        s.type = 'line';
                        s.yaxiscolumnorder = [1, 0];
                        s.color = 'rgb(171, 16, 23)';
                    }
                    deathTrendChart.seriesdata.chartdata[i] = s;
                });
                setDeathTrendTotalChart(deathTrendChart);
            }

            // *************************************************************************** //

            {
                states.sort(function (a, b) {
                    return d3.descending(a.recoveryRateByTotal, b.recoveryRateByTotal);
                });

                let lineSeriesColumns1 = ['confirmed', 'recovered', 'dead', 'recoveryRateByTotal'],
                    lineSeriesNames1 = ['confirmed', 'recovered', 'dead', 'recovery rate'],
                    recoverySeriesLine = dailyTrend(states, 'name', lineSeriesColumns1),
                    recoveryTrendChart = clone(stateBar);

                recoveryTrendChart.canvas.title.text = 'Recovery Ratio By Total Infected';
                recoveryTrendChart.canvas.subtitle = {text: 'States With  > 50 Confirmed Cases', show: true};
                recoveryTrendChart.chart.plot.plotoptions.bar.stacked = false;
                recoveryTrendChart.chart.axes.yaxis[0].label.text = 'Total';

                recoverySeriesLine.forEach((series, i) => {
                    let s = {
                        data: series,
                        seriesname: toCapitalize(lineSeriesNames1[i]),
                    };
                    if (i === recoverySeriesLine.length - 1) {
                        s.type = 'line';
                        s.yaxiscolumnorder = [1, 0];
                        s.color = '#00897B';
                    }
                    recoveryTrendChart.seriesdata.chartdata[i] = s;
                });
                setRecoveryTrendChart(recoveryTrendChart);
            }

            {
                states.sort(function (a, b) {
                    return d3.descending(a.confirmed, b.confirmed);
                });

                var parseTime = d3.timeParse('%b %d, %Y');
                let march1 = new Date(2020, 1, 29);

                let data = states.slice(0, 15).map((state) => {
                    let history = stateHistory[state.stateCode].filter((row) => {
                        return parseTime(row.date) > march1;
                    });

                    let data = dailyTrend(history, 'date', ['confirmed'], true)[0];

                    return {
                        seriesname: state.name,
                        type: 'line',
                        data: data,
                    };
                });
                let stateCasesChart = clone(dailyChart);
                stateCasesChart.legend.colors = COLOR_ARRAY1;
                stateCasesChart.canvas.title.text = 'Total Confirmed Cases By States';
                data.forEach((s, i) => {
                    stateCasesChart.seriesdata.chartdata[i] = s;
                });
                setStateCases(stateCasesChart);
            }

            {
                states.sort(function (a, b) {
                    return d3.descending(a.confirmed, b.confirmed);
                });

                let data = states.slice(0, 20).map((state) => {
                    let data = dailyTrend(stateHistory[state.stateCode], '$index', ['confirmed'], true)[0];
                    return {
                        seriesname: state.name,
                        type: 'line',
                        data: data,
                    };
                });

                let stateCasesChartLog = clone(dailyChart);
                stateCasesChartLog.legend.colors = COLOR_ARRAY1;
                data.forEach((s, i) => {
                    stateCasesChartLog.seriesdata.chartdata[i] = s;
                });
                stateCasesChartLog.chart.axes.xaxis.threshold = {};
                stateCasesChartLog.chart.axes.xaxis.tickCount = 5;
                stateCasesChartLog.chart.axes.xaxis.label = {
                    text: 'No. Of Days Since 1st Confirmed Case',
                };
                stateCasesChartLog.chart.axes.xaxis.ticklabel.alignMode = 'rotate(45)';
                stateCasesChartLog.metadata.columns[0] = {
                    datatype: 'numeric',
                    columnname: 'Day',
                    dataindex: 0,
                    numeric: {
                        axisformat: {
                            prefix: 'Day ',
                        },
                    },
                };
                stateCasesChartLog.chart.axes.yaxis[0].scaleType = 'log';
                stateCasesChartLog.legend.colors = COLOR_ARRAY1;
                stateCasesChartLog.canvas.title.text = 'Statewise Growth trend';
                stateCasesChartLog.canvas.subtitle = {text: 'Top 20 States', show: true};

                setGrowthRateChart(stateCasesChartLog);
            }

            {
                let wordcloudSeries = dailyTrend(Object.values(reports.states), 'name', ['confirmed']),
                    wordCloudChart = clone(stateBar);

                wordCloudChart.canvas.title.text = 'Word Cloud of Affected States and UTs';
                wordCloudChart.chart.axes.yaxis[0].label.text = 'Total';
                wordCloudChart.seriesdata.chartdata[0] = {
                    type: 'wordcloud',
                    data: wordcloudSeries,
                    seriesname: 'Confirmed',
                };
                wordCloudChart.legend.colors = ['#E91E63'];
                wordCloudChart.legend.enabled = false;
                wordCloudChart.chart.plot.plotoptions.wordcloud = {
                    minSize: '2.5%',
                    legendHighlightEffect: {
                        selectedSeries: 'invert',
                    },
                };
                setWordcloudChart(wordCloudChart);
            }

            {
                percentChartJson.seriesdata.chartdata[0] = {
                    type: 'pie',
                    data: [
                        ['Active', reports.active],
                        ['Recovered', reports.recovered],
                        ['dead', reports.dead],
                    ],
                };
                setPercentChart(percentChartJson);
            }

            {
                // build rave bar data
                Object.entries(stateHistory).forEach(([key, value]) => {
                    let last = 0;
                    value.forEach((entry) => {
                        entry.name = STATE_CODES[key];
                        entry.value = entry.confirmed + last;
                        last = entry.value;
                    });
                });

                let all = Object.values(stateHistory)
                    .flat()
                    .filter((d) => d.name !== undefined);

                all.sort(function (a, b) {
                    return d3.ascending(new Date(a.date), new Date(b.date));
                });
                all = all.slice(90, all.length);
                const keyframes = makeKeyframes(all, 3);
                setKeyFrames(keyframes);
            }

            //
            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    function callbackMap(point) {
        // setStateDataMapped
        let state = stateDataMapped[point.name],
            totalPopulation = POPULATION[state.stateCode];
        let testingData = getFormattedTestingData(state.testing_data, totalPopulation, state.name);
        setTestingData(testingData);
    }

    function goToStatePage(event, {point}) {
        let stateCode = tableData.rows.find((row) => row.name === point[0]).stateCode;
        history.push('/state/' + stateCode);
    }

    let last = null;
    function tapCallback(event, data, mapInstance) {
        // console.log(data.point[0])
        // fix for tapping same data twice
        let mouse = d3.mouse(mapInstance.container.node());
        let latLong = mapInstance.geo.utils.projection.invert(mouse);
        let point = mapInstance.rendererArrangedReveresd[0].getPoint(latLong, mouse, 0);

        if (data.point[0] === last && point) {
            return goToStatePage(event, data);
        }

        last = data.point[0];
        window.d3.event.allowDefault = true;
    }

    /**
     *
     * @param chart
     * @param name
     */
    function chartCallback(chart, name) {
        chartStore[name] = chart;
        updateChartStore(chartStore);
    }

    function animationDelay(i) {
        return {animationDelay: i * 200 + 'ms'};
    }

    function getMapAndTable() {
        return (
            <React.Fragment>
                <div className="font-bold my-8 text-center text-gray-700 opacity-0 fade-in" style={animationDelay(2)}>
                    <h1 className="text-2xl font-extra-bold">Live Covid-19 Case Map - India</h1>
                    <h2 className="text-xs">
                        {isTouchDevice() ? 'Tap/Double Tap' : 'Hover/Click'} on the map for more information
                    </h2>
                </div>
                <div className="flex justify-between fade-in my-6" style={animationDelay(2)}>
                    <div className="text-blue-600 items-center justify-center">
                        <div className="text-xs py-1">
                            Tested <span className="font-bold">{testingData.label}</span>
                        </div>
                        <div className="text-xl font-bold">{testingData.tested}</div>
                        {testingData.date}
                    </div>
                    <div className="text-blue-600 items-center justify-center text-right">
                        <div className="text-xs py-1">
                            Population{' '}
                            <a rel="noopener" target="_blank" className="bg-blue-100" href={PUPULATION_SOURCE}>
                                2019
                            </a>
                        </div>
                        <div className="text-sm font-bold">{testingData.population}</div>
                        <div className="text-sm font-bold">{testingData.test_per_million} tests / million people</div>
                    </div>
                </div>

                <div className="fade-in" style={animationDelay(4)}>
                    <Map
                        initCardData={mapInitData}
                        seriesPoints={stateData}
                        stateCode={'IND'}
                        joinBy={'name'}
                        data={tableData}
                        cards={['confirmed', 'active', 'recovered', 'dead']}
                        callback={callbackMap}
                        clickCallback={goToStatePage}
                        tapCallback={tapCallback}
                    />
                </div>

                <div className="w-full my-6 fade-in" style={animationDelay(6)}>
                    {fetched && <Table rows={tableData.rows} columns={tableData.columns} link={true} />}
                </div>
            </React.Fragment>
        );
    }

    //*****************************

    // race bar chart handle
    let stateCodes = Object.values(STATE_CODES);
    const chartRef = React.useRef();
    const handleReplay = () => {
        chartRef.current.replay();
    };
    const handleStart = () => {
        chartRef.current.start();
    };
    const handleStop = () => {
        chartRef.current.stop();
    };
    const playing = chartRef.current ? chartRef.current.playing : false;
    const [_, forceUpdate] = useState();
    let parentRef = useRef(null);

    return (
        <React.Fragment>
            <Helmet>
                <title>Coronavirus Outbreak in India - track-covid19.in</title>
                <meta name="title" content="Coronavirus Outbreak in India}: Latest Map and Case Count" />
                <meta
                    name="description"
                    content={`Live statistics of Coronavirus (COVID-19) in India. Track the confirmed cases, recovered patients, and death toll of India due to the COVID-19 coronavirus.`}
                />
            </Helmet>
            <div className="container">
                {spinner && (
                    <div
                        className="flex items-center justify-center fixed h-screen w-full z-10"
                        style={{left: 0, top: 0}}
                    >
                        <div className="lds-dual-ring"></div>
                    </div>
                )}
                {fetched && (
                    <div className="opacity-0 my-8 fade-in">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-40 md:mx-10 pb-4">
                                <div className="flex justify-between text-primary font-bold items-center my-2">
                                    <div className="flex">
                                        <Button
                                            onClick={shareTheApp}
                                            color="primary"
                                            className="bg-primary"
                                            endIcon={<ShareIcon />}
                                        >
                                            Share
                                        </Button>
                                    </div>
                                    <div className="text-right text-xs mb-2">
                                        <h2 className="">Last Updated</h2>
                                        <h2 id="lastUpdated" className="capitalize">
                                            {lastUpdated}
                                        </h2>
                                    </div>
                                </div>

                                <div className="w-full fade-in mb-4" style={animationDelay(1)}>
                                    <DisplayCard ref={childRef} cards={displayCards} count={2000} />
                                </div>

                                <div className="w-full fade-in mb-4 border" style={animationDelay(2)}>
                                    <TrendGraph chartJson={dailyChart} history={caseHistory.india} />
                                </div>

                                {IS_SINGLE_COLUMN && getMapAndTable()}

                                <div className="w-full fade-in md:w-40 mb-4 state-bar border" style={animationDelay(4)}>
                                    <Chart seriesData={stateCases} name="state_cases" callback={chartCallback} />
                                </div>

                                <div className="w-full fade-in md:w-40 mb-4 state-bar border" style={animationDelay(5)}>
                                    <Chart seriesData={growthRateChart} name="growth" callback={chartCallback} />
                                </div>

                                <div
                                    className="w-full fade-in md:w-40 mb-4 percent-chart border"
                                    style={animationDelay(6)}
                                >
                                    <Chart seriesData={percentChart} name="percent" callback={chartCallback} />
                                </div>

                                <div className="w-full fade-in md:w-40 mb-4 state-bar border" style={animationDelay(7)}>
                                    <Chart seriesData={wordcloudChart} name="wordcloud" callback={chartCallback} />
                                </div>

                                <div className="w-full fade-in mb-4 border" style={animationDelay(2)}>
                                    <h2 className="ml-3 mt-4">Animation Of Top 10 States By Total Confirmed Cases</h2>
                                    <h2 className="ml-3 my-0 text-sm text-gray-400 mb-2 subtitle-color">
                                        Click the play button to animate the chart
                                    </h2>
                                    <div className="race-bar" ref={parentRef}>
                                        <RacingBarChart
                                            keyframes={keyframes}
                                            onStart={() => forceUpdate(true)}
                                            onStop={() => forceUpdate(false)}
                                            ref={chartRef}
                                            parentRef={parentRef}
                                            categories={stateCodes}
                                        />
                                    </div>
                                    <div style={{marginLeft: 100}} className="my-2">
                                        <IconButton aria-label="replay" size="small" onClick={handleReplay}>
                                            <ReplayIcon />
                                        </IconButton>
                                        <IconButton onClick={playing ? handleStop : handleStart} size="small">
                                            {playing ? <PauseIcon /> : <PlayArrowIcon />}
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="w-full fade-in" style={animationDelay(3)}>
                                    <MetaCard
                                        history={caseHistory.india}
                                        tests={metaCardPopulation}
                                        report={{...mapInitData}}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-40 md:mx-10">
                                {!IS_SINGLE_COLUMN && getMapAndTable()}

                                <div className="w-full md:w-40 mb-4 state-bar border fade-in" style={animationDelay(9)}>
                                    <Chart seriesData={stateStackedChart} name="stacked" callback={chartCallback} />
                                </div>

                                <div
                                    className="w-full md:w-40 mb-4 state-bar border fade-in"
                                    style={animationDelay(11)}
                                >
                                    <Chart
                                        seriesData={recoveryTrendChart}
                                        name="recovery_trend"
                                        callback={chartCallback}
                                    />
                                </div>

                                <div className="w-full fade-in md:w-40 mb-4 state-bar border" style={animationDelay(8)}>
                                    <Chart
                                        seriesData={deathTrendTotalChart}
                                        name="recovery_trend"
                                        callback={chartCallback}
                                    />
                                </div>

                                <div
                                    className="w-full md:w-40 mb-4 state-bar border fade-in"
                                    style={animationDelay(10)}
                                >
                                    <Chart seriesData={deathTrendChart} name="death_trend" callback={chartCallback} />
                                </div>
                            </div>
                            <div className="w-full md:w-40 md:mx-10 my-8">
                                <h2 className="border-l-2 border-primary text-primary font-bold p-2 uppercase text-xl">
                                    Top Headlines
                                </h2>
                                <NewsCard articles={articles.headlines.articles} />
                            </div>
                            <div className="w-full md:w-40 md:mx-10 my-8">
                                <h2 className="border-l-2 border-primary text-primary font-bold p-2 uppercase text-xl">
                                    Top News
                                </h2>
                                <NewsCard articles={articles.news.articles} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default Home;
