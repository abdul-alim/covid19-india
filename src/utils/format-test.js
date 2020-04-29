import React from 'react';
const d3 = window.d3;
var parseTime = d3.timeParse('%d/%m/%Y');
var formatTime = d3.timeFormat('%B %d');

/**
 *
 * @param testing_data
 * @param totalPopulation
 * @param label
 * @return {{date: *, test_per_million: string, tested: string, label: string, population: string}}
 */

export function getFormattedTestingData(testing_data, totalPopulation, label) {
    let dateString = '';

    if (testing_data.date) {
        dateString = (
            <div className="text-xs">
                As of {formatTime(parseTime(testing_data.date))} as per{' '}
                <a
                    href={testing_data.source}
                    rel="noopener"
                    className="bg-blue-100"
                    target="_blank"
                >
                    source
                </a>
            </div>
        );
    } else {
        dateString = (
            <div className="text-xs">
                <div>Combined all states as per latest data.</div>
                {/*<div>*/}
                {/*    {` ${isMobileScreen ? 'Tap' : 'Hover'}`} the map for*/}
                {/*    state wise details.*/}
                {/*</div>*/}
            </div>
        );
    }

    return {
        tested: testing_data.tested.toLocaleString(),
        date: dateString,
        population: totalPopulation.toLocaleString(),
        test_per_million: Math.round(
            (testing_data.tested / totalPopulation) * 1000000
        ).toLocaleString(),
        label: ` - ${label}`,
    };
}
