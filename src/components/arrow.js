import React from 'react';

/**
 *
 * @return {string}
 * @constructor
 */
function Arrow({up, rotate = 0}) {
    let arrow = up ? '5 12 12 5 19 12' : '5 12 12 19 19 12';
    let transform = {};
    if (rotate) {
        transform.transform = `rotate(${rotate}deg)`;
    }
    return (
        <svg
            style={{marginTop: '-0.14rem', ...transform}}
            className="inline-block"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points={arrow} />
        </svg>
    );
}

export default Arrow;
