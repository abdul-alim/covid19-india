import React from "react";
import { timeDifference } from "../utils/common-utils";

const icons = [
        'bangaloremirror',
        'firstspot',
        'indiatoday',
        'livemint',
        'ndtv',
        'news18',
        'thehindu',
        'zeenews',
        'tribuneindia',
        'hindustantimes',
        'indiatvnews',
        'timesofindia',
        'firstpost',
        'telanganatoday',
        'cnbc',
        'economictimes',
        'moneycontrol',
        'youtube',
        'businessinsider',
        'indianexpress',
        'gadgetsnow',
        'mumbaimirror',
        'thenewsminute',
        'republicworld',
        'cnn',
        'khaleejtimes',
    ],
    regex = new RegExp(icons.join('|')),
    styles = {overflow: 'hidden', wordBreak: 'break-word'};

function NewsCard({articles}) {
    return (
        <React.Fragment>
            {articles.map((article, i) => {
                let relativeTime = timeDifference(new Date(), new Date(article.publishedAt));
                let match = article.url.match(regex),
                    iconDiv = '',
                    source = '';

                if (match && match.length) {
                    let icon = `images/news-favicon/${match[0]}.png`;
                    iconDiv = (
                        <div className="news-favicon bg-no-repeat mb-2" style={{backgroundImage: `url(${icon})`}}></div>
                    );
                } else {
                    source = (
                        <div className="text-sm break-words mt-2" style={styles}>
                            <b>Source:</b> {article.source.name}
                        </div>
                    );
                }

                if (!article.urlToImage || article.urlToImage.match('^http://')) {
                    return '';
                }

                return (
                    <div className="article rounded border my-4" key={i}>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener"
                            className="article p-4 border-gray-400 flex w-full relative mb-2"
                        >
                            <div
                                className="image-preview bg-cover bg-center bg-no-repeat"
                                lazy="loaded"
                                style
                                style={{backgroundImage: `url(${article.urlToImage})`}}
                            ></div>

                            <div className="content w-full text-black">
                                {iconDiv}
                                <div
                                    className="text-base font-semibold leading-normal break-words lg:text-base mb-3"
                                    style={styles}
                                >
                                    {article.title}
                                </div>
                                <div className="leading-snug break-words text-gray-700 text-xs" style={styles}>
                                    {article.description}
                                </div>
                                {source}
                                <div className="source-date">{relativeTime}</div>
                            </div>
                        </a>
                    </div>
                );
            })}
        </React.Fragment>
    );
}

export default NewsCard;
