import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Button} from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
/**
 *
 * @return {*}
 * @constructor
 */

function SocialCard({github, twitter, facebook}) {
    return (
        <React.Fragment>
            <a
                href="https://github.com/abdul-alim/covid19-india"
                rel="noopener"
                target="_blank"
                className={`block my-2 ${github ? '' : 'hidden'}`}
            >
                <Button
                    className="text-white"
                    startIcon={<GitHubIcon size="small" />}
                    style={{
                        fontSize: '11px',
                        color: 'white',
                        backgroundColor: '#333',
                        fontWeight: 'bold',
                        padding: '0.4rem 0.8rem',
                        textTransform: 'capitalize',
                    }}
                >
                    View on Github
                </Button>
            </a>
            <a
                href="https://twitter.com/trackcovid19in"
                rel="noopener"
                className={`my-2 block ${twitter ? '' : 'hidden'}`}
                target="_blank"
            >
                <Button
                    startIcon={<TwitterIcon size="small" />}
                    style={{
                        fontSize: '11px',
                        color: 'rgb(0, 123, 255)',
                        backgroundColor: 'rgb(206, 229, 255)',
                        fontWeight: 'bold',
                        padding: '0.4rem 0.8rem',
                        textTransform: 'capitalize',
                    }}
                >
                    View Updates on Twitter
                </Button>
            </a>
            <a
                href="https://www.facebook.com/trackcovid19.in/"
                rel="noopener"
                className={`my-2 block ${facebook ? '' : 'hidden'}`}
                target="_blank"
            >
                <Button
                    startIcon={<FacebookIcon size="small" />}
                    style={{
                        fontSize: '11px',
                        color: 'white',
                        backgroundColor: '#4267b2',
                        fontWeight: 'bold',
                        padding: '0.4rem 0.8rem',
                        textTransform: 'capitalize',
                    }}
                >
                    View Updates on Facebook
                </Button>
            </a>
        </React.Fragment>
    );
}

export default SocialCard;
