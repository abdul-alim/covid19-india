import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Arrow from './arrow';

const DisplayCard = forwardRef(({count, cards: cc, styles = {}, callback}, ref) => {
    let [cards, setCards] = useState(cc);
    let [activeCard, setActiveCard] = useState(cards[0].name);

    useImperativeHandle(ref, () => ({
        updateDisplayCardCounts(cards) {
            setCards(cards);
        },
    }));

    function updateActiveCard(card) {
        setActiveCard(card.name);
        setCards([...cards]);
    }

    return (
        <div className="flex flex-row justify-center my-5 justify-between">
            {cards.map((card, i) => {
                let bg100, bg200, shadow, flexAuto;


                if (styles.bg !== false || card.name === activeCard) {
                    bg100 = `bg-${card.colorClass}-100`;
                    bg200 = `bg-${card.colorClass}-200`;
                }

                if (styles.shadow !== false) {
                    shadow = 'shadow';
                }

                if (styles.autoWidth !== false) {
                    flexAuto = 'flex-auto';
                }

                callback = callback || (() => {});

                return (
                    <div
                        onClick={() => {
                            updateActiveCard(card, i);
                            callback(card, i);
                        }}
                        key={i}
                        className={`${
                            i ? 'ml-2' : ''
                        } w-24 flex ${flexAuto} flex-col rounded overflow-hidden cursor-pointer ${shadow} text-center text-${
                            card.colorClass
                        }-600`}
                    >
                        <div className={`pt-2 flex flex-auto flex-col items-center justify-center ${bg100} font-bold`}>
                            {
                                <span className="text-xs">
                                    {card.delta ? <Arrow up={card.delta >= 0} /> : ''}
                                    {card.delta}
                                </span>
                            }
                            <span className="text-xl lg:text-2xl py-1">{card.value + ''}</span>
                        </div>
                        <div className={`py-2 w-full ${bg200} text-sm font-semibold`}>
                            <span className="capitalize">{card.name}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

export default DisplayCard;
