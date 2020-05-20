import React from "react";
import axios from "axios";
import MapText from "./text";

const d3 = window.d3;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.selected = props.cards[0];
        this.mapType = 'affected';
    }

    handleMapHover = (data, today) => {
        this.child.current.update(data, today);
    };

    async componentDidMount() {
        let {stateCode, seriesPoints: rawPoints, joinBy, zones} = this.props,
            codeLower = stateCode.toLowerCase(),
            scopeCode = `countries-ind-${codeLower}-2`,
            seriesPoints = [],
            totalSummery = this.props.initCardData;

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

        let zoneMap = {};
        if (zones) {
            zones.forEach((row) => {
                zoneMap[row[0]] = row[1];
            });
        }

        const [{data: toposjon}, {data: mapData}] = await Promise.all([
            axios.get(`/maps/${stateCode}.topojson`),
            axios.get('/charts/map.json'),
        ]);

        window.$ZC.mapCollections[scopeCode] = toposjon;

        // create data for all available district
        let availableNames = [];
        seriesPoints = toposjon.objects.source.geometries.map(({properties: {name_ascii}}) => {
            let confirmed = 0,
                active = 0,
                recovered = 0,
                dead = 0;

            if (object_map[name_ascii]) {
                ({confirmed, active, recovered, dead} = object_map[name_ascii]);
            }
            availableNames.push(name_ascii);
            let zone = null;
            if (zones) {
                zone = zoneMap[name_ascii];
            }
            return [name_ascii, confirmed, active, recovered, dead, zone];
        });

        // list the non matched names
        rawPoints.forEach((row) => {
            if (!availableNames.includes(row[joinBy])) {
                console.log('map mitchmatch', row[joinBy]);
            }
        });

        console.log('*****************************');

        if (zones) {
            zones.forEach((district) => {
                if (!availableNames.includes(district[0])) {
                    console.log('zone mitchmatch', district[0]);
                }
            });
        }

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
                    let total = totalSummery[this.selected] || 0.001,
                        current = data_callback[this.selected] || 0,
                        percent = parseFloat(100 * (current / total)).toFixed(2);

                    // add title
                    this.map.container.attr('title', `${percent}% ${this.selected} from ${data_callback.name}`);

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
                mouseout: () => {
                    this.map.container.attr('title', null);
                    window.d3.event.allowDefault = true;
                },
                tap: (error, data) => {
                    mapAction(error, data);
                    if (tapCallback) {
                        tapCallback(error, data, this.map);
                    }
                    window.d3.event.allowDefault = true;
                },
                click: clickCallback || defaultEvent,
            };

            this.map = window.$ZC.maps(this.myDiv, mapData);
        }
    }

    callback(card, i) {
        let colorMap = ['#e84b36', '#f88658', '#007e1a', '#2f2f2f'];

        this.map.userdata.legend.colors = [...this.mapExtents[card.name].colors];
        this.map.userdata.legend.colorBand.stops = [0, this.mapExtents[card.name].count];
        this.selected = card.name;

        // select the default button
        d3.selectAll('button').classed('text-primary', false);
        d3.select('button[name=default]').classed('text-primary', true);

        this.map.userdata.legend.colorBand.ranges = null;
        this.map.userdata.legend.filter.enabled = false;
        this.map.userdata.metadata.axes.clr = [i + 1];
        this.map.userdata.chart.plot.plotoptions.geoheatmap.strokeColor = colorMap[i];
        this.map.eventHandler.mapEvents.clearHighlightedPoints();
        this.map.redraw();
    }

    changeMapType(event) {
        d3.selectAll('button').classed('text-primary', false);
        event.target.classList.add('text-primary');

        if (event.target.name === 'zone') {
            this.mapType = 'zone';
            this.map.userdata.legend.colors = ['#EF5350', '#FFA726', '#26A69A'];
            this.map.userdata.legend.colorBand.ranges = [['Red Zone'], ['Orange Zone'], ['Green Zone']];
            this.map.userdata.chart.plot.plotoptions.geoheatmap.strokeColor = '#333';
            this.map.userdata.legend.filter.enabled = true;
            this.map.userdata.metadata.axes.clr = [5];
            this.map.eventHandler.mapEvents.clearHighlightedPoints();
            this.map.redraw();
        } else {
            this.callback({name: this.selected}, this.props.cards.indexOf(this.selected));
        }
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
                {this.props.zones && (
                    <div className="my-4 text-sm">
                        <button
                            className="bg-gray-300 px-4 py-3 font-bold text-primary"
                            name="default"
                            onClick={this.changeMapType.bind(this)}
                            onTouchStart={this.changeMapType.bind(this)}
                        >
                            Affected Areas
                        </button>
                        <button
                            className="bg-gray-300 px-4 py-3 font-bold ml-2"
                            name="zone"
                            onClick={this.changeMapType.bind(this)}
                            onTouchStart={this.changeMapType.bind(this)}
                        >
                            Zones
                        </button>
                    </div>
                )}
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
