import React, {forwardRef} from 'react';
import {useTransition, animated} from 'react-spring';
import Bar from './Bar';

const AnimatedBar = animated(Bar);

const RacingBarGroup = forwardRef(({frameData, xScale, yScale, colorScale}, ref) => {
    const transitions = useTransition(
        frameData.map(({name, value}, idx) => ({
            y: yScale(idx),
            width: xScale(value),
            value,
            name,
        })),
        (d) => d.name,
        {
            initial: (d) => d,
            from: {y: yScale.range()[1] + 50, width: 0, value: 0},
            leave: {y: yScale.range()[1] + 50, width: 0, value: 0},
            enter: (d) => d,
            update: (d) => d,
            unique: true,
            ref,
        }
    );

    return transitions.map(({item, props}) => {
        const {y, value, width} = props;
        const {name} = item;
        return (
            <AnimatedBar
                x={xScale(0)}
                y={y}
                width={width}
                height={yScale.bandwidth()}
                color={colorScale(name)}
                value={value.interpolate((v) => v.toFixed())}
                name={name}
                key={name}
            />
        );
    });
});

export default RacingBarGroup;
