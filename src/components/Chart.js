import React from "react";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    componentDidMount() {
        let {seriesData, name, callback} = this.props;

        if (this.myDiv) {
            let chart = this.chart = window.$ZC.charts(this.myDiv, seriesData);
            if (callback) {
                callback(chart, name);
            }
        }
    }
    
    componentDidUpdate() {
        if (this.props.updateCallback) {
            this.props.updateCallback(this.chart, this.props.name)
        }
    }

    render() {
        return <div className="h-full" ref={(c) => (this.myDiv = c)}></div>;
    }
}

export default Chart;
