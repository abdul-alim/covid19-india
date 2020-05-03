import React from "react";
import DisplayCard from "./display-card";

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
                    callback={this.props.callback}
                />
            </div>
        );
    }
}
export default MapText;
