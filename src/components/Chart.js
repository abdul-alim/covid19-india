import React from 'react';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    async componentDidMount() {
        let {seriesData, name, callback} = this.props;

        if (this.myDiv) {
            let chart = window.$ZC.charts(this.myDiv, seriesData);
            if (callback) {
                callback(chart, name);
            }
        }
    }

    render() {
        return <div className="h-full" ref={(c) => (this.myDiv = c)}></div>;
    }
}

export default Chart;
