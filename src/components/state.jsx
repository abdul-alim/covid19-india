import React, {useEffect, useRef, useState} from 'react';
import DisplayCard from './display-card';
import axios from 'axios';
import Table from './table';
import Map from './Map';
import {Link, useParams, useHistory} from 'react-router-dom';
import {STATE_CODES} from '../constants/state-code';
import {POPULATION} from '../constants/population.js';

const d3 = window.d3;

function State({}) {
    const [fetched, setFetched] = useState(false);
    const [tableData, setTableData] = useState({rows: [], columns: []});
    const [mapInitData, setMapInitData] = useState({});
    const [testingData, setTestingData] = useState({});
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

    useEffect(() => {
        setFetched(false);
        getData();
    }, [stateCode]);

    const getData = async () => {
        try {
            let [
                {data: district_data},
                {data: state_data},
            ] = await Promise.all([
                axios.get('/data/district_v2.json'),
                axios.get('/data/trend_v2.json'),
            ]);

            let districtInfo = district_data[stateCode];
            let stateInfo = state_data.states[stateCode];

            let {testing_data} = stateInfo;

            var parseTime = d3.timeParse('%d/%m/%Y');
            var formatTime = d3.timeFormat('%B %d');

            let state_population = POPULATION[stateCode];

            let testingData = {
                tested: testing_data.tested.toLocaleString(),
                date: formatTime(parseTime(testing_data.date)),
                population: state_population.toLocaleString(),
                test_per_million: Math.round(
                    (testing_data.tested / state_population) * 1000000
                ).toLocaleString(),
            };

            setTestingData(testingData);

            setDisplayCards(getCards(stateInfo, stateInfo.today));

            setDistrictData(districtInfo.districts);

            setMapInitData({});

            setTableData({
                rows: districtInfo.districts,
                columns: [
                    {name: 'district', accessor: 'district'},
                    {
                        name: 'confirmed',
                        accessor: 'confirmed',
                        colorClass: 'red',
                    },
                    {
                        name: 'active',
                        accessor: 'active',
                        colorClass: 'orange',
                    },
                    {
                        name: 'recovered',
                        accessor: 'recovered',
                        colorClass: 'green',
                    },
                    {
                        name: 'deceased',
                        accessor: 'dead',
                        colorClass: 'gray',
                    },
                ],
            });

            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    const changeStatePage = (event) => {
        history.push('/state/' + event.target.value);
    };

    return (
        <div className={`container opacity-0 my-2 ${fetched ? 'fade-in' : ''}`}>
            <div className="flex flex-wrap -mx-2 justify-center">
                <div className="w-full md:w-40 md:px-6">
                    {fetched && (
                        <div className="w-full md:w-40 font-bold cursor-pointer flex pb-6 text-xs text-gray-600 items-center">
                            <Link to={'/'}>Home</Link>{' '}
                            <span className="px-1">/</span>
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
                    )}

                    <div className="my-6">
                        <h1 className="font-extra-bold text-primary text-3xl">
                            {stateName}
                        </h1>
                        <div className="text-sm">Last Updated on</div>
                    </div>

                    <div className="w-full fade-in">
                        {fetched && (
                            <DisplayCard
                                ref={childRef}
                                cards={displayCards}
                                count={2000}
                            />
                        )}
                    </div>
                    <div
                        className={`w-full my-6 ${
                            fetched ? 'fade-in anim-delay-1' : ''
                        }`}
                    >
                        {fetched && (
                            <Table
                                rows={tableData.rows}
                                columns={tableData.columns}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full md:w-40 md:px-6 mt-6 pt-2">
                    <div className="sticky">
                        <div className="flex justify-between fade-in anim-delay-2">
                            <div className="text-blue-600 items-center justify-center p-2">
                                <div className="text-xs py-1">Tested</div>
                                <div className="text-xl font-bold">
                                    {testingData.tested}
                                </div>
                                <div className="text-xs">
                                    As of {testingData.date} as per{' '}
                                    <span className="bg-blue-100">source</span>
                                </div>
                            </div>
                            <div className="text-blue-600 items-center justify-center text-right p-2">
                                <div className="text-xs py-1">Population</div>
                                <div className="text-sm font-bold">
                                    {testingData.population}
                                </div>
                                <div className="text-sm font-bold">
                                    {testingData.test_per_million} tests /
                                    million people
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${
                                fetched
                                    ? 'fade-in opacity-0  anim-delay-2 py-4'
                                    : ''
                            }`}
                        >
                            {fetched && (
                                <Map
                                    init={mapInitData}
                                    stateCode={stateCode}
                                    seriesPoints={districtData}
                                    joinBy={'district'}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-2 justify-center">
                <div className="w-full md:w-40 md:mx-6  mt-6 pt-2 percent-chart border"></div>
                <div className="w-full md:w-40 md:mx-6  mt-6 pt-2 percent-chart border"></div>
            </div>

            <div className="flex flex-wrap -mx-2 justify-center">
                <div className="w-full md:w-40 md:mx-6  mt-6 pt-2 percent-chart border"></div>
                <div className="w-full md:w-40 md:mx-6  mt-6 pt-2 percent-chart border"></div>
            </div>

            <div className="flex flex-wrap -mx-2 justify-center">
                <div className="w-full md:w-40 md:mx-6  mt-6 pt-2 percent-chart border"></div>
                <div className="w-full md:w-40 md:mx-6  mt-6 pt-2 percent-chart border"></div>
            </div>
        </div>
    );
}

export default State;
