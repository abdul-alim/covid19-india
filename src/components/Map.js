import React from 'react';
import axios from 'axios';
import MapText from './text';

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
        seriesPoints = toposjon.objects.source.geometries.map(
            ({properties: {name_ascii}}) => {
                let confirmed = 0,
                    active = 0,
                    recovered = 0,
                    dead = 0;

                if (object_map[name_ascii]) {
                    ({confirmed, active, recovered, dead} = object_map[
                        name_ascii
                    ]);
                }
                return [name_ascii, confirmed, active, recovered, dead];
            }
        );

        if (this.myDiv) {
            this.myDiv.classList.add('fade-in');
            mapData.map.scope = scopeCode;
            mapData.seriesdata.chartdata[0].data = [seriesPoints];
            
            let last = null;

            mapData.chart.plot.plotoptions.geoheatmap.events = {
                mousemove: (error, data) => {
                    let [name, infected, active, recovered, dead] = data.point,
                        today = {recovered: 0, infected: 0, active: 0, dead: 0};

                    if (object_map[name]) {
                        today = object_map[name].today;
                    }
                    
                    if (name !== last) {
                        this.handleMapHover(
                            {
                                name,
                                infected,
                                active,
                                recovered,
                                dead,
                            },
                            today
                        );
                        last = name;
                    }
                    window.d3.event.allowDefault = true;
                },
            };

            window.$ZC.maps(this.myDiv, mapData);
        }
    }

    render() {
        return (
            <div>
                <MapText ref={this.child} init={this.props.init} />
                <div
                    className="live-map my-6"
                    ref={(c) => (this.myDiv = c)}
                ></div>
            </div>
        );
    }
}

export default Map;
