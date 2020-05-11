import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './components/home';
import Helpline from './components/helplines';
import State from './components/state';
import './styles/styles.css';
import ScrollToTop from './utils/scroll-top';
import {Helmet} from 'react-helmet';
import Analytics from 'react-router-ga';

function App() {
    const pages = [
        {
            pageLink: '/',
            view: Home,
            displayName: 'Home',
            showInNavbar: true,
        },
        {
            pageLink: '/helplines',
            view: Helpline,
            displayName: 'Helplines',
            showInNavbar: true,
        },
        {
            pageLink: '/state/:stateCode',
            view: State,
            displayName: 'State',
            showInNavbar: false,
        },
    ];

    const schemaMarkup = {
        '@context': 'http://schema.org/',
        '@type': 'NGO',
        name: 'Coronavirus Outbreak in India: Latest Map and Case Count',
        alternateName: 'COVID-19 Tracker',
        url: 'https://track-covid-19.in',
        image: 'https://www.track-covid19.in/thumbnail.png',
    };

    return (
        <div className="App">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
            </Helmet>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ScrollToTop />
                <Analytics id="UA-163302592-1">
                    <Route
                        render={({location}) => (
                            <div className="Routing">
                                <Navbar pages={pages} />
                                <Switch location={location}>
                                    {pages.map((page, index) => {
                                        return (
                                            <Route
                                                exact
                                                path={page.pageLink}
                                                render={({match}) => (
                                                    <page.view key={match.params.stateCode || index} />
                                                )}
                                                key={index}
                                            />
                                        );
                                    })}
                                    <Redirect to="/" />
                                </Switch>
                            </div>
                        )}
                    />
                </Analytics>
            </BrowserRouter>
        </div>
    );
}

export default App;
