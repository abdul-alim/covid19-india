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

    dateString = (
        <div className="text-xs">
            {label === 'Total' ? 'As per latest IMCR ' : `Till ${formatTime(parseTime(testing_data.date))} as per `}
            <a href={testing_data.source} rel="noopener" className="bg-blue-100" target="_blank">
                {label === 'Total' ? 'Report' : 'source'}
            </a>
        </div>
    );

    return {
        populationNumeric: totalPopulation,
        testedNumeric: testing_data.tested,
        tested: testing_data.tested.toLocaleString(),
        date: dateString,
        population: totalPopulation.toLocaleString(),
        test_per_million: Math.round((testing_data.tested / totalPopulation) * 1000000).toLocaleString(),
        label: ` - ${label}`,
    };
}
