import React, {useEffect, useRef, useState} from 'react';
import DisplayCard from './display-card';
import axios from 'axios';
import Table from './table';
import Map from './Map';
import {Link} from 'react-router-dom';
import {groupBy} from '../utils/common-utils';

function Home({}) {
    const [fetched, setFetched] = useState(false);
    const [data, setData] = useState({});
    const [tableData, setTableData] = useState({rows: [], columns: []});
    const [mapInitData, setMapInitData] = useState({});

    const childRef = useRef();

    const getCards = (total = {}, today = {}) => {
        return [
            {
                name: 'Confirmed',
                value: total.infected,
                delta: today.infected,
                colorClass: 'red',
            },
            {
                name: 'Active',
                value: total.infected - total.recovered - total.dead,
                delta: today.infected - today.recovered - today.dead,
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
                axios.get('/data/trend_v2.json')
            ]);

            
            console.log(reports);
            
            setData(reports);

            setDisplayCards(getCards(reports.total, reports.trend.today));
            // set active count
            // reports.states = reports.states.filter((row) => row.infected > 0);
            //
            // // let seriesPoints = [];
            // // reports.states.forEach((row) => {
            // //     // data mapped
            // //
            // //     row.active = row.infected - row.recovered - row.dead;
            // //     row.today.active =
            // //         row.today.infected - row.today.recovered - row.today.dead;
            // //
            // //     seriesPoints.push([
            // //         row.state,
            // //         row.infected,
            // //         row.active,
            // //         row.recovered,
            // //         row.dead,
            // //     ]);
            // // });

            setStateData([]);
            let mapInitData = {...reports.total, name: 'India'};
            // map init data
            reports.total.active =
                reports.total.infected -
                reports.total.recovered -
                reports.total.dead;
            setMapInitData(mapInitData);

            let isMobileScreen = window.innerWidth < 769;

            setTableData({
                rows: reports.states,
                columns: [
                    {name: 'state/UT', accessor: 'state'},
                    {
                        name: isMobileScreen ? 'cnfmd' : 'confirmed',
                        accessor: 'infected',
                        colorClass: 'text-red-600',
                    },
                    {
                        name: isMobileScreen ? 'actv' : 'active',
                        accessor: 'active',
                        colorClass: 'text-orange-600',
                    },
                    {
                        name: isMobileScreen ? 'Rcvrd' : 'recovered',
                        accessor: 'recovered',
                        colorClass: 'text-green-600',
                    },
                    {
                        name: 'dead',
                        accessor: 'dead',
                        colorClass: 'text-gray-600',
                    },
                ],
            });

            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

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
                    <div className="w-full md:w-40 md:px-6 px-1">
                        <div
                            className={`${
                                fetched ? 'fade-in anim-delay-2' : ''
                            }`}
                        >
                            {fetched && (
                                <Map
                                    init={mapInitData}
                                    seriesPoints={stateData}
                                    stateCode={'IND'}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-40 md:px-6 px-1 pb-4">
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
                </div>
            </div>
        </div>
    );
}

export default Home;
