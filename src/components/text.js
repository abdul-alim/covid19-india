import React, {useEffect, useState} from 'react';
import DisplayCard from './display-card';
import {defined} from '../utils/common-utils';

let colorMap = {
    confirmed: 'red',
    active: 'orange',
    recovered: 'green',
    dead: 'gray',
    tested: 'blue',
};

const getCards = (total = {}, today = {}, list) => {
    return list.map((item) => {
        return {
            name: item,
            value: total[item],
            delta: today[item],
            colorClass: colorMap[item],
        };
    });

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
    ].filter((card) => defined(card.value) && !isNaN(card.value));
};

class MapText extends React.Component {
    constructor(props) {
        super();

        this.state = {...props.initCardData, cards: props.cards};
        this.child = React.createRef();
    }

    update(data, today) {
        this.setState(data);
        let cards = getCards(data, today, this.props.cards);
        this.child.current.updateDisplayCardCounts(cards);
    }

    render() {
        let cards = getCards(this.state, this.state.today, this.props.cards);
        let {name} = this.state;

        return (
            <div>
                <h2 className="font-extra-bold text-xl text-primary my-2">
                    {name}
                </h2>
                <DisplayCard
                    styles={{bg: false, autoWidth: false}}
                    cards={cards}
                    ref={this.child}
                />
            </div>
        );
    }
}
export default MapText;
