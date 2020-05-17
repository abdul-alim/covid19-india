import React from 'react';

const Bar = ({color, x, y, width, height, name, value}) => {
    return (
        <g transform={`translate(${x} ${y})`}>
            <rect x={0} y={0} width={width} height={height} fill={color} style={{opacity: 0.8}} />
            <text dominantBaseline="middle" x={width + 5} y={height / 2} textAnchor="start" className='text-xs'>
                {value}
            </text>
            <text dominantBaseline="middle" x={ - 5} y={height / 2} textAnchor="end" fontSize={10} className='text-2xs font-bold'>
                {name}
            </text>
        </g>
    );
};

export default Bar;
