import React, {useEffect, useState} from 'react';
import DisplayCard from './display-card';
import {defined} from '../utils/common-utils';

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
    ].filter((card) => defined(card.value) && !isNaN(card.value));
};

class MapText extends React.Component {
    constructor({init}) {
        super();

        this.state = init;
        this.child = React.createRef();
    }

    update(data, today) {
        this.setState(data);
        let cards = getCards(data, today);
        this.child.current.updateDisplayCardCounts(cards);
    }

    render() {
        let cards = getCards(this.state);
        let {name, infected} = this.state;
        return (
            <div>
                <h2 className="font-extra-bold text-xl text-primary my-2">
                    {name}
                </h2>
                <DisplayCard
                    styles={{bg: false, autoWidth: false}}
                    cards={cards}
                    count={2000}
                    ref={this.child}
                />
            </div>
        );
    }
}
export default MapText;
