import React, {useEffect, useRef, useState} from 'react';
import DisplayCard from './display-card';
import axios from 'axios';
import Table from './table';
import Map from './Map';
import {Link} from 'react-router-dom';
import {groupBy} from '../utils/common-utils';
import {POPULATION, PUPULATION_SOURCE} from '../constants/population';
import { getFormattedTestingData } from "../utils/format-test";
const d3 = window.d3;
let isMobileScreen = window.innerWidth < 769;

function Home({}) {
    const [fetched, setFetched] = useState(false);
    const [data, setData] = useState({});
    const [tableData, setTableData] = useState({rows: [], columns: []});
    const [mapInitData, setMapInitData] = useState({});
    const [testingData, setTestingData] = useState({});
    const [stateDataMapped, setStateDataMapped] = useState({});

    const childRef = useRef();

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
            let [{data: reports}] = await Promise.all([
                axios.get('/data/trend_v2.json'),
            ]);

            setData(reports);

            let totalPopulation = d3.sum(Object.values(POPULATION));

            let testingData = getFormattedTestingData(
                reports.testing_data,
                totalPopulation,
                'India'
            );
            setTestingData(testingData);

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

            let tableData = Object.values(reports.states);
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
                        name: isMobileScreen ? 'cnfmd' : 'confirmed',
                        accessor: 'confirmed',
                        colorClass: 'red',
                    },
                    {
                        name: isMobileScreen ? 'actv' : 'active',
                        accessor: 'active',
                        colorClass: 'orange',
                    },
                    {
                        name: isMobileScreen ? 'Rcvrd' : 'recovered',
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

            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    function callbackMap(point) {
        // setStateDataMapped

        let state = stateDataMapped[point.name],
            totalPopulation = POPULATION[state.stateCode];

        let testingData = getFormattedTestingData(
            state.testing_data,
            totalPopulation,
            state.name
        );
        setTestingData(testingData);
    }

    return (
        <div className={'container'}>
            <div
                className={`container opacity-0 my-2 ${
                    fetched ? 'fade-in' : ''
                }`}
            >
                <h1 className="font-bold my-6 text-center md:text-3xl text-xl">
                    Live Covid-19 statistcs - India
                </h1>
                <div className="flex flex-wrap -mx-2 justify-center">
                    <div className="w-full md:w-40 md:mx-10 px-1 pb-4">
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
                                    link={true}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-40 md:mx-10 px-1">
                        <div className="flex justify-between fade-in anim-delay-2">
                            <div className="text-blue-600 items-center justify-center p-2">
                                <div className="text-xs py-1">
                                    Tested{' '}
                                    <span className="font-bold">
                                        {testingData.label}
                                    </span>
                                </div>
                                <div className="text-xl font-bold">
                                    {testingData.tested}
                                </div>
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
                                fetched ? 'fade-in anim-delay-2' : ''
                            }`}
                        >
                            {fetched && (
                                <Map
                                    initCardData={mapInitData}
                                    seriesPoints={stateData}
                                    stateCode={'IND'}
                                    joinBy={'name'}
                                    data={tableData}
                                    cards={[
                                        'confirmed',
                                        'active',
                                        'recovered',
                                        'dead',
                                    ]}
                                    callback={callbackMap}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
