import React, {useEffect, useRef, useState} from 'react';
import DisplayCard from './display-card';
import axios from 'axios';
import Table from './table';
import Map from './Map';
import {Link, useHistory, useParams} from 'react-router-dom';
import {STATE_CODES} from '../constants/state-code';
import {POPULATION, PUPULATION_SOURCE} from '../constants/population.js';
import {getFormattedTestingData} from '../utils/format-test';
import TrendGraph from './trend-chart';
import {IS_MOBILE_DEVICE, shareTheApp} from '../utils/common-utils';
import Chart from './Chart';
import {Helmet} from 'react-helmet';
import {Button} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import MetaCard from './meta-card';

const d3 = window.d3;

function State({}) {
    const [fetched, setFetched] = useState(false);
    const [tableData, setTableData] = useState({rows: [], columns: []});
    const [mapInitData, setMapInitData] = useState({});
    const [testingData, setTestingData] = useState({});
    const [spinner, setSpinner] = useState(true);
    const childRef = useRef();

    const {stateCode} = useParams();
    const history = useHistory();

    const stateName = STATE_CODES[stateCode];
    const statesKeys = Object.keys(STATE_CODES);

    // if (childRef.current) {
    //     setInterval(function () {
    //         childRef.current.updateDisplayCardCounts(Math.random());
    //     }, 1000);
    // }

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
    const [districtData, setDistrictData] = useState([]);
    const [dailyChart, setDailyChart] = useState(null);
    const [caseHistory, setCaseHistory] = useState(null);
    const [chartStore, updateChartStore] = useState({});
    const [percentChart, setPercentChart] = useState({});
    const [updatedTime, setUpdatedTime] = useState();
    const [zones, setZones] = useState();

    useEffect(() => {
        setFetched(false);
        getData();
    }, [stateCode]);

    const getData = async () => {
        try {
            let [
                {data: district_data},
                {data: state_data},
                {data: dailyChart},
                {data: percentChartJson},
                {data: zonesV2},
            ] = await Promise.all([
                axios.get('https://api.track-corona.in/district_v2.json'),
                axios.get('https://api.track-corona.in/reports_v2.json'),
                axios.get('/charts/daily.json'),
                axios.get('/charts/percent-chart.json'),
                axios.get('https://api.track-corona.in/zones.json'),
            ]);

            // hide spinner
            setSpinner(false);

            let districtInfo = district_data[stateCode];
            let stateInfo = state_data.states[stateCode];
            let {testing_data} = stateInfo;
            let state_population = POPULATION[stateCode];

            var formatTime = d3.timeFormat('%B %d, %I:%M%p IST');
            setUpdatedTime(districtInfo.updatedTime ? formatTime(new Date(districtInfo.updatedTime)) : '-');

            let testingData = getFormattedTestingData(testing_data, state_population, districtInfo.state);
            setTestingData(testingData);

            setDisplayCards(getCards(stateInfo, stateInfo.today));
            setDistrictData(districtInfo.districts);

            let mapInitData = {
                confirmed: districtInfo.confirmed,
                active: districtInfo.active,
                recovered: districtInfo.recovered,
                dead: districtInfo.dead,
                name: districtInfo.state,
                today: districtInfo.today,
            };
            setMapInitData(mapInitData);

            setTableData({
                rows: districtInfo.districts,
                columns: [
                    {name: 'district', accessor: 'district'},
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

            setDailyChart(dailyChart);
            if (stateInfo.history) {
                setCaseHistory(stateInfo.history);
            }

            {
                percentChartJson.seriesdata.chartdata[0] = {
                    type: 'pie',
                    data: [
                        ['Active', stateInfo.active],
                        ['Recovered', stateInfo.recovered],
                        ['Dead', stateInfo.dead],
                    ],
                };
                if (stateInfo.confirmed > 0) {
                    setPercentChart(percentChartJson);
                }
            }

            let zoneV2 = zonesV2[stateCode].map((row) => [row.district, `${row.zone} Zone`]);

            setZones(zoneV2);

            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    const changeStatePage = (event) => {
        history.push('/state/' + event.target.value);
    };

    function chartCallback(chart, name) {
        chartStore[name] = chart;
        updateChartStore(chartStore);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Coronavirus Outbreak in {STATE_CODES[stateCode]} - track-covid19.in</title>
                <meta
                    name="title"
                    content={`Coronavirus Outbreak in ${STATE_CODES[stateCode]}: Latest Map and Case Count`}
                />
                <meta
                    name="description"
                    content={`Live statistics of Coronavirus (COVID-19) in ${STATE_CODES[stateCode]} - India. Track the confirmed cases, recovered patients, and death toll of India due to the COVID-19 coronavirus.`}
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
                    <div className="opacity-0 my-6 fade-in">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-40 md:mx-10 pb-4">
                                <div className="w-full md:w-40 font-bold cursor-pointer flex pb-6 text-xs text-gray-600 items-center">
                                    <Link to={'/'}>Home</Link> <span className="px-1">/</span>
                                    <select
                                        onChange={changeStatePage}
                                        defaultValue={stateCode}
                                        name="states"
                                        className="bg-gray-200 font-bold appearance-none py-1 px-2 state-select"
                                    >
                                        {statesKeys.map((key) => {
                                            return (
                                                <option value={key} key={key}>
                                                    {STATE_CODES[key]}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="flex justify-between text-primary font-bold items-center my-6">
                                    <div>
                                        <h1 className="font-extra-bold text-primary text-3xl">{stateName}</h1>
                                        <div className="text-sm text-gray-700 font-bold">
                                            Last updated on {updatedTime}
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={shareTheApp}
                                            color="primary"
                                            className="bg-primary"
                                            endIcon={<ShareIcon />}
                                        >
                                            Share
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full fade-in">
                                    <DisplayCard ref={childRef} cards={displayCards} count={2000} />
                                </div>
                                <div className={`w-full my-6 ${fetched ? 'fade-in anim-delay-1' : ''}`}>
                                    <Table rows={tableData.rows} columns={tableData.columns} />
                                </div>
                            </div>
                            <div className="w-full md:w-40 md:mx-10 pb-4">
                                <div className="">
                                    <div className="flex justify-between fade-in anim-delay-2">
                                        <div className="text-blue-600 items-center justify-center p-2">
                                            <div className="text-xs py-1">Tested</div>
                                            <div className="text-xl font-bold">{testingData.tested}</div>
                                            {testingData.date}
                                        </div>
                                        <div className="text-blue-600 items-center justify-center text-right p-2">
                                            <div className="text-xs py-1">
                                                Population{' '}
                                                <a
                                                    rel="noopener"
                                                    target="_blank"
                                                    className="bg-blue-100"
                                                    href={PUPULATION_SOURCE}
                                                >
                                                    2019
                                                </a>
                                            </div>
                                            <div className="text-sm font-bold">{testingData.population}</div>
                                            <div className="text-sm font-bold">
                                                {testingData.test_per_million} tests / million people
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fade-in opacity-0  anim-delay-2 py-4">
                                        <Map
                                            initCardData={mapInitData}
                                            stateCode={stateCode}
                                            seriesPoints={districtData}
                                            joinBy={'district'}
                                            cards={['confirmed', 'active', 'recovered', 'dead']}
                                            zones={zones}
                                        />
                                    </div>
                                    <div className="w-full fade-in">
                                        <MetaCard history={caseHistory} tests={testingData} report={mapInitData} />
                                    </div>
    
                                    <div className="w-full border my-6">
                                        {dailyChart && <TrendGraph chartJson={dailyChart} history={caseHistory} />}
                                    </div>
    
                                    <div className="w-full border my-6" style={{height: '400px'}}>
                                        <Chart seriesData={percentChart} name="percent" callback={chartCallback} />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default State;
