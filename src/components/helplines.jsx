import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import {STATE_CODES} from '../constants/state-code';

/**
 *
 * @return {*}
 * @constructor
 */
function Helpline({}) {
    const [fetched, setFetched] = useState(false);
    const [helplines, setHelplines] = useState(false);

    useEffect(() => {
        if (fetched === false) {
            getHelplines();
        }
    }, [fetched]);

    const getHelplines = async () => {
        try {
            const [{data: helplines}] = await Promise.all([axios.get('data/helplines.json')]);
            setHelplines(helplines);
            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    /**
     *
     * @param value
     * @param type
     * @return {string|*}
     */
    const formatLinkType = (value, type) => {
        if (type === 'phone') {
            return `tel:${value}`;
        } else if (type === 'whatsapp') {
            return `whatsapp://send?phone=${value}`;
        } else if (type === 'email') {
            return `mailto:${type}`;
        }
        return value;
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Helplines for Coronavirus Queries - track-covid19.in</title>
                <meta name="title" content="Helplines for Coronavirus Queries - track-covid19.in" />
            </Helmet>
            <div className={'container px-4'} id="help-lines">
                {Object.keys(helplines).map((key, i) => {
                    return (
                        <div key={i}>
                            <div className="fade-in border-l-2 border-primary text-primary font-bold p-2 uppercase my-2">
                                <span className="ml-1">{key}</span>
                            </div>
                            <div className={'flex flex-wrap -mx-2'}>
                                {helplines[key].map((helpline, j) => {
                                    return (
                                        <div
                                            key={`${JSON.stringify(helpline)}`}
                                            className={
                                                'fade-in md:w-auto w-full shadow px-4 py-2 text-base mx-2 my-2 md:flex-basis-250'
                                            }
                                            style={{animationDelay: 30 * j + 'ms'}}
                                        >
                                            <div className="font-bold">{helpline.name}</div>
                                            <a
                                                className="pr-2 underline text-blue-500"
                                                href={formatLinkType(helpline.number, helpline.type)}
                                            >
                                                {helpline.number}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default Helpline;
