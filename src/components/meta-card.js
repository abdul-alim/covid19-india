import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { PUPULATION_SOURCE } from "../constants/population";
import { numberFormatLocal, round } from "../utils/common-utils";

/**
 *
 * @return {*}
 * @constructor
 */

const NaNCheck = (d) => {
    if (isNaN(d)) {
        return 0;
    }
    return numberFormatLocal(d);
};

function MetaCard({report, tests, history}) {
    let {populationNumeric: population} = tests;

    let confirmedPerMillion = NaNCheck(round((report.confirmed / population) * 1000000));
    let activePercent = NaNCheck(round((report.active / report.confirmed) * 100, 2));
    let recoveredPercent = NaNCheck(round((report.recovered / report.confirmed) * 100, 2));
    let deathPercent = NaNCheck(round((report.dead / report.confirmed) * 100, 2));
    let testPerMillion = NaNCheck(round((tests.testedNumeric / population) * 1000000));

    // add a sum for total confirmed
    let last = 0;
    history.forEach((row) => {
        row.confirmedCumulative = row.confirmed + last;
        last = row.confirmedCumulative;
    });

    let growRatePerWeek = 0,
        growthDateRange = 0;

    if (history.length > 2) {
        let lastWeek = history[history.length - 8],
            yesterday = history[history.length - 2];

        if (history.length < 8) {
            lastWeek = history[0];
        }

        let growthRate =
            ((yesterday.confirmedCumulative - lastWeek.confirmedCumulative) / lastWeek.confirmedCumulative) * 100;
        growRatePerWeek = round(growthRate / 7);
        growthDateRange = `${lastWeek.date.split(',')[0]} - ${yesterday.date.split(',')[0]}`;
    }
    // const doublingRate = growthRate > 0 ? 70 / round(growthRate, 2) : 0;

    let cards = [
        {
            title: 'Confirmed Per Million',
            info: '(confirmed / state population) * 1 Million',
            report: confirmedPerMillion,
            description: `~${round(confirmedPerMillion)} out of every 1 million people in ${
                report.name
            } have tested positive for the virus.`,
            cardColor: 'red',
        },
        {
            title: 'Active',
            info: '(active / confirmed) * 100',
            report: activePercent,
            description: `For every 100 confirmed cases, ~${round(activePercent)} are currently infected.`,
            cardColor: 'orange',
        },
        {
            title: 'Recovery Rate',
            info: '(recovered / confirmed) * 100',
            report: recoveredPercent,
            description: `For every 100 confirmed cases, ~${round(recoveredPercent)} have recovered from the virus.`,
            cardColor: 'green',
        },
        {
            title: 'Mortality Rate',
            info: '(deaths / confirmed) * 100',
            report: deathPercent,
            description: `For every 100 confirmed cases, ~${round(
                deathPercent
            )} have unfortunately passed away from the virus.`,
            cardColor: 'gray',
        },
        {
            title: 'Average Growth Rate',
            info: '(((yesterdayData - sevenDayBeforeData) / sevenDayBeforeData) * 100) / 7',
            report: `${growRatePerWeek}%`,
            reportLabel: growthDateRange,
            description: `In the last one week, the number of new infections has grown by an average of ${growRatePerWeek}% every day.`,
            cardColor: 'brown',
        },
        {
            title: 'Tests Per Million',
            info: '(total tests / total population) * 1 Million',
            report: `~${testPerMillion}`,
            description: `For every 1 million people in ${report.name}, ~${testPerMillion} people were tested.`,
            cardColor: 'blue',
        },
    ];

    return (
        <React.Fragment>
            <div className="flex justify-between my-4">
                <div className="text-gray-700 font-bold">
                    <h2 className="text-sm">
                        Population{' '}
                        <a rel="noopener" target="_blank" className="text-blue-600" href={PUPULATION_SOURCE}>
                            2019
                        </a>
                    </h2>
                    <h3 className="my-0 mt-1 text-2xl font-extra-bold">{tests.population}</h3>
                </div>
            </div>
            <div className="meta-card my-4">
                {cards.map((card, i) => {
                    return (
                        <div
                            className={`meta-item px-6 py-6 bg-${card.cardColor}-100 text-${card.cardColor}-400 font-bold rounded shadow`}
                            key={i}
                        >
                            <div className="meta-item-top flex items-center justify-between">
                                <h4 className="my-0 text-base">{card.title}</h4>
                                <span>
                                    <Tooltip
                                        title={<div className="text-sm py-2 global-style">{card.info}</div>}
                                        arrow
                                        placement="top"
                                        enterTouchDelay={50}
                                    >
                                        <InfoIcon size="small" />
                                    </Tooltip>
                                </span>
                            </div>
                            <div className="my-2">
                                <h1 className={`text-${card.cardColor}-600 text-2xl font-extra-bold`}>{card.report}</h1>
                                <span className="text-xs">{card.reportLabel}</span>
                            </div>
                            <p className="text-sm">{card.description}</p>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default MetaCard;
