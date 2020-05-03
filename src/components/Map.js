import React from 'react';
import axios from 'axios';
import MapText from './text';
const d3 = window.d3;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    handleMapHover = (data, today) => {
        this.child.current.update(data, today);
    };

    async componentDidMount() {
        let {stateCode, seriesPoints: rawPoints, joinBy} = this.props,
            codeLower = stateCode.toLowerCase(),
            scopeCode = `countries-ind-${codeLower}-2`,
            seriesPoints = [];

        this.mapExtents = {
            confirmed: {
                count: d3.max(rawPoints, (d) => d.confirmed),
                colors: ['#fff4ec', '#ff1100'],
            },
            active: {
                count: d3.max(rawPoints, (d) => d.active),
                colors: ['#fff4ec', '#f36f40'],
            },
            recovered: {
                count: d3.max(rawPoints, (d) => d.recovered),
                colors: ['#f4fcee', '#007e1a'],
            },
            dead: {
                count: d3.max(rawPoints, (d) => d.dead),
                colors: ['#fcfbfc', '#2f2f2f'],
            },
        };

        // create a object map and then asign to the series poitns
        let object_map = {};
        rawPoints.forEach((row) => {
            object_map[row[joinBy]] = row;
        });

        const [{data: toposjon}, {data: mapData}] = await Promise.all([
            axios.get(`/maps/${stateCode}.topojson`),
            axios.get('/charts/map.json'),
        ]);

        window.$ZC.mapCollections[scopeCode] = toposjon;

        // create data for all available district
        seriesPoints = toposjon.objects.source.geometries.map(({properties: {name_ascii}}) => {
            let confirmed = 0,
                active = 0,
                recovered = 0,
                dead = 0;

            if (object_map[name_ascii]) {
                ({confirmed, active, recovered, dead} = object_map[name_ascii]);
            }
            return [name_ascii, confirmed, active, recovered, dead];
        });

        if (this.myDiv) {
            this.myDiv.classList.add('fade-in');
            mapData.map.scope = scopeCode;
            mapData.seriesdata.chartdata[0].data = [seriesPoints];

            mapData.legend.colors = [...this.mapExtents.confirmed.colors];
            mapData.legend.colorBand.stops = [0, this.mapExtents.confirmed.count];

            let last = null,
                {callback, tapCallback, clickCallback} = this.props;

            const mapAction = (error, data) => {
                let [name, confirmed, active, recovered, dead] = data.point,
                    today = {recovered: 0, confirmed: 0, active: 0, dead: 0};

                if (object_map[name]) {
                    today = object_map[name].today;
                }

                let data_callback = {
                    name,
                    confirmed,
                    active,
                    recovered,
                    dead,
                };

                if (name !== last) {
                    this.handleMapHover(data_callback, today);
                    last = name;
                }

                if (callback) {
                    callback(data_callback, today);
                }
                window.d3.event.allowDefault = true;
            };

            let defaultEvent = () => (window.d3.event.allowDefault = true);

            mapData.chart.plot.plotoptions.geoheatmap.events = {
                mousemove: mapAction,
                tap: (error, data) => {
                    if (tapCallback) {
                        mapAction(error, data);
                        tapCallback(error, data);
                        window.d3.event.allowDefault = true;
                    }
                },
                click: clickCallback || defaultEvent,
            };

            this.map = window.$ZC.maps(this.myDiv, mapData);
            window.chart = this.map;
        }
    }

    callback(card, i) {
        let colorMap = ['#e84b36', '#f88658', '#007e1a', '#2f2f2f'];

        // let {colors, stops} = this.getColorsNStops(this.mapExtents[card.name].count, this.mapExtents[card.name].colors);
        this.map.userdata.legend.colors = [...this.mapExtents[card.name].colors];
        this.map.userdata.legend.colorBand.stops = [0, this.mapExtents[card.name].count];

        this.map.userdata.metadata.axes.clr = [i + 1];
        this.map.userdata.chart.plot.plotoptions.geoheatmap.strokeColor = colorMap[i];
        this.map.redraw();
    }

    render() {
        return (
            <div>
                <MapText
                    ref={this.child}
                    initCardData={this.props.initCardData}
                    cards={this.props.cards}
                    callback={this.callback.bind(this)}
                />
                <div className="live-map my-6" ref={(c) => (this.myDiv = c)}></div>
            </div>
        );
    }
}

window.colorFinder = function (chartInstance, index, data) {
    let colorIndex = chartInstance.userdata.metadata.axes.clr[0];

    if (data[colorIndex] === 0) {
        return 'white';
    }
};

export default Map;
